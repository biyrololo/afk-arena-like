import { BotController } from '@/components/Bot';
import Character from '@/components/Character';
import { EventBus } from '@/utils/eventBus';
import Phaser from 'phaser';
import type { PlayerCharacter } from '@/shared/types/PlayerCharacter';
import generateCharacter from '@/characters/characters';
import type { IStage } from '@/entities/chapter/lib/chapter.model';
import { calculateStatsWithEquipment } from '@/shared/types/develop';

import warrior from '@/assets/characters/warrior.png';
import spearwoman from '@/assets/characters/spearwoman.png';
import viking from '@/assets/characters/viking.png';
import firewarrior from '@/assets/characters/firewarrior.png';

import background from '@/assets/backgrounds/field.webp';

export default class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.Image;

    private allies: Character[] = [];
    private enemies: Character[] = [];

    private alliesPositions: { x: number, y: number }[] = [
        { x: 100, y: 500 },
        { x: 100, y: 600 },
        { x: 50, y: 800 },
        { x: 40, y: 900 },
    ];

    private enemiesPositions: { x: number, y: number }[] = [
        { x: 1800, y: 450 },
        { x: 1800, y: 550 },
        { x: 1600, y: 750 },
        { x: 1600, y: 860 },
    ];

    /**
     * Боты
     */
    private bots: BotController[] = [];

    private stage: IStage | null = null;

    constructor() {
        super({ key: 'GameScene' });
    }

    public getAllies(): Character[] {
        return this.allies;
    }

    public addAlly(ally: Character) {
        this.allies.push(ally);
    }

    public getEnemies(): Character[] {
        return this.enemies;
    }

    public addEnemy(enemy: Character) {
        this.enemies.push(enemy);
    }

    preload(): void {
        this.load.spritesheet('crystalKing', 'assets/crystalKing.png', {
            frameWidth: 288,
            frameHeight: 128
        });
        this.load.spritesheet('fireKing', 'assets/fireKing.png', {
            frameWidth: 288,
            frameHeight: 128
        });
        this.load.spritesheet('frostGuardian', 'assets/frost_guardian.png', {
            frameWidth: 192,
            frameHeight: 128
        })
        this.load.spritesheet('warrior', warrior, {
            frameWidth: 69,
            frameHeight: 44
        })
        this.load.spritesheet('spearwoman', spearwoman, {
            frameWidth: 128,
            frameHeight: 115
        })
        this.load.spritesheet('viking', viking, {
            frameWidth: 115,
            frameHeight: 84
        })
        this.load.spritesheet('firewarrior', firewarrior, {
            frameWidth: 144,
            frameHeight: 80
        })
        
        this.load.font('Birthstone', 'assets/fonts/Birthstone-Regular.ttf');
        this.load.image('background', background);
    }

    create(): void {
        console.warn('CREATE SCENE')
        
        this.background = this.add.image(0, 0, 'background');

        // масштаб по высоте
        const scale = this.scale.height / this.background.height;
        this.background.setScale(scale);

        // центрирование
        this.background.setPosition(
            this.scale.width / 2,
            this.scale.height / 2
        );
        this.background.setOrigin(0.5, 0.5);
        
        EventBus.on('addAllies', this.handleAddAllies, this)

        EventBus.on('start', this.handleStart, this); 
        EventBus.on('gameOver', this.onGameOver, this);

        EventBus.on('useAllySpecialAttack', this.handleUseAllySpecialAttack, this);
        
        EventBus.emit('sceneReady', 'GameScene');

        this.events.on('destroy', this.onDestroy, this);
        this.events.on('ultimateStarted', this.playUltimateEffect, this)
    }

    onDestroy(): void {
        this.children?.removeAll();

        EventBus.off('addAllies', this.handleAddAllies, this);

        EventBus.off('start', this.handleStart, this);
        EventBus.off('gameOver', this.onGameOver, this);

        EventBus.off('useAllySpecialAttack', this.handleUseAllySpecialAttack, this);

        this.events.off('destroy', this.onDestroy, this);
        this.events.off('ultimateStarted', this.playUltimateEffect, this);
    }

    private handleUseAllySpecialAttack(index: number) {
        const ally = this.allies[index];
        if(ally.getEnergy() !== ally.maxEnergy) {
            return;
        }
        const bot = this.bots.find(b => b.getCharacter() === ally);
        if(bot) {
            bot.useSpecialAttack();
        }
    }

    private handleAddAllies(allies: PlayerCharacter[]) {
        for(const ally of this.allies) {
            ally.destroy(true);
        }
        this.allies = []
        console.log('addAllies', allies);
        allies.forEach((ally, i) => {
            if(ally)
                this.handleAddAlly(ally, i);
        })
    }

    private onGameOver(win: boolean) {
        console.log('game over');
        // this.allies.forEach((ally) => {
        //     if(!ally.isDestroyed())
        //         ally.destroy(true);
        // })
        // this.enemies.forEach((enemy) => {
        //     if(!enemy.isDestroyed())
        //         enemy.destroy(true);
        // })
        // this.allies = [];
        // this.enemies = [];
        // this.bots = [];
        // this.scene.start('MenuScene', { win });
        EventBus.emit('gameOverUI', { win, stage: this.stage?.stageNumber, chapter: this.stage?.chapterNumber });
    }

    private handleStart(stage: IStage) {
        this.stage = stage;
        console.log('handleStart');
        console.log('this.allies', this.allies);

        stage.enemies.forEach((enemy, i) => {
            if(!this.enemiesPositions[i]) return;
            generateCharacter(this, 'enemy', enemy.key as any, {
                ...this.enemiesPositions[i], 
                character: calculateStatsWithEquipment(enemy)
            });
        })
        
        // generateCharacter(this, 'enemy', 'fireKing', {x: 1000, y: 400, maxHp: 200, speed: 250});
        // generateCharacter(this, 'enemy', 'frostGuardian', {x: 1000, y: 200, maxHp: 400, speed: 100});
        this.allies.forEach((ally, i) => {
            ally.onUpdateHP = () => {
                const hp = ally.getHP();
                EventBus.emit('allyUpdateHP', {
                    index: i,
                    hp
                });
            }
            ally.onDeath = () => {
                if(this.allies.filter(a => a.isAlive()).length === 0) {
                    EventBus.emit('gameOver', false);
                }
            }
        })

        this.enemies.forEach((enemy) => {
            enemy.onDeath = () => {
                if(this.enemies.filter(e => e.isAlive()).length === 0) {
                    EventBus.emit('gameOver', true);
                }
            }
        })

        this.allies.forEach((ally) => {
            this.bots.push(new BotController(this, ally, this.enemies, 2000));
        })

        this.enemies.forEach((enemy) => {
            this.bots.push(new BotController(this, enemy, this.allies, 2000));
        })

        // this.bots.push(
        //     new BotController(this, this.player, this.enemies, 2000),
        //     new BotController(this, this.allies[1], this.enemies, 1000),
        //     new BotController(this, this.enemy, this.allies, 2000),
        //     new BotController(this, this.enemy2, this.allies, 4000)
        // )

        EventBus.emit('createdAllies', this.allies.map(a => ({
            texture: a.getTextureKey(),
            energy: a.getEnergy(),
            maxEnergy: a.maxEnergy,
            maxHp: a.getMaxHP(),
            hp: a.getHP()
        })));
    }

    private handleAddAlly(ally: PlayerCharacter, index: number) {
        const position = this.alliesPositions[index];
        if(!position) {
            throw new Error(`Position for ally ${index} not found`);
        }
        generateCharacter(this, 'ally', ally.key as any, {
            ...position, 
            character: calculateStatsWithEquipment(ally)
        })
    }

    private highlightCaster(character: Character) {
        const aura = this.add.circle(
            character.getHitbox().centerX,
            character.getHitbox().centerY,
            character.getHitbox().height / 3,
            0x00ffff,
            0.35
        )
        .setDepth(character.depth);

        this.tweens.add({
            targets: aura,
            scale: 1.3,
            alpha: 0,
            duration: 600,
            onComplete: () => aura.destroy()
        });
    }


    // GameScene.ts
    private playUltimateEffect(character: Character) {
        this.highlightCaster(character);
        this.time.timeScale = 0.3;
        this.tweens.timeScale = 0.3;
        this.anims.globalTimeScale = 0.3;


        this.time.delayedCall(400, () => {
            this.time.timeScale = 1;
            this.tweens.timeScale = 1;
            this.anims.globalTimeScale = 1;
        });
        
        return;

        const cam = this.cameras.main;

        // затемнение
        const overlay = this.add.rectangle(
            cam.centerX,
            cam.centerY,
            cam.width,
            cam.height,
            0x000000,
            0.7
        )
        .setScrollFactor(0)
        .setDepth(9999);

        // имя ульты
        const text = this.add.text(
            cam.centerX,
            cam.centerY,
            'ULTIMATE!',
            {
                fontSize: '64px',
                color: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000',
                strokeThickness: 6
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(10000)
        .setAlpha(0);

        this.tweens.add({
            targets: text,
            alpha: 1,
            scale: 1.2,
            duration: 300,
            yoyo: true,
        });

        cam.shake(300, 0.01);
        cam.flash(200);

        this.time.delayedCall(800, () => {
            overlay.destroy();
            text.destroy();
        });
    }


    update(time: number, delta: number): void {
        this.bots.sort((a, b) => a.getCharacter().getHitbox().bottom - b.getCharacter().getHitbox().bottom)
        .forEach((b, i) => {
            b.getCharacter().setDepth(i);
        });
        this.bots.forEach(b => {
            b.update(time, delta);
        })
        this.allies.forEach(a => {
            a.update(time, delta);
        })
        this.enemies.forEach(e => {
            e.update(time, delta);
        })
    }
}