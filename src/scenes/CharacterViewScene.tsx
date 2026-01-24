import generateCharacter from "@/characters/characters";
import type Character from "@/components/Character";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { EventBus } from "@/utils/eventBus";
import Phaser from 'phaser';

import crystalKing from '@/assets/crystalKing.png';
import fireKing from '@/assets/fireKing.png';
import frostGuardian from '@/assets/frost_guardian.png';

import background from '@/assets/backgrounds/game_background_1.png';


export default class CharacterViewScene extends Phaser.Scene {
    private character: Character | null = null;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'CharacterViewScene' })
    }

    preload(): void {
        this.load.spritesheet('crystalKing', crystalKing, {
            frameWidth: 288,
            frameHeight: 128
        }); 
        this.load.spritesheet('fireKing', fireKing, {
            frameWidth: 288,
            frameHeight: 128
        });
        this.load.spritesheet('frostGuardian', frostGuardian, {
            frameWidth: 192,
            frameHeight: 128
        })
        this.load.image('background', background);
    }

    create(): void {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.displayWidth = this.scale.width;
        this.background.displayHeight = this.scale.height;

        EventBus.on('CharacterViewScene:setCharacter', this.setCharacter, this);
        EventBus.on('CharacterViewScene:playAnimation', this.handlePlayAnimation, this)

        this.scale.on('resize', this.handleResize, this);

        EventBus.emit('CharacterViewScene:ready')

        this.events.on('destroy', this.destroy, this);
    }

    handlePlayAnimation(animation: string) {
        this.character?.playAnimation(animation, animation as any);
    }

    handleResize({ width, height }: { width: number, height: number }) {
        console.log('handleResize', width, height);
        this.background.displayWidth = width;
        this.background.displayHeight = height;
    }

    destroy(): void {
        EventBus.off('CharacterViewScene:setCharacter', this.setCharacter, this);
        EventBus.off('CharacterViewScene:playAnimation', this.handlePlayAnimation, this)
        this.scale.off('resize', this.handleResize, this);
    }

    private setCharacter(char: PlayerCharacter | null) {
        if(!char) {
            this.character = null;
            return;
        }

        const c = generateCharacter(this as any, 'ally', char.key as any, {
            x: 1920 / 2,
            y: 1080 / 2,
            displayWidth: 2000,
            displayHeight: 0,
            character: char
        })
        c.setPosition(
            1920 / 2 + 200 - c.width / 2,
            200
        ).hideHPBar()
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