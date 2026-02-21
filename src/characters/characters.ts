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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);


    // 16 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 16 * 2, 16 * 2 + 7, 10);
    entity.createAnimation('attack1', 16 * 10, 16 * 10 + 3, 10, 0);
    entity.createAnimation('attack2', 16 * 11, 16 * 11 + 3, 10, 0);
    entity.createAnimation('attack3', 16 * 12, 16 * 12 + 4, 10, 0);
    entity.createAnimation('special', 16 * 19, 16 * 19 + 15, 10, 0);

    entity.setAttacksConfig(3, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(100 * hitBoxScale, 240 * hitBoxScale, 0, 10 * hitBoxScale);

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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 12, 12 + 7, 6);
    entity.createAnimation('attack1', 12 * 8, 12 * 8 + 3, 10, 0);
    entity.createAnimation('attack2', 12 * 9, 12 * 9 + 3, 10, 0);
    entity.createAnimation('attack3', 12 * 10, 12 * 10 + 3, 10, 0);
    entity.createAnimation('special', 12 * 20, 12 * 20 + 10, 10, 0);

    entity.setAttacksConfig(3, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(170 * hitBoxScale, 250 * hitBoxScale, 0, 50 * hitBoxScale);

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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 22 кадра в ряду

    entity.createAnimation('idle', 0, 7, 12);
    entity.createAnimation('walk', 22 * 2, 22 * 2 + 7, 12);
    entity.createAnimation('attack1', 22 * 11, 22 * 11 + 4, 12, 0);
    entity.createAnimation('attack2', 22 * 12, 22 * 12 + 5, 12, 0);
    entity.createAnimation('attack3', 22 * 13, 22 * 13 + 13, 12, 0);
    entity.createAnimation('special', 22 * 15, 22 * 15 + 21, 12, 0);

    // entity.setDebugMode(true);

    entity.setAttacksConfig(3, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(175 * hitBoxScale, 250 * hitBoxScale, 0, 100 * hitBoxScale);

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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 6 кадров в ряду
    entity.createAnimation('idle', 0, 5, 10);
    entity.createAnimation('walk', 6, 12 + 1, 8);
    entity.createAnimation('attack1', 12 + 2, 24 + 1, 10, 0);
    entity.createAnimation('special', 12 * 6 + 5, 14 * 6 - 1, 10, 0);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(150 * hitBoxScale, 150 * hitBoxScale, 0, 20 * hitBoxScale);

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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 21 кадр в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 21, 28, 14);
    entity.createAnimation('attack1', 105, 112, 14, 0);
    entity.createAnimation('attack2', 21*7, 21*7+6, 14, 0);
    entity.createAnimation('attack3', 21*8, 21*8+6, 14, 0);
    entity.createAnimation('attack4', 21*9, 21*9+16, 14, 0);
    entity.createAnimation('special', 21*10, 21*10+14, 14, 0);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 250 * hitBoxScale, 0, 200.5 * hitBoxScale);
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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 28, 28+7, 12);
    entity.createAnimation('attack1', 28*7, 28*7+10, 12, 0);
    entity.createAnimation('special', 28*10, 28*10+16, 12, 0);
    // entity.sprite.setFlipX(true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 250 * hitBoxScale, 0, 200 * hitBoxScale);
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
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

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

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(250 * hitBoxScale, 312.5 * hitBoxScale, 0, 25 * hitBoxScale);
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

export function generateDemonSlime(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'demonSlime', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 288, props.frameHeight || 160, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 160*(props.scale || 5), props.uiOffsetY || -60);
    entity.direction = false;

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 22 кадра в ряду
    entity.createAnimation('idle', 0, 5, 6);
    entity.createAnimation('walk', 22, 22+11, 8);
    entity.createAnimation('attack1', 22*2, 22*2+14, 10, 0);
    entity.createAnimation('special', 22*2, 22*2+14, 10, 0);
    entity.playAnimation('idle', 'idle');

    entity.setAttackHitFrames('attack1', [9]);
    entity.setAttackHitFrames('special', [9]);

    entity.setAttacksConfig(1, true);

    // entity.setDebugMode(true);

    const baseDamage = props.character.baseStats.attack;
    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        applyAttackDamage(scene, entity, enemies, 300, 300, 600, 200, attackName === 'special' ? baseDamage * 2 : baseDamage, CharacterModel.DamageType.PHYSICAL);
    }

    entity.setAttacksDistances({
        attack1: {
            x: 500,
            minX: 50,
            y: 250
        },
        special: {
            x: 500,
            minX: 50,
            y: 250
        }
    });

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(160 * hitBoxScale, 325 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.flipSpritesheet = true;
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

    return entity;
}

export function generateElementalWind(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'elementalWind', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5), props.uiOffsetY || 80);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 30, 37, 10, -1);
    entity.createAnimation('attack1', 210, 227, 10, 0);
    entity.createAnimation('attack2', 240, 265, 10, 0);
    entity.createAnimation('special', 270, 299, 10, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 200 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [0, 2, 8, 9]);
    entity.setAttackHitFrames('attack2', [0, 2, 8, 9, 18]);
    entity.setAttackHitFrames('special', [5, 11, 17, 19, 20]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1':
                const dmg = frameIndex === 2 ? baseDamage / 2 : baseDamage / 4;
                applyAttackDamage(scene, entity, enemies, 150, 200, 250, 200, dmg, CharacterModel.DamageType.PHYSICAL);
                break;
            case 'attack2':
                if(frameIndex !== 18) {
                    applyAttackDamage(scene, entity, enemies, 150, 200, 250, 200, baseDamage / 4, CharacterModel.DamageType.PHYSICAL);
                } else {
                    applyAttackDamage(scene, entity, enemies, 225, 200, 450, 200, baseDamage / 2, CharacterModel.DamageType.PHYSICAL);
                }
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 0, 200, 500, 300, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 250,
            minX: 10,
            y: 250
        },
        attack2: {
            x: 250,
            minX: 10,
            y: 250
        },
        special: {
            x: 400,
            minX: 10,
            y: 250
        }
    });

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

export function generateGroundMonk(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'groundMonk', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5), props.uiOffsetY || 80);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 5, 10, -1);
    entity.createAnimation('walk', 25, 32, 10, -1);
    entity.createAnimation('attack1', 125, 130, 10, 0);
    entity.createAnimation('attack2', 150, 161, 10, 0);
    entity.createAnimation('attack3', 175, 197, 10, 0);
    entity.createAnimation('special', 200, 224, 10, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 175 * hitBoxScale, 0, 200 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2, 5, 8]);
    entity.setAttackHitFrames('attack3', [2, 5, 8, 17, 18]);
    entity.setAttackHitFrames('special', [5, 6, ...Array.from({ length: 22 - 8 }).map((_, i) => i + 8)]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 150, 200, 150, 200, dmg, CharacterModel.DamageType.PHYSICAL);
                break;
            }
            case 'attack2': {
                const dmg = baseDamage / 3;
                applyAttackDamage(scene, entity, enemies, 150, 200, 150, 200, dmg, CharacterModel.DamageType.PHYSICAL);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 180, 180, 220, 320, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 150,
            minX: 10,
            y: 180
        },
        attack2: {
            x: 150,
            minX: 10,
            y: 180
        },
        attack3: {
            x: 150,
            minX: 10,
            y: 180
        },
        special: {
            x: 200,
            minX: 100,
            y: 180
        }
    });

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

export function generateWaterPriestess(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'waterPriestess', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288*(props.scale || 5), props.displayHeight ?? 128*(props.scale || 5), props.uiOffsetY || 80);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 32, 41, 10, -1);
    entity.createAnimation('attack1', 224, 230, 10, 0);
    entity.createAnimation('attack2', 256, 276, 10, 0);
    entity.createAnimation('special', 320, 351, 10, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 200 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2, 7, 14, 15]);
    entity.setAttackHitFrames('special', [12, 13, 14, 22, 23]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 150, 200, 300, 200, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'attack2': {
                const dmg = baseDamage / 3;
                applyAttackDamage(scene, entity, enemies, 150, 200, 300, 200, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 280, 200, 420, 250, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 300,
            minX: 10,
            y: 200
        },
        attack2: {
            x: 300,
            minX: 10,
            y: 200
        },
        special: {
            x: 300,
            minX: 100,
            y: 200
        }
    });

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

export function generateBlueSlime(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'blueSlime', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80*(props.scale || 5), props.displayHeight ?? 80*(props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 125 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 150,
            minX: 10,
            y: 125
        },
        special: {
            x: 150,
            minX: 10,
            y: 125
        }
    });

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

export function generateGreenSlime(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'greenSlime', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80*(props.scale || 5), props.displayHeight ?? 80*(props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 125 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 150,
            minX: 10,
            y: 125
        },
        special: {
            x: 150,
            minX: 10,
            y: 125
        }
    });

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

export function generatePurpleSlime(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'purpleSlime', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80*(props.scale || 5), props.displayHeight ?? 80*(props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 125 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 150,
            minX: 10,
            y: 125
        },
        special: {
            x: 150,
            minX: 10,
            y: 125
        }
    });

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

export function generateFantasyWarrior(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed, 
        props.textureKey || 'fantasyWarrior', 
        props.character.baseStats,
        props.character.advancedStats,
        props.frameWidth || 162, props.frameHeight || 162, props.displayWidth ?? 162*(props.scale || 5), props.displayHeight ?? 162*(props.scale || 5), props.uiOffsetY || -150);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 9, 10, -1);
    entity.createAnimation('walk', 10, 10 + 7, 10, -1);
    entity.createAnimation('attack1', 10 * 2, 10 * 2 + 6, 10, 0);
    entity.createAnimation('attack2', 10 * 3, 10 * 3 + 6, 10, 0);
    entity.createAnimation('special', 10 * 4, 10 * 4 + 7, 10, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(125 * hitBoxScale, 250 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [4]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch(attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, dmg, CharacterModel.DamageType.MAGIC);
                break;
            }
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, baseDamage, CharacterModel.DamageType.MAGIC);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, baseDamage * 2, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 200,
            minX: 10,
            y: 220
        },
        attack2: {
            x: 200,
            minX: 10,
            y: 220
        },
        special: {
            x: 200,
            minX: 10,
            y: 220
        }
    });

    // entity.setDebugMode(true);

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

type AviableCharacter = 'firewarrior' | 'viking' | 'fireKing' | 'frostGuardian' | 'crystalKing' | 'warrior'
 | 'spearwoman' | 'demonSlime' | 'elementalWind'
 | 'groundMonk' | 'waterPriestess' | 'blueSlime' | 'greenSlime' | 'purpleSlime' 
 | 'fantasyWarrior';

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
        case 'demonSlime':
            return generateDemonSlime(scene, team, props);
        case 'elementalWind':
            return generateElementalWind(scene, team, props); 
        case 'groundMonk':
            return generateGroundMonk(scene, team, props);
        case 'waterPriestess':
            return generateWaterPriestess(scene, team, props);
        case 'blueSlime':
            return generateBlueSlime(scene, team, props);
        case 'greenSlime':
            return generateGreenSlime(scene, team, props);
        case 'purpleSlime':
            return generatePurpleSlime(scene, team, props);
        case 'fantasyWarrior':
            return generateFantasyWarrior(scene, team, props);
        default:
            const _: never = character;
            throw new Error('Unknown character: ' + character);
    }
}