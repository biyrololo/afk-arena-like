import { BotController } from '@/components/Bot';
import Character from '@/components/Character';
import { EventBus } from '@/utils/eventBus';
import Phaser from 'phaser';
import type { PlayerCharacter } from '@/shared/types/PlayerCharacter';
import generateCharacter from '@/characters/characters';

export default class GameScene extends Phaser.Scene {
    private allies: Character[] = [];
    private enemies: Character[] = [];

    private alliesPositions: { x: number, y: number }[] = [
        { x: 200, y: 200 },
        { x: 200, y: 400 },
        { x: 100, y: 100 },
        { x: 100, y: 300 },
    ];

    /**
     * Боты
     */
    private bots: BotController[] = [];

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
        this.load.image('background', 'assets/backgrounds/game_background_1.png');
    }

    create(): void {
        console.warn('CREATE SCENE')
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.displayWidth = this.scale.width;
        background.displayHeight = this.scale.height;
        
        EventBus.on('addAllies', this.handleAddAllies, this)

        EventBus.on('start', this.handleStart, this); 
        EventBus.on('gameOver', this.onGameOver, this);

        EventBus.on('useAllySpecialAttack', this.handleUseAllySpecialAttack, this);
        
        EventBus.emit('sceneReady', 'GameScene');

        this.events.on('destroy', this.onDestroy, this);
    }

    onDestroy(): void {
        this.children?.removeAll();

        EventBus.off('addAllies', this.handleAddAllies, this);

        EventBus.off('start', this.handleStart, this);
        EventBus.off('gameOver', this.onGameOver, this);

        EventBus.off('useAllySpecialAttack', this.handleUseAllySpecialAttack, this);
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
        EventBus.emit('gameOverUI', { win });
    }

    private handleStart() {
        console.log('handleStart');
        console.log('this.allies', this.allies);
        generateCharacter(this, 'enemy', 'fireKing', {x: 1000, y: 400, maxHp: 200, speed: 250});
        generateCharacter(this, 'enemy', 'frostGuardian', {x: 1000, y: 200, maxHp: 400, speed: 100});
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
                    EventBus.emit('gameOver', {
                        win: false
                    });
                }
            }
        })

        this.enemies.forEach((enemy) => {
            enemy.onDeath = () => {
                if(this.enemies.filter(e => e.isAlive()).length === 0) {
                    EventBus.emit('gameOver', {
                        win: true
                    });
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
        generateCharacter(this, 'ally', ally.key as any, {...position, speed: 200});
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