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
    character: CharacterModel.Character;
    scale?: number
}

export function generateFirewarrior(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'firewarrior',
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 144, props.frameHeight || 80, props.displayWidth ?? 144 * (props.scale || 5), props.displayHeight ?? 80 * (props.scale || 5),
        props.uiOffsetY || -140, 60);

    entity.setMaxHP(props.character.baseStats.maxHp);


    // 16 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 16 * 2, 16 * 2 + 7, 10);
    entity.createAnimation('attack1', 16 * 10, 16 * 10 + 3, 10, 0);
    entity.createAnimation('attack2', 16 * 11, 16 * 11 + 3, 10, 0);
    entity.createAnimation('attack3', 16 * 12, 16 * 12 + 4, 10, 0);
    entity.createAnimation('special', 16 * 19, 16 * 19 + 15, 10, 0);

    entity.setAttacksConfig(3, true);

    entity.setHitbox(100, 240, 0, 10);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('attack3', [2]);
    entity.setAttackHitFrames('special', [3,4,5,6,7,8,9]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 0, 180, 200, baseDamage, CharacterModel.DamageType.FIRE);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 0, 180, 200, baseDamage, CharacterModel.DamageType.FIRE);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 100, 20, 300, 100, baseDamage, CharacterModel.DamageType.FIRE);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 0, 400, 200, baseDamage / 3, CharacterModel.DamageType.FIRE);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 200,
            minX: 10,
            y: 200
        },
        attack2: {
            x: 200,
            minX: 10,
            y: 200
        },
        attack3: {
            x: 200,
            minX: 10,
            y: 200
        },
        special: {
            x: 200,
            minX: 10,
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
    
    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);
    return entity;
}

export function generateViking(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'viking',
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 115, props.frameHeight || 84, props.displayWidth ?? 115 * (props.scale || 5), props.displayHeight ?? 84 * (props.scale || 5),
        props.uiOffsetY || -80, 0);

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 12, 12 + 7, 6);
    entity.createAnimation('attack1', 12 * 8, 12 * 8 + 3, 10, 0);
    entity.createAnimation('attack2', 12 * 9, 12 * 9 + 3, 10, 0);
    entity.createAnimation('attack3', 12 * 10, 12 * 10 + 3, 10, 0);
    entity.createAnimation('special', 12 * 20, 12 * 20 + 10, 10, 0);

    entity.setAttacksConfig(3, true);

    entity.setHitbox(170, 250, 0, 50);

    // entity.setDebugMode(true);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('attack3', [2]);
    entity.setAttackHitFrames('special', [3, 4]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 50, 180, 200, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 50, 180, 200, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 100, 50, 220, 200, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 0, 100, 500, 200, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 190,
            minX: 10,
            y: 200
        },
        attack2: {
            x: 190,
            minX: 10,
            y: 200
        },
        attack3: {
            x: 190,
            minX: 10,
            y: 200
        },
        special: {
            x: 190,
            minX: 10,
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

export function generateSpearwoman(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'spearwoman',
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 128, props.frameHeight || 115, props.displayWidth ?? 128 *(props.scale || 5), props.displayHeight ?? 115 * (props.scale || 5),
        props.uiOffsetY || -80, 50);

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 22 кадра в ряду

    entity.createAnimation('idle', 0, 7, 12);
    entity.createAnimation('walk', 22 * 2, 22 * 2 + 7, 12);
    entity.createAnimation('attack1', 22 * 11, 22 * 11 + 4, 12, 0);
    entity.createAnimation('attack2', 22 * 12, 22 * 12 + 5, 12, 0);
    entity.createAnimation('attack3', 22 * 13, 22 * 13 + 13, 12, 0);
    entity.createAnimation('special', 22 * 15, 22 * 15 + 21, 12, 0);

    // entity.setDebugMode(true);

    entity.setAttacksConfig(3, true);

    entity.setHitbox(175, 250, 0, 100);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('attack3', [3, 5, 8, 9]);
    entity.setAttackHitFrames('special', [13]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 100, 220, 150, baseDamage, CharacterModel.DamageType.MAGIC);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 100, 220, 150, baseDamage, CharacterModel.DamageType.MAGIC);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 200, 100, 220, 150, baseDamage / 3, CharacterModel.DamageType.MAGIC);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 50, 200, 300, 200, baseDamage * 3, CharacterModel.DamageType.MAGIC);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 250,
            minX: 10,
            y: 200
        },
        attack2: {
            x: 250,
            minX: 10,
            y: 200
        },
        attack3: {
            x: 250,
            minX: 10,
            y: 200
        },
        special: {
            x: 250,
            minX: 10,
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

export function generateWarrior(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'warrior',
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 69, props.frameHeight || 44, props.displayWidth ?? 69*(props.scale || 5), props.displayHeight ?? 44*(props.scale || 5),
        props.uiOffsetY || -80, 50);
    
    entity.setMaxHP(props.character.baseStats.maxHp);

    // 6 кадров в ряду
    entity.createAnimation('idle', 0, 5, 10);
    entity.createAnimation('walk', 6, 12 + 1, 8);
    entity.createAnimation('attack1', 12 + 2, 24 + 2, 10, 0);
    entity.createAnimation('special', 12 * 6 + 5, 14 * 6 - 1, 10, 0);

    entity.setHitbox(150, 150, 0, 20);

    entity.setAttacksConfig(1, true);

    entity.setAttackHitFrames('attack1', [6, 9]);
    entity.setAttackHitFrames('special', [3, 4]);

    const baseDamage = props.character.baseStats.attack / 2;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 50, 200, 150, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 50, 200, 150, baseDamage * 2, CharacterModel.DamageType.PHYSICAL);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 150,
            minX: 10,
            y: 180
        },
        special: {
            x: 150,
            minX: 10,
            y: 180
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

export function generateCrystalKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'crystalKing',
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5),
        props.uiOffsetY || 80);

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 21 кадр в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 21, 28, 14);
    entity.createAnimation('attack1', 105, 112, 14, 0);
    entity.createAnimation('attack2', 21*7, 21*7+6, 14, 0);
    entity.createAnimation('attack3', 21*8, 21*8+6, 14, 0);
    entity.createAnimation('attack4', 21*9, 21*9+16, 14, 0);
    entity.createAnimation('special', 21*10, 21*10+14, 14, 0);

    entity.setHitbox(125, 250, 0, 200.5);
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
                applyAttackDamage(scene, entity, enemies, 125, 187.5, 75, 125, baseDamage * 0.5, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 75, 187.5, 150, 125, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 75, 125, 150, 187.5, baseDamage * 1.25, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack4':
                applyAttackDamage(scene, entity, enemies, 350, 125, 250, 225, baseDamage * 0.75, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 312.5, 125, 437.5, 225, baseDamage * 2, CharacterModel.DamageType.MAGIC);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 180,
            minX: 20,
            y: 200
        },
        attack2: {
            x: 160,
            minX: 20,
            y: 200
        },
        attack3: {
            x: 160,
            minX: 20,
            y: 200
        },
        attack4: {
            x: 425,
            minX: 100,
            y: 200
        },
        special: {
            x: 255,
            minX: 230,
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

export function generateFireKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, 
        props.x || 800, props.y || 400, props.character.baseStats.speed, props.textureKey || 'fireKing', 
        props.character.baseStats,
        props.character.advancedStats,
    props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5),
        props.uiOffsetY || 60);

    entity.setMaxHP(props.character.baseStats.maxHp);

    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 28, 28+7, 12);
    entity.createAnimation('attack1', 28*7, 28*7+10, 12, 0);
    entity.createAnimation('special', 28*10, 28*10+16, 12, 0);
    // entity.sprite.setFlipX(true);

    entity.setHitbox(125, 250, 0, 200);
    // entity.setDebugMode(true);

    entity.setAttacksConfig(1, true);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [12, 13]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 175, 225, 187.5, 75, baseDamage, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 250, 187.5, 312.5, 162.5, baseDamage * 2, CharacterModel.DamageType.FIRE);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 230,
            minX: 10,
            y: 250
        },
        special: {
            x: 230,
            minX: 60,
            y: 250
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
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 192, props.frameHeight || 128, props.displayWidth ?? 192*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5), props.uiOffsetY || -140);
    entity.direction = false;

    entity.setMaxHP(props.character.baseStats.maxHp);

    // 16 кадров в ряду
    entity.createAnimation('idle', 0, 5, 8);
    entity.createAnimation('walk', 16, 16+9, 8);
    entity.createAnimation('attack1', 16*2, 16*2+13, 8, 0);
    entity.createAnimation('special', 16*2, 16*2+13, 8, 0);
    entity.playAnimation('idle', 'idle');

    entity.setAttackHitFrames('attack1', [7]);
    entity.setAttackHitFrames('special', [7]);

    entity.setAttacksConfig(1, true);

    // entity.setDebugMode(true);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        applyAttackDamage(scene, entity, enemies, 200, 40, 400, 200, attackName === 'special' ? baseDamage * 2 : baseDamage, CharacterModel.DamageType.PHYSICAL);
    }

    entity.setAttacksDistances({
        attack1: {
            x: 400,
            minX: 10,
            y: 250
        },
        special: {
            x: 400,
            minX: 10,
            y: 250
        }
    });

    entity.setHitbox(250, 312.5, 0, 25);
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

type AviableCharacter = 'firewarrior' | 'viking' | 'fireKing' | 'frostGuardian' | 'crystalKing' | 'warrior' | 'spearwoman';

export default function generateCharacter(scene: GameScene, team: 'ally' | 'enemy', character: AviableCharacter, props: CharacterProps): Character {
    switch(character) {
        case 'fireKing':
            return generateFireKing(scene, team, props);
        case 'frostGuardian':
            return generateFrostGuardian(scene, team, props);
        case 'crystalKing':
            return generateCrystalKing(scene, team, props);
        case 'warrior':
            return generateWarrior(scene, team, props);
        case 'spearwoman':
            return generateSpearwoman(scene, team, props);
        case 'viking':
            return generateViking(scene, team, props);
        case 'firewarrior':
            return generateFirewarrior(scene, team, props);
    }
}