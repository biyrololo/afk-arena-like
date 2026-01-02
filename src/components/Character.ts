import Phaser from 'phaser';

export type CharacterAttackType = 'special' | `attack${number}`;

type CharacterState = 'idle' | CharacterAttackType | 'special' | 'walk' | 'dead';

export function applyAttackDamage(
    scene: Phaser.Scene,
    attacker: Character,
    enemies: Character[],
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
    damage: number
) {
    const dir = attacker.direction ? 1 : -1;
    const hitbox = new Phaser.Geom.Rectangle(
        attacker.x + offsetX * dir - width / 2,
        attacker.y + offsetY - height / 2,
        width,
        height
    );

    // Отладка зоны атаки
    // const debug = scene.add.graphics();
    // debug.lineStyle(2, 0x00ff00);
    // debug.strokeRectShape(hitbox);
    // scene.time.delayedCall(50, () => debug.destroy()); // Чтобы мигало

    let hit = false;

    // Проверка попаданий
    enemies.forEach(enemy => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(hitbox, enemy.getHitbox())) {
            hit = true;
            enemy.takeDamage(damage);
        }
    });

    if(hit && !(attacker.characterState === 'special')) {
        attacker.gainEnergy(damage);
    }
}


export default class Character extends Phaser.GameObjects.Container {
    // Спрайт персонажа
    public sprite: Phaser.GameObjects.Sprite;
    
    // Полоска HP
    private hpBarBg!: Phaser.GameObjects.Graphics;
    private hpBar!: Phaser.GameObjects.Graphics;
    private hpText!: Phaser.GameObjects.Text;
    
    // Параметры
    private textureKey: string;
    private frameWidth: number;
    private frameHeight: number;
    public displayWidth: number;
    public displayHeight: number;
    
    // Параметры движения
    private speed: number;
    /**
     * true - вправо
     * false - влево
     */
    public direction: boolean = true; 
    
    // HP система
    private maxHP: number;
    private currentHP: number;
    private isDead: boolean;

    public onAttackFrame?: (attackName: string, frameIndex: number) => void;
    public onAnimationEnd?: (animName: string) => void;

    private attackHitFrames: Record<string, number[]> = {}; // урон на кадрах
    private idleAnim: string = 'idle';
    public characterState: CharacterState = 'idle';

    private hitbox: Phaser.Geom.Rectangle;
    private hitboxOffset: { x: number; y: number } = { x: 0, y: 0 };
    private debugGraphics?: Phaser.GameObjects.Graphics;
    private debugMode: boolean = false;

    public uiOffsetY: number = 0;

    private attacksCount: number = 0;
    private hasSpecialAttack: boolean = false;

    private attacksDistances: Record<CharacterAttackType, { x: number; y: number }> = {
        special: { x: 0, y: 0 },
    };

    private movingTarget: {
        x: number;
        y: number;
        speed: number;
        stopDistance: number;
        onReached?: () => void;
        follow?: Character; // если нужно следовать за юнитом
    } | null = null;

    private energy: number = 0;
    public readonly maxEnergy: number = 50;

    public onEnergyChange?: (energy: number) => void;
    public onDeath?: () => void;
    public onUpdateHP?: () => void;

    public flipSpritesheet = false;
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        speed: number,
        textureKey: string,
        frameWidth: number,
        frameHeight: number,
        displayWidth?: number,
        displayHeight?: number,
        uiOffsetY?: number
    ) {
        super(scene, x, y);
        scene.add.existing(this);
        
        // Создаем спрайт
        this.sprite = scene.add.sprite(0, 0, textureKey);
        this.add(this.sprite);

        this.speed = speed;
        
        // Параметры
        this.textureKey = textureKey;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        // Параметры движения
        this.uiOffsetY = uiOffsetY || 0;

        // Параметры отображения (если не указаны, используем размеры фрейма)
        this.displayWidth = displayWidth || frameWidth;
        this.displayHeight = displayHeight || frameHeight;
        
        // Устанавливаем размер отображения
        this.sprite.setDisplaySize(this.displayWidth, this.displayHeight);
        
        // HP система
        this.maxHP = 300;
        this.currentHP = 300;
        this.isDead = false;
        
        this.createHPBar();

        this.sprite.on('animationcomplete', this.onAnimationComplete, this);
        this.sprite.on('animationupdate', this.onAnimationUpdate, this);

        this.hitbox = new Phaser.Geom.Rectangle(
            this.x - (this.displayWidth / 2) * 0.5,
            this.y - (this.displayHeight / 2) * 0.5,
            this.displayWidth * 0.5,
            this.displayHeight * 0.5
        );
    }

    public setEnergy(energy: number) {
        this.energy = energy;
        this.onEnergyChange?.(this.energy);
    }

    public getEnergy(): number {
        return this.energy;
    }

    public gainEnergy(amount: number) {
        this.setEnergy(Math.min(this.maxEnergy, this.energy + amount));
    }

    public getIsDead(): boolean {
        return this.isDead;
    }

    public setAttacksConfig(attacksCount: number, hasSpecialAttack: boolean) {
        this.attacksCount = attacksCount;
        this.hasSpecialAttack = hasSpecialAttack;
    }

    public getAttacksConfig() {
        return { attacksCount: this.attacksCount, hasSpecialAttack: this.hasSpecialAttack };
    }

    public setAttacksDistances(attacksDistances: Record<CharacterAttackType, { x: number; y: number }>) {
        this.attacksDistances = attacksDistances;
    }

    public getAttackDistance(attackType: CharacterAttackType) {
        if(!this.attacksDistances[attackType]) {
            return { x: 0, y: 0 };
        }
        return this.attacksDistances[attackType];
    }

    /** Установить хитбокс персонажа (относительные размеры) */
    public setHitbox(width: number, height: number, offsetX: number = 0, offsetY: number = 0) {
        this.hitbox.width = width;
        this.hitbox.height = height;
        this.hitbox.x = this.x - width / 2 + offsetX;
        this.hitbox.y = this.y - height / 2 + offsetY;
        this.hitboxOffset.x = offsetX;
        this.hitboxOffset.y = offsetY;
    }

    /** Вернуть текущий хитбокс в мировых координатах */
    public getHitbox(): Phaser.Geom.Rectangle {
        this.hitbox.x = this.x - this.hitbox.width / 2 + this.hitboxOffset.x;
        this.hitbox.y = this.y - this.hitbox.height / 2 + this.hitboxOffset.y;
        return this.hitbox;
    }

    /** Включить/выключить отладочный режим хитбокса */
    public setDebugMode(enabled: boolean) {
        this.debugMode = enabled;
        if (enabled && !this.debugGraphics) {
            this.debugGraphics = this.scene.add.graphics();
        }
        if (!enabled && this.debugGraphics) {
            this.debugGraphics.destroy();
            this.debugGraphics = undefined;
        }
    }

    /**
     * Начать движение к точке или к движущейся цели.
     * @param targetX цель X (если follow указан — будет обновляться автоматически)
     * @param targetY цель Y
     * @param speed скорость в px/sec (по умолчанию this.speed)
     * @param stopDistance остановиться на этом расстоянии от цели (px)
     * @param onReached коллбек при достижении
     * @param follow если передан Character — будем обновлять цель каждый кадр
     * @param force если true — перебивает текущие состояния (атаки)
     */
    public moveTowards(
        targetX: number,
        targetY: number,
        speed?: number,
        stopDistance: number = 0,
        onReached?: () => void,
        follow?: Character,
        force: boolean = false
    ): void {
        // не начинаем движение если вы в атакующем состоянии, если только force=true
        if (!force && this.characterState && this.characterState !== 'idle' && this.characterState !== 'walk') {
            return;
        }

        this.movingTarget = {
            x: targetX,
            y: targetY,
            speed: speed ?? this.speed,
            stopDistance,
            onReached,
            follow
        };

        // включаем состояние ходьбы
        this.playAnimation('walk', 'walk', true);

        // направляем спрайт лицом к цели (однократная установка — далее будет обновляться в update)
        const dx = targetX - this.x;
        this.setFlipX(dx < 0);
    }

    /** Отменить текущее движение */
    public stopMoving(): void {
        this.movingTarget = null;
        if (this.characterState === 'walk') {
            this.characterState = 'idle';
            // вернуться в idle, если анимация существует
            const idleKey = this.getAnimationName(this.idleAnim);
            if (this.scene.anims.exists(idleKey)) {
                this.playAnimation(this.idleAnim, 'idle', true);
            }
        }
    }



    /** Вызывается каждый кадр */
    public update(time: number, delta: number): void {
        super.update(time, delta);

        // движение
        if (this.movingTarget) {
            // если нужно следовать за Character, обновляем координаты цели
            if (this.movingTarget.follow) {
                this.movingTarget.x = this.movingTarget.follow.x;
                this.movingTarget.y = this.movingTarget.follow.y;
            }

            const dx = this.movingTarget.x - this.x;
            const dy = this.movingTarget.y - this.y;
            const dist = Math.hypot(dx, dy);

            // reached?
            if (dist <= this.movingTarget.stopDistance) {
                const cb = this.movingTarget.onReached;
                this.movingTarget = null;
                // переключаемся в idle и включаем idle-анимацию (если есть)
                // this.characterState = 'idle';
                // this.playAnimation(this.idleAnim, 'idle', true);
                if (cb) cb();
            } else {
                // считаем шаг движения (delta в ms)
                const moveSpeed = this.movingTarget.speed;
                const step = moveSpeed * (delta / 1000); // px this frame
                const nx = dx / dist;
                const ny = dy / dist;

                // если шаг захватит область стопа — ставим точку на stopDistance от цели
                const remain = dist - this.movingTarget.stopDistance;
                if (step >= remain) {
                    const targetX = this.movingTarget.x - nx * this.movingTarget.stopDistance;
                    const targetY = this.movingTarget.y - ny * this.movingTarget.stopDistance;
                    this.setPosition(targetX, targetY);
                } else {
                    this.x += nx * step;
                    this.y += ny * step;
                }

                // обновляем направление спрайта
                this.setFlipX(nx < 0);
            }
        }

        if (this.debugMode && this.debugGraphics) {
            this.debugGraphics.clear();
            this.debugGraphics.lineStyle(2, 0xff0000);
            const hb = this.getHitbox();
            this.debugGraphics.strokeRect(hb.x, hb.y, hb.width, hb.height);
        }
    }
    
    /**
     * Создание полоски HP над персонажем
     */
    private createHPBar(): void {
        const barWidth: number = this.frameWidth*0.5;
        const barHeight: number = 8;
        const offsetY: number = this.uiOffsetY;
        
        // Фон полоски HP
        this.hpBarBg = this.scene.add.graphics();
        this.hpBarBg.fillStyle(0x333333, 1);
        this.hpBarBg.fillRect(-barWidth/2, offsetY, barWidth, barHeight);
        
        // Активная полоска HP
        this.hpBar = this.scene.add.graphics();
        this.hpBar.fillStyle(0x00ff00, 1);
        this.hpBar.fillRect(-barWidth/2, offsetY, barWidth, barHeight);
        
        // Добавляем в контейнер
        this.add(this.hpBarBg);
        this.add(this.hpBar);
        
        // Текст HP
        this.hpText = this.scene.add.text(0, offsetY - 15, `${this.currentHP}/${this.maxHP}`, {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        this.add(this.hpText);
    }
    
    /**
     * Обновление полоски HP
     */
    private updateHPBar(): void {
        this.onUpdateHP?.();
        const hpPercent: number = this.currentHP / this.maxHP;
        const offsetY: number = this.uiOffsetY;
        
        // Обновляем цвет полоски в зависимости от HP
        if (hpPercent > 0.6) {
            this.hpBar.clear().fillStyle(0x00ff00, 1); // Зеленый
        } else if (hpPercent > 0.3) {
            this.hpBar.clear().fillStyle(0xffff00, 1); // Желтый
        } else {
            this.hpBar.clear().fillStyle(0xff0000, 1); // Красный
        }
        
        // Обновляем ширину полоски
        const barWidth: number = this.frameWidth * 0.5 * hpPercent;
        this.hpBar.fillRect(-this.frameWidth/4, offsetY, barWidth, 8);
        
        // Обновляем текст
        this.hpText.setText(`${Math.max(0, Math.floor(this.currentHP))}/${this.maxHP}`);
    }

    private getAnimationName(animation: string): string {
        return `${this.textureKey}/${animation}`
    }
    
    /**
     * Создание анимации из спрайтшита
     */
    public createAnimation(
        name: string,
        startFrame: number,
        endFrame: number,
        frameRate: number = 10,
        repeat: number = -1
    ): void {
        name = this.getAnimationName(name);
        if (!this.scene.anims.exists(name)) {
            this.scene.anims.create({
                key: name,
                frames: this.scene.anims.generateFrameNumbers(this.textureKey, {
                    start: startFrame,
                    end: endFrame
                }),
                frameRate: frameRate,
                repeat: repeat
            });
        }
    }
    
    /**
     * Воспроизведение анимации
     */
    public playAnimation(name: string, state?: CharacterState, ignoreIfPlaying: boolean = false): void {
        if(state) this.characterState = state;
        name = this.getAnimationName(name);
        this.sprite.play(name, ignoreIfPlaying);
    }
    
    /**
     * Остановка анимации
     */
    public stopAnimation(): void {
        this.sprite.stop();
    }

    public setAttackHitFrames(attackName: string, frames: number[]) {
        this.attackHitFrames[this.getAnimationName(attackName)] = frames;
    }


    private onAnimationComplete(animation: Phaser.Animations.Animation) {
        if (this.onAnimationEnd) {
            this.onAnimationEnd(animation.key);
        }

        if (!['walk', 'idle'].includes(this.characterState) && this.isAlive()) {
            this.characterState = 'idle';
            this.playAnimation(this.idleAnim, 'idle');
        }
    }

    private onAnimationUpdate(animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
        const attackFrames = this.attackHitFrames[animation.key];
        if (attackFrames && attackFrames.includes(frame.index)) {
            if (this.onAttackFrame) {
                this.onAttackFrame(animation.key.split('/')[1], frame.index);
            }
        }
    }
    
    /**
     * Получение урона
     */
    public takeDamage(damage: number): void {
        if (this.isDead) return;
        
        this.currentHP -= damage;
        this.currentHP = Math.max(0, this.currentHP);

        this.updateHPBar();

        // === Эффект появления текста урона ===
        const offsetX = Phaser.Math.Between(-15, 15); // случайное смещение по X
        const offsetY = Phaser.Math.Between(-5, 5);   // случайное смещение по Y
        const damageText = this.scene.add.text(
            this.x + offsetX, 
            this.y + offsetY + this.displayHeight / 6, // чуть выше персонажа
            `${damage}`,
            {
                font: "30px Pixel",
                color: "#ffffff",
                fontStyle: "bold",
                stroke: "#000",
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: damageText,
            y: damageText.y - 30,  // поднимаем на 30px
            alpha: 0,              // исчезновение
            duration: 2000,
            ease: "Cubic.easeOut",
            onComplete: () => {
                damageText.destroy();
            }
        });
        
        // Эффект получения урона
        this.scene.tweens.add({
            targets: this.sprite,
            tint: 0xff0000,
            duration: 100,
            yoyo: true,
            repeat: 1,
            onComplete: (): void => {
                this.sprite.clearTint();
            }
        });
        
        if (this.currentHP <= 0) {
            this.die();
        }
    }
    
    /**
     * Исцеление
     */
    public heal(amount: number): void {
        if (this.isDead) return;
        
        this.currentHP += amount;
        this.currentHP = Math.min(this.maxHP, this.currentHP);
        this.updateHPBar();
    }
    
    /**
     * Смерть персонажа
     */
    private die(): void {
        this.isDead = true;
        this.stopAnimation();
        
        // Анимация смерти
        this.sprite.setTint(0x444444);
        
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 1000,
            onComplete: (): void => {
                this?.onDeath?.();
                this.destroy(true);
            }
        });
    }
    
    /**
     * Установка максимального HP
     */
    public setMaxHP(hp: number): void {
        this.maxHP = hp;
        this.currentHP = hp;
        this.updateHPBar();
    }
    
    /**
     * Получение текущего HP
     */
    public getHP(): number {
        return this.currentHP;
    }
    
    /**
     * Получение максимального HP
     */
    public getMaxHP(): number {
        return this.maxHP;
    }
    
    /**
     * Проверка, жив ли персонаж
     */
    public isAlive(): boolean {
        return !this.isDead && this.currentHP > 0;
    }
    
    /**
     * Установка позиции персонажа
     */
    public setPosition(x: number, y: number): this {
        super.setPosition(x, y);
        return this;
    }
    
    /**
     * Получение позиции X
     */
    public getX(): number {
        return this.x;
    }
    
    /**
     * Получение позиции Y
     */
    public getY(): number {
        return this.y;
    }

    public setSpeed(speed: number) {
        this.speed = speed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public getTextureKey(): string {
        return this.textureKey;
    }

    public setFlipX(flip: boolean) {
        if(this.flipSpritesheet) {
            flip = !flip;
        }
        if(flip !== this.sprite.flipX) {
            this.sprite.setFlipX(flip);
            this.direction = !this.direction;
        }
    }

    public isDestroyed(): boolean {
        return this.scene === null;
    }

    public destroy(fromScene?: boolean): void {
        if (this.isDead) return;
        
        // Убираем слушатели
        this.onDeath = undefined;
        this.onUpdateHP = undefined;
        
        // Уничтожаем графику
        if (this.hpBarBg && !this.hpBarBg.scene.sys) {
            // Уже уничтожен
        } else {
            this.hpBarBg.destroy();
            this.hpBar.destroy();
            this.hpText.destroy();
            this.sprite.destroy();
        }
        
        // Обнуляем ссылки
        this.sprite = null as any; // или лучше: this.sprite = undefined;
        this.hpBarBg = undefined!;
        this.hpBar = undefined!;
        this.hpText = undefined!;
        
        super.destroy(fromScene);
    }
}