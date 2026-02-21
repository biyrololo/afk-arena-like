import crystalKing from '@/assets/crystalKing.png';
import fireKing from '@/assets/fireKing.png';
import frostGuardian from '@/assets/frost_guardian.png';
import warrior from '@/assets/characters/warrior.png';
import spearwoman from '@/assets/characters/spearwoman.png';
import viking from '@/assets/characters/viking.png';
import firewarrior from '@/assets/characters/firewarrior.png';
import demonSlime from "@/assets/characters/demonSlime.png";
import elementalWind from "@/assets/characters/elementalWind.png";
import groundMonk from "@/assets/characters/groundMonk.png";
import waterPriestess from "@/assets/characters/waterPriestess.png";
import blueSlime from "@/assets/characters/blueSlime.png";
import greenSlime from "@/assets/characters/greenSlime.png";
import purpleSlime from "@/assets/characters/purpleSlime.png";
import fantasyWarrior from "@/assets/characters/fantasyWarrior.png";
import kitsune from "@/assets/characters/kitsune.png";

import summonBg from '@/assets/backgrounds/summon.webp';
import menuBg from '@/assets/menu/menu.webp';


import magic_field_bg from '@/assets/backgrounds/magic_field.png';
import { EventBus } from '@/utils/eventBus';

import { Avatars } from '@/shared/avatars';
import { Icons } from '@/shared/icons';
import { Backgrounds } from '@/shared/backgrounds';

export default class BootScene extends Phaser.Scene {
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
        this.load.spritesheet("demonSlime", demonSlime, {
            frameWidth: 288,
            frameHeight: 160,
        });
        this.load.spritesheet("elementalWind", elementalWind, {
            frameWidth: 288,
            frameHeight: 128,
        });
        this.load.spritesheet("groundMonk", groundMonk, {
            frameWidth: 288,
            frameHeight: 128,
        });
        this.load.spritesheet("waterPriestess", waterPriestess, {
            frameWidth: 288,
            frameHeight: 128,
        });
        this.load.spritesheet("blueSlime", blueSlime, {
            frameWidth: 80,
            frameHeight: 80,
        });
        this.load.spritesheet("greenSlime", greenSlime, {
            frameWidth: 80,
            frameHeight: 80,
        });
        this.load.spritesheet("purpleSlime", purpleSlime, {
            frameWidth: 80,
            frameHeight: 80,
        });
        this.load.spritesheet("fantasyWarrior", fantasyWarrior, {
            frameWidth: 162,
            frameHeight: 162,
        });
        this.load.spritesheet("kitsune", kitsune, {
            frameWidth: 128,
            frameHeight: 128,
        });
        
        this.load.font('Birthstone', 'assets/fonts/Birthstone-Regular.ttf');
        this.load.image('magic_field_bg', magic_field_bg);
        this.load.image('summonBg', summonBg);
        this.load.image('menuBg', menuBg);

        for (const avatar in Avatars) {
            this.load.image(`avatar_${avatar}`, Avatars[avatar as keyof typeof Avatars]);
        }

        for (const icon in Icons) {
            this.load.image(`icon_${icon}`, Icons[icon as keyof typeof Icons]);
        }

        for(const bg in Backgrounds) {
            this.load.image(`bg_${bg}`, Backgrounds[bg as keyof typeof Backgrounds]);
        }
        
        this.load.on('progress', (value: number) => {
            EventBus.emit('load:progress', value)
        })
    }

    create(): void {
        EventBus.emit('load:end')
        this.events.on('destroy', this.onDestroy, this);
    }

    onDestroy(): void {
        this.children?.removeAll();

        this.events.off('destroy', this.onDestroy, this);
        EventBus.emit('load:end')
    }
}