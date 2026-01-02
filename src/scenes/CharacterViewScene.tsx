import generateCharacter from "@/characters/characters";
import type Character from "@/components/Character";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { EventBus } from "@/utils/eventBus";
import Phaser from 'phaser';

export default class CharacterViewScene extends Phaser.Scene {
    private character: Character | null = null;

    constructor() {
        super({ key: 'CharacterViewScene' })
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
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.displayWidth = this.scale.width;
        background.displayHeight = this.scale.height;

        EventBus.on('CharacterViewScene:setCharacter', this.setCharacter, this);

        EventBus.emit('CharacterViewScene:ready')

        this.events.on('destroy', this.destroy, this);
    }

    destroy(): void {
        EventBus.off('CharacterViewScene:setCharacter', this.setCharacter, this);
    }

    private setCharacter(char: PlayerCharacter | null) {
        if(!char) {
            this.character = null;
            return;
        }

        generateCharacter(this, 'ally', char.key, {
            x: 100,
            y: 500
        })
    }

    public addAlly(ally: Character) {
        this.character = ally;
    }

    public addEnemy(ally: Character) {
        this.character = ally;
    }

    public getEnemies(): Character[] {
        return [];
    }

    public getAllies(): Character[] {
        return [];
    }

    update(time: number, delta: number): void {
        this.character?.update(time, delta);
    }
}