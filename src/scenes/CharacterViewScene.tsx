import generateCharacter from "@/characters/characters";
import type Character from "@/components/Character";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { EventBus } from "@/utils/eventBus";
import Phaser from 'phaser';

import crystalKing from '@/assets/crystalKing.png';
import fireKing from '@/assets/fireKing.png';
import frostGuardian from '@/assets/frost_guardian.png';
import warrior from '@/assets/characters/warrior.png';
import spearwoman from '@/assets/characters/spearwoman.png';
import viking from '@/assets/characters/viking.png';
import firewarrior from '@/assets/characters/firewarrior.png';

import magic_field_bg from '@/assets/backgrounds/magic_field.png';


export default class CharacterViewScene extends Phaser.Scene {
    private character: Character | null = null;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'CharacterViewScene' })
    }

    preload(): void {
        EventBus.emit('load:start')
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
        this.load.image('magic_field_bg', magic_field_bg);

        this.load.on('progress', (value: number) => {
            EventBus.emit('load:progress', value);
        });
    }

    create(): void {
        this.background = this.add.image(0, 0, 'magic_field_bg');

        // масштаб по высоте
        const scale = this.scale.width / this.background.width;
        this.background.setScale(scale);

        // центрирование
        this.background.setPosition(
            this.scale.width / 2,
            this.scale.height / 2
        );
        this.background.setOrigin(0.5, 0.5);


        EventBus.on('CharacterViewScene:setCharacter', this.setCharacter, this);
        EventBus.on('CharacterViewScene:playAnimation', this.handlePlayAnimation, this)

        this.scale.on('resize', this.handleResize, this);

        EventBus.emit('CharacterViewScene:ready')

        EventBus.emit('load:end')

        this.events.on('destroy', this.destroy, this);
    }

    handlePlayAnimation(animation: string) {
        if(animation === 'attack1') {
            const animsCount = this.character?.getAttacksConfig().attacksCount;

            if(animsCount)
                animation = `attack${Phaser.Math.Between(1, animsCount)}`;
        }
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
        EventBus.emit('load:end')
    }

    private setCharacter(char: PlayerCharacter | null) {
        if(!char) {
            this.character = null;
            return;
        }

        const c = generateCharacter(this as any, 'ally', char.key as any, {
            x: 1920 * 2 / 3,
            y: 1080 * 1 / 2,
            scale: 10,
            character: char
        }).hideHPBar()

        const hbh = c.getHitbox().height * 2;
        const dh = c.displayHeight;

        const offset = (dh - hbh) / 2;

        c.setY(1080 * 3 / 5 - offset)
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