import Character, { applyAttackDamage } from '@/components/Character';
import { Character as CharacterModel } from '@/shared/types/character';

import { EventBus } from '@/utils/eventBus';
import type GameScene from '@/scenes/GameScene';

interface CharacterProps {
    x: number;
    y: number;
    textureKey?: string;
    frameWidth?: number;
    frameHeight?: number;
    displayWidth?: number;
    displayHeight?: number;
    uiOffsetY?: number;
    character: CharacterModel.Character
}

export function generateCrystalKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'crystalKing',
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*5, props.displayHeight ?? 128*5,
        props.uiOffsetY || 0);

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 21 кадр в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 21, 28, 14);
    entity.createAnimation('attack1', 105, 112, 14, 0);
    entity.createAnimation('attack2', 21*7, 21*7+6, 14, 0);
    entity.createAnimation('attack3', 21*8, 21*8+6, 14, 0);
    entity.createAnimation('attack4', 21*9, 21*9+16, 14, 0);
    entity.createAnimation('special', 21*10, 21*10+14, 14, 0);

    entity.setHitbox(100, 150, 0, 130);
    // entity.setDebugMode(true);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('attack2', [4]);
    entity.setAttackHitFrames('attack3', [4]);
    entity.setAttackHitFrames('attack4', [10, 11]);
    entity.setAttackHitFrames('special', [8, 9, 10]);

    entity.setAttacksConfig(3, true);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 150, 60, 100, baseDamage * 0.5);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 60, 150, 120, 100, baseDamage);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 60, 100, 120, 150, baseDamage * 1.25);
                break;
            case 'attack4':
                applyAttackDamage(scene, entity, enemies, 280, 100, 200, 180, baseDamage * 0.75);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 250, 100, 350, 180, baseDamage * 2);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 100,
            y: 150
        },
        attack2: {
            x: 80,
            y: 150
        },
        attack3: {
            x: 80,
            y: 150
        },
        attack4: {
            x: 300,
            y: 150
        },
        special: {
            x: 100,
            y: 150
        }
    })

    if(team === 'ally') {
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateFireKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, 
        props.x || 800, props.y || 400, props.character.baseStats.speed, props.textureKey || 'fireKing', 
    props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*5, props.displayHeight ?? 128*5,
        props.uiOffsetY || 0);

    entity.setMaxHP(props.character.baseStats.maxHp);

    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 28, 28+7, 12);
    entity.createAnimation('attack1', 28*7, 28*7+10, 12, 0);
    entity.createAnimation('special', 28*10, 28*10+16, 12, 0);
    // entity.sprite.setFlipX(true);

    entity.setHitbox(100, 150, 0, 130);
    // entity.setDebugMode(true);

    entity.setAttacksConfig(1, true);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [12, 13]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 140, 180, 150, 60, baseDamage);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 150, 250, 130, baseDamage * 2);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 100,
            y: 200
        },
        special: {
            x: 100,
            y: 200
        }
    })

    if(team === 'ally') {
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateFrostGuardian(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'frostGuardian', 
        props.frameWidth || 192, props.frameHeight || 128, props.displayWidth ?? 192*5, props.displayHeight ?? 128*5, props.uiOffsetY || -140);
    entity.direction = false;

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 16 кадров в ряду
    entity.createAnimation('idle', 0, 5, 8);
    entity.createAnimation('walk', 16, 16+9, 12);
    entity.createAnimation('attack1', 16*2, 16*2+13, 12, 0);
    entity.playAnimation('idle', 'idle');

    entity.setAttackHitFrames('attack1', [7]);

    entity.setAttacksConfig(1, false);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        applyAttackDamage(scene, entity, enemies, 150, 20, 250, 100, baseDamage);
    }

    entity.setAttacksDistances({
        attack1: {
            x: 100,
            y: 200
        },
        special: {
            x: 0,
            y: 0
        }
    });

    entity.setHitbox(200, 250, 0, 20);
    // entity.setDebugMode(true);
    entity.flipSpritesheet = true;
    if(team === 'ally') {
        scene.addAlly(entity);
    } else {
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    return entity;
}

type AviableCharacter = 'fireKing' | 'frostGuardian' | 'crystalKing';

export default function generateCharacter(scene: GameScene, team: 'ally' | 'enemy', character: AviableCharacter, props: CharacterProps): Character {
    switch(character) {
        case 'fireKing':
            return generateFireKing(scene, team, props);
        case 'frostGuardian':
            return generateFrostGuardian(scene, team, props);
        case 'crystalKing':
            return generateCrystalKing(scene, team, props);
    }
}