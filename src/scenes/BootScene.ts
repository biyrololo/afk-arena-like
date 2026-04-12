import crystalKing from '@/assets/characters/crystalKing.png';
import fireKing from '@/assets/characters/fireKing.png';
import frostGuardian from '@/assets/frost_guardian.png';
import warrior from '@/assets/characters/warrior.png';
import spearwoman from '@/assets/characters/spearwoman.png';
import viking from '@/assets/characters/viking.png';
import firewarrior from '@/assets/characters/firewarrior.png';
import demonSlime from "@/assets/characters/demonSlime.png";
import elementalWind from "@/assets/characters/elementalWind.png";
import groundMonk from "@/assets/characters/groundMonk.png";
import metalBladekeeper from "@/assets/characters/metalBladekeeper.png";
import waterPriestess from "@/assets/characters/waterPriestess.png";
import blueSlime from "@/assets/characters/blueSlime.png";
import greenSlime from "@/assets/characters/greenSlime.png";
import purpleSlime from "@/assets/characters/purpleSlime.png";
import fantasyWarrior from "@/assets/characters/fantasyWarrior.png";
import kitsune from "@/assets/characters/kitsune.png";
import minotaur from "@/assets/characters/minotaur.png";
import bringerOfDeath from "@/assets/characters/bringerOfDeath.png";
import nightBorne from "@/assets/characters/nightBorne.png";
import knight from '@/assets/characters/knight.png'
import steelKnight from '@/assets/characters/steelKnight.png'
import heroKnight from '@/assets/characters/heroKnight.png'
import martialHero from '@/assets/characters/martialHero.png'
import oldGolem from '@/assets/characters/oldGolem.png'
import oldGuardian from '@/assets/characters/oldGuardian.png'
import womanWarrior from '@/assets/characters/womanWarrior.png';
import treeMan from '@/assets/characters/treeMan.png';

import { EventBus } from '@/utils/eventBus';

import { MUSIC } from '@/assets/music/music';
import { SOUNDS } from '@/assets/sound/sounds';

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
        this.load.spritesheet("metalBladekeeper", metalBladekeeper, {
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
        this.load.spritesheet("minotaur", minotaur, {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.spritesheet("bringerOfDeath", bringerOfDeath, {
            frameWidth: 140,
            frameHeight: 93,
        });
        this.load.spritesheet("nightBorne", nightBorne, {
            frameWidth: 80,
            frameHeight: 80,
        });

        this.load.spritesheet("knight", knight, {
            frameWidth: 135,
            frameHeight: 135,
        });
        this.load.spritesheet("steelKnight", steelKnight, {
            frameWidth: 180,
            frameHeight: 180,
        });
        this.load.spritesheet("heroKnight", heroKnight, {
            frameWidth: 140,
            frameHeight: 140,
        });
        this.load.spritesheet("martialHero", martialHero, {
            frameWidth: 200,
            frameHeight: 200,
        });
        this.load.spritesheet("oldGolem", oldGolem, {
            frameWidth: 160,
            frameHeight: 160,
        });
        this.load.spritesheet("oldGuardian", oldGuardian, {
            frameWidth: 120,
            frameHeight: 120,
        });
        this.load.spritesheet("womanWarrior", womanWarrior, {
            frameWidth: 142,
            frameHeight: 141,
        });

        this.load.spritesheet("treeMan", treeMan, {
            frameWidth: 128,
            frameHeight: 128,
        });


        Object.entries(MUSIC).forEach(([key, path]) => {
            this.load.audio(key, path);
        });

        Object.entries(SOUNDS).forEach(([key, path]) => {
            this.load.audio(key, path);
        });

        this.load.font('Birthstone', 'assets/fonts/Birthstone-Regular.ttf');

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