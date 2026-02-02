import type Character from "./Character";
import type { CharacterAttackType } from "./Character";

export class BotController {
    private scene: Phaser.Scene;
    private character: Character;
    private enemies: Character[];
    private state: 'idle' | 'moving' | 'attacking' | 'cooldown' = 'idle';
    private currentTarget: Character | null = null;
    private currentAttack: CharacterAttackType = 'attack1';
    private attackCooldown = 1000;
    private lastAttackTime = 0;

    private shouldSpecialAttack = false;

    constructor(scene: Phaser.Scene, character: Character, enemies: Character[],
        attackCooldown = 1000,
    ) {
        this.scene = scene;
        this.character = character;
        this.enemies = enemies;
        this.attackCooldown = attackCooldown;
    }

    public getCharacter(): Character {
        return this.character;
    }

    public useSpecialAttack() {
        this.shouldSpecialAttack = true;
        if(this.state !== 'attacking') {
            this.pickAttack();
            this.shouldSpecialAttack = false;
        }
        this.character.setEnergy(0);
    }

    update(time: number, delta: number) {
        if (this.state === 'cooldown' && time - this.lastAttackTime < this.attackCooldown) {
            return; // ждём окончания кд
        }

        this.pickTarget();

        if (!this.currentTarget) return;

        const hp = this.character.getHitbox();

        const thp = this.currentTarget.getHitbox();

        const dx = hp.x + Number(this.currentTarget.direction) * hp.width;
        const dy = hp.y;

        const dist = Phaser.Math.Distance.Between(
            dx,
            dy,
            thp.x + thp.width / 2,
            thp.y + thp.height / 2
        );

        // const required = this.character.attacksDistances[this.currentAttack];
        const required = this.character.getAttackDistance(this.currentAttack);

        const offsetY = hp.y - this.character.y;

        const requiredX = Math.max(required.x, thp.width / 2 + 10);

        if (Math.abs(hp.centerX - thp.centerX) >= requiredX || Math.abs(hp.centerY - thp.centerY) >= required.y - 20) {
            // console.log('moving', dist, Math.hypot(requiredX, required.y), required);
            // подходим
            this.state = 'moving';
            this.character.moveTowards(thp.centerX, thp.bottom - required.y - offsetY);
        } else if(Math.abs(hp.centerX - thp.centerX) < (required.minX ?? requiredX - 10)) { 
            this.state = 'moving';
            const isOnLeft = hp.centerX < thp.centerX;
            this.character.moveTowards(isOnLeft ? thp.x - requiredX - 40 : thp.x + requiredX + 40, thp.bottom - required.y - offsetY);
        } else {
            this.character.stopMoving();
            // атакуем
            if(this.state !== 'attacking') {
                const isOnLeft = hp.centerX < thp.centerX;
                if(this.character.direction !== isOnLeft) this.character.setFlipX(!isOnLeft);
                if(this.currentAttack === 'special') {
                    this.scene.events.emit('ultimateStarted', this.character)
                }
                this.character.playAnimation(this.currentAttack, this.currentAttack);
                this.character.onAnimationEnd = () => {
                    this.pickAttack();
                    // console.log('attack end');
                    if(!this.shouldSpecialAttack) {
                        this.lastAttackTime = time;
                        this.state = 'cooldown';
                    } else {
                        this.shouldSpecialAttack = false;
                        this.state = 'cooldown';
                    }
                    this.character.onAnimationEnd = undefined;
                }
                this.state = 'attacking';
            }
            // this.character.playAttack(this.currentAttack, () => {
            //     this.character.hitTarget(this.currentTarget, this.currentAttack);
            //     this.lastAttackTime = time;
            //     this.state = 'cooldown';
            // });
        }
    }

    private pickTarget() {
        this.currentTarget = this.enemies
            .filter(e => !e.getIsDead())
            .sort((a, b) => Phaser.Math.Distance.Between(this.character.x, this.character.y, a.x, a.y)
                - Phaser.Math.Distance.Between(this.character.x, this.character.y, b.x, b.y))[0] || null;
    }

    private pickAttack() {
        if(this.shouldSpecialAttack) {
            this.currentAttack = 'special';
            return;
        }
        const { attacksCount } = this.character.getAttacksConfig();

        const randomAttack = Math.floor(Math.random() * attacksCount) + 1;

        this.currentAttack = `attack${randomAttack}`;
    }
}
