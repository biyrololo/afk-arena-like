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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
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
    entity.setAttackHitFrames('special', [3, 4, 5, 7, 9]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 0, 180, 200, baseDamage, CharacterModel.DamageType.FIRE, 1);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 0, 180, 200, baseDamage, CharacterModel.DamageType.FIRE, 1);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 100, 20, 300, 100, baseDamage, CharacterModel.DamageType.FIRE, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 0, 400, 200, baseDamage / 2, CharacterModel.DamageType.FIRE);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 80,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 150,
            minX: 10,
            y: 10
        },
        attack3: {
            x: 80,
            minX: 10,
            y: 10
        },
        special: {
            x: 200,
            minX: 10,
            y: 10
        }
    })

    if (team === 'ally') {
        scene.addAlly(entity);
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);
    return entity;
}

export function generateViking(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'viking',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
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

    entity.setHitbox(120 * hitBoxScale, 240 * hitBoxScale, 0, 25 * hitBoxScale);

    // entity.setDebugMode(true);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('attack3', [2]);
    entity.setAttackHitFrames('special', [3, 4]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 50, 180, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 2);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 50, 180, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 2);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 100, 50, 220, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 2);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 0, 100, 500, 200, baseDamage * 3, CharacterModel.DamageType.PHYSICAL);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 60,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 60,
            minX: 10,
            y: 10
        },
        attack3: {
            x: 60,
            minX: 10,
            y: 10
        },
        special: {
            x: 60,
            minX: 10,
            y: 10
        }
    })

    if (team === 'ally') {
        scene.addAlly(entity);
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);
    return entity;
}

export function generateSpearwoman(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'spearwoman',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 128, props.frameHeight || 115, props.displayWidth ?? 128 * (props.scale || 5), props.displayHeight ?? 115 * (props.scale || 5),
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

    entity.setHitbox(120 * hitBoxScale, 200 * hitBoxScale, 0, 110 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('attack3', [3, 5, 8, 9]);
    entity.setAttackHitFrames('special', [13]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 100, 220, 150, baseDamage, CharacterModel.DamageType.MAGIC, 1);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 100, 220, 150, baseDamage, CharacterModel.DamageType.MAGIC, 1);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 100, 100, 320, 150, baseDamage / 3, CharacterModel.DamageType.MAGIC, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 50, 200, 300, 200, baseDamage * 3.5, CharacterModel.DamageType.MAGIC);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 80,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 80,
            minX: 10,
            y: 10
        },
        attack3: {
            x: 130,
            minX: 10,
            y: 10
        },
        special: {
            x: 60,
            minX: 10,
            y: 10
        }
    })

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);
    return entity;
}

export function generateWarrior(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'warrior',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 69, props.frameHeight || 44, props.displayWidth ?? 69 * (props.scale || 5), props.displayHeight ?? 44 * (props.scale || 5),
        props.uiOffsetY || -80, 50);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 6 кадров в ряду
    entity.createAnimation('idle', 0, 5, 10);
    entity.createAnimation('walk', 6, 12 + 1, 8);
    entity.createAnimation('attack1', 12 + 2, 24 + 1, 10, 0);
    entity.createAnimation('special', 12 * 6 + 5, 14 * 6 - 1, 10, 0);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(100 * hitBoxScale, 180 * hitBoxScale, 0, 20 * hitBoxScale);

    entity.setAttacksConfig(1, true);

    entity.setAttackHitFrames('attack1', [6, 9]);
    entity.setAttackHitFrames('special', [3, 4]);

    const baseDamage = props.character.baseStats.attack / 2;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 100, 20, 200, 150, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 20, 200, 150, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 2);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 60,
            minX: 10,
            y: 20
        },
        special: {
            x: 60,
            minX: 10,
            y: 20
        }
    })

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateCrystalKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 400, props.y || 300, props.character.baseStats.speed, props.textureKey || 'crystalKing',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5),
        props.uiOffsetY || 80);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 21 кадр в ряду
    entity.createAnimation('idle', 0, 7, 10);
    entity.createAnimation('walk', 21, 28, 14);
    entity.createAnimation('attack1', 105, 112, 14, 0);
    entity.createAnimation('attack2', 21 * 7, 21 * 7 + 6, 14, 0);
    entity.createAnimation('attack3', 21 * 8, 21 * 8 + 6, 14, 0);
    entity.createAnimation('attack4', 21 * 9, 21 * 9 + 16, 14, 0);
    entity.createAnimation('special', 21 * 10, 21 * 10 + 14, 14, 0);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 200 * hitBoxScale, 0, 215 * hitBoxScale);
    // entity.setDebugMode(true);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('attack2', [4]);
    entity.setAttackHitFrames('attack3', [4]);
    entity.setAttackHitFrames('attack4', [10, 11]);
    entity.setAttackHitFrames('special', [8, 9, 10]);

    entity.setAttacksConfig(3, true);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 110, 200, 180, 200, baseDamage * 0.5, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 110, 187.5, 200, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'attack3':
                applyAttackDamage(scene, entity, enemies, 70, 200, 200, 187.5, baseDamage * 1.25, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'attack4':
                applyAttackDamage(scene, entity, enemies, 350, 125, 250, 225, baseDamage * 0.75, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 312.5, 200, 437.5, 225, baseDamage * 2.5, CharacterModel.DamageType.MAGIC);
                break;
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 70,
            minX: 20,
            y: 20
        },
        attack2: {
            x: 70,
            minX: 20,
            y: 20
        },
        attack3: {
            x: 70,
            minX: 20,
            y: 20
        },
        attack4: {
            x: 425,
            minX: 100,
            y: 20
        },
        special: {
            x: 200,
            minX: 150,
            y: 20
        }
    })

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateFireKing(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene,
        props.x || 800, props.y || 400, props.character.baseStats.speed, props.textureKey || 'fireKing',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5),
        props.uiOffsetY || 60);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 28, 35, 12, -1);
    entity.createAnimation('attack1', 196, 206, 12, 0);
    entity.createAnimation('special', 280, 296, 12, 0);
    // entity.sprite.setFlipX(true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 220 * hitBoxScale, 0, 210 * hitBoxScale);
    // entity.setDebugMode(true);

    entity.setAttacksConfig(1, true);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [12, 13]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 160, 225, 300, 250, baseDamage, CharacterModel.DamageType.PHYSICAL, 2);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 200, 450, 250, baseDamage * 4, CharacterModel.DamageType.FIRE);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 180,
            minX: 30,
            y: 20
        },
        special: {
            x: 250,
            minX: 60,
            y: 20
        }
    })

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateFrostGuardian(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'frostGuardian',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 192, props.frameHeight || 128, props.displayWidth ?? 192 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5), props.uiOffsetY || -140);
    entity.setDirection(false);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 16 кадров в ряду
    entity.createAnimation('idle', 0, 5, 8);
    entity.createAnimation('walk', 16, 16 + 9, 8);
    entity.createAnimation('attack1', 16 * 2, 16 * 2 + 13, 8, 0);
    entity.createAnimation('special', 16 * 2, 16 * 2 + 13, 8, 0);
    entity.playAnimation('idle', 'idle');

    entity.setAttackHitFrames('attack1', [7]);
    entity.setAttackHitFrames('special', [7]);

    entity.setAttacksConfig(1, true);

    // entity.setDebugMode(true);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        applyAttackDamage(scene, entity, enemies, 230, 40, 450, 350, attackName === 'special' ? baseDamage * 4 : baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
    }

    entity.setAttacksDistances({
        attack1: {
            x: 250,
            minX: 30,
            y: 60
        },
        special: {
            x: 250,
            minX: 30,
            y: 60
        }
    });

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(200 * hitBoxScale, 400 * hitBoxScale, 0, 25 * hitBoxScale);
    entity.flipSpritesheet = true;
    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    return entity;
}

export function generateDemonSlime(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'demonSlime',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 160, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 160 * (props.scale || 5), props.uiOffsetY || -20);
    entity.setDirection(false);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 22 кадра в ряду
    entity.createAnimation('idle', 0, 5, 6);
    entity.createAnimation('walk', 22, 22 + 11, 8);
    entity.createAnimation('attack1', 22 * 2, 22 * 2 + 14, 10, 0);
    entity.createAnimation('special', 22 * 2, 22 * 2 + 14, 10, 0);
    entity.playAnimation('idle', 'idle');

    entity.setAttackHitFrames('attack1', [9]);
    entity.setAttackHitFrames('special', [9]);

    entity.setAttacksConfig(1, true);

    // entity.setDebugMode(true);

    const baseDamage = props.character.baseStats.attack;
    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        applyAttackDamage(scene, entity, enemies, 300, 300, 600, 200, attackName === 'special' ? baseDamage * 4 : baseDamage, CharacterModel.DamageType.PHYSICAL);
    }

    entity.setAttacksDistances({
        attack1: {
            x: 400,
            minX: 30,
            y: 10
        },
        special: {
            x: 400,
            minX: 30,
            y: 10
        }
    });

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(160 * hitBoxScale, 340 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.flipSpritesheet = true;
    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    return entity;
}

export function generateElementalWind(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'elementalWind',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5), props.uiOffsetY || 120);

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
    entity.setHitbox(125 * hitBoxScale, 180 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [0, 2, 8, 9]);
    entity.setAttackHitFrames('attack2', [0, 2, 8, 9, 18]);
    entity.setAttackHitFrames('special', [5, 11, 17, 19, 20]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, frameIndex: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                const dmg = frameIndex === 2 ? baseDamage / 2 : baseDamage / 4;
                if (frameIndex < 3) {
                    applyAttackDamage(scene, entity, enemies, 100, 200, 150, 200, dmg, CharacterModel.DamageType.PHYSICAL, 1);
                } else {
                    applyAttackDamage(scene, entity, enemies, 150, 200, 250, 200, dmg, CharacterModel.DamageType.PHYSICAL, 1);
                }
                break;
            case 'attack2':
                if (frameIndex < 3) {
                    applyAttackDamage(scene, entity, enemies, 100, 200, 150, 200, baseDamage / 4, CharacterModel.DamageType.PHYSICAL, 1);
                }
                else if (frameIndex !== 18) {
                    applyAttackDamage(scene, entity, enemies, 150, 200, 250, 200, baseDamage / 4, CharacterModel.DamageType.PHYSICAL, 1);
                } else {
                    applyAttackDamage(scene, entity, enemies, 225, 200, 450, 200, baseDamage / 2, CharacterModel.DamageType.PHYSICAL, 3);
                }
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 0, 200, 500, 300, baseDamage, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 70,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 70,
            minX: 10,
            y: 10
        },
        special: {
            x: 200,
            minX: 40,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5), props.uiOffsetY || 80);

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
    entity.setHitbox(100 * hitBoxScale, 175 * hitBoxScale, 0, 200 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2, 5, 8]);
    entity.setAttackHitFrames('attack3', [2, 5, 8, 17, 18]);
    entity.setAttackHitFrames('special', [5, 6, ...Array.from({ length: 22 - 8 }).map((_, i) => i + 8)]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, 200, 150, 200, dmg, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'attack2': {
                const dmg = baseDamage / 3;
                applyAttackDamage(scene, entity, enemies, 100, 200, 150, 200, dmg, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 180, 180, 220, 320, baseDamage / 4, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 60,
            minX: 10,
            y: 20
        },
        attack2: {
            x: 60,
            minX: 10,
            y: 20
        },
        attack3: {
            x: 60,
            minX: 10,
            y: 20
        },
        special: {
            x: 100,
            minX: 70,
            y: 20
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 288, props.frameHeight || 128, props.displayWidth ?? 288 * (props.scale || 5), props.displayHeight ?? 128 * (props.scale || 5), props.uiOffsetY || 110);

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
    entity.setHitbox(125 * hitBoxScale, 180 * hitBoxScale, 0, 225 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [2]);
    entity.setAttackHitFrames('attack2', [2, 7, 14, 15]);
    entity.setAttackHitFrames('special', [12, 13, 14, 22, 23]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 150, 200, 300, 300, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'attack2': {
                const dmg = baseDamage / 3;
                applyAttackDamage(scene, entity, enemies, 150, 200, 300, 300, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 280, 200, 420, 300, baseDamage / 2, CharacterModel.DamageType.MAGIC);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 180,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 180,
            minX: 10,
            y: 10
        },
        special: {
            x: 180,
            minX: 100,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80 * (props.scale || 5), props.displayHeight ?? 80 * (props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 45 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC, 1);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 70,
            minX: 10,
            y: 5
        },
        special: {
            x: 70,
            minX: 10,
            y: 5
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80 * (props.scale || 5), props.displayHeight ?? 80 * (props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 45 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC, 1);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 70,
            minX: 10,
            y: 10
        },
        special: {
            x: 70,
            minX: 10,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80 * (props.scale || 5), props.displayHeight ?? 80 * (props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 12, 12 + 5, 10, -1);
    entity.createAnimation('attack1', 12 * 6, 12 * 6 + 11, 10, 0);
    entity.createAnimation('special', 12 * 6, 12 * 6 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 45 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -10, 200, 120, baseDamage, CharacterModel.DamageType.MAGIC, 1);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 70,
            minX: 10,
            y: 10
        },
        special: {
            x: 70,
            minX: 10,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
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
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 162, props.frameHeight || 162, props.displayWidth ?? 162 * (props.scale || 5), props.displayHeight ?? 162 * (props.scale || 5), props.uiOffsetY || -150);

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

    entity.setHitbox(125 * hitBoxScale, 200 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [4]);
    entity.setAttackHitFrames('attack2', [2]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, dmg, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, baseDamage, CharacterModel.DamageType.MAGIC, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 150, -40, 300, 300, baseDamage * 3, CharacterModel.DamageType.MAGIC, 3);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 160,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 160,
            minX: 10,
            y: 10
        },
        special: {
            x: 160,
            minX: 10,
            y: 10
        }
    });

    // entity.setDebugMode(true);

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateKitsune(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'kitsune',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 128, props.frameHeight || 128, props.displayWidth ?? 64 * (props.scale || 5), props.displayHeight ?? 64 * (props.scale || 5), props.uiOffsetY || -70);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 7, 6, -1);
    entity.createAnimation('walk', 10, 10 + 7, 6, -1);
    entity.createAnimation('attack1', 10 * 2, 10 * 2 + 9, 10, 0);
    entity.createAnimation('special', 10 * 3, 10 * 3 + 9, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(100 * hitBoxScale, 200 * hitBoxScale, 0, 64);

    entity.setAttackHitFrames('attack1', [8]);
    entity.setAttackHitFrames('special', [7]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, 60, 200, 200, dmg, CharacterModel.DamageType.MAGIC, 2);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 60, 200, 200, baseDamage * 2, CharacterModel.DamageType.MAGIC, 2);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 80,
            minX: 10,
            y: 10
        },
        special: {
            x: 80,
            minX: 10,
            y: 10
        }
    });

    // entity.setDebugMode(true);

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateMinotaur(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'minotaur',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 128, props.frameHeight || 128, props.displayWidth ?? 128 * (props.scale || 5) * 3 / 5, props.displayHeight ?? 128 * (props.scale || 5) * 3 / 5, props.uiOffsetY || -90);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 12 кадров в ряду
    entity.createAnimation('idle', 0, 9, 10, -1);
    entity.createAnimation('walk', 12, 12 + 11, 10, -1);
    entity.createAnimation('attack1', 24, 24 + 4, 10, 0);
    entity.createAnimation('special', 24, 24 + 4, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(100 * hitBoxScale, 260 * hitBoxScale, 0, 60 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [4]);
    entity.setAttackHitFrames('special', [4]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 100, 80, 200, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 80, 200, 200, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 100,
            minX: 10,
            y: 10
        },
        special: {
            x: 100,
            minX: 10,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateBringerOfDeath(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'bringerOfDeath',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 140, props.frameHeight || 93, props.displayWidth ?? 140 * (props.scale || 5), props.displayHeight ?? 93 * (props.scale || 5), props.uiOffsetY || -70, -35 * (props.scale || 5));

    entity.setDirection(false);
    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 8 кадров в ряду
    entity.createAnimation('idle', 0, 7, 10, -1);
    entity.createAnimation('walk', 8, 8 + 7, 10, -1);
    entity.createAnimation('attack1', 16, 16 + 9, 10, 0);
    entity.createAnimation('special', 16, 16 + 9, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(100 * hitBoxScale, 260 * hitBoxScale, 0, 100 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    // entity.setDebugMode(true);

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 200, 80, 400, 300, baseDamage, CharacterModel.DamageType.PHYSICAL, 2);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 80, 400, 300, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 2);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 300,
            minX: 40,
            y: 10
        },
        special: {
            x: 300,
            minX: 40,
            y: 10
        }
    });

    entity.flipSpritesheet = true;

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateNightBorne(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'nightBorne',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 80, props.frameHeight || 80, props.displayWidth ?? 80 * (props.scale || 5), props.displayHeight ?? 80 * (props.scale || 5), props.uiOffsetY || -40);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 23 кадров в ряду
    entity.createAnimation('idle', 0, 8, 10, -1);
    entity.createAnimation('walk', 23, 23 + 5, 10, -1);
    entity.createAnimation('attack1', 23 * 2, 23 * 2 + 11, 10, 0);
    entity.createAnimation('special', 23 * 2, 23 * 2 + 11, 10, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 160 * hitBoxScale, 0, 40 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [10]);
    entity.setAttackHitFrames('special', [10]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 100, 40, 200, 160, baseDamage, CharacterModel.DamageType.MAGIC, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 40, 200, 160, baseDamage * 2, CharacterModel.DamageType.MAGIC, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 80,
            minX: 20,
            y: 10
        },
        special: {
            x: 80,
            minX: 20,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateKnight(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'knight',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 135, props.frameHeight || 135, props.displayWidth ?? 135 * (props.scale || 5), props.displayHeight ?? 135 * (props.scale || 5), props.uiOffsetY || -120);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 9, 10, -1);
    entity.createAnimation('walk', 10, 10 + 5, 8, -1);
    entity.createAnimation('attack1', 10 * 2, 10 * 2 + 3, 8, 0);
    entity.createAnimation('attack2', 10 * 3, 10 * 3 + 3, 8, 0);
    entity.createAnimation('special', 10 * 4, 10 * 4 + 4, 8, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(100 * hitBoxScale, 180 * hitBoxScale, 0, 0 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [3]);
    entity.setAttackHitFrames('attack2', [3]);
    entity.setAttackHitFrames('special', [4]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
            case 'attack2': {
                applyAttackDamage(scene, entity, enemies, 140, 0, 200, 160, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 140, 0, 200, 160, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 170,
            minX: 10,
            y: 10
        },
        attack2: {
            x: 170,
            minX: 10,
            y: 10
        },
        special: {
            x: 170,
            minX: 10,
            y: 10
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateSteelKnight(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'steelKnight',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 180, props.frameHeight || 180, props.displayWidth ?? 180 * (props.scale || 5), props.displayHeight ?? 180 * (props.scale || 5), props.uiOffsetY || -140);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 11 кадров в ряду
    entity.createAnimation('idle', 0, 10, 8, -1);
    entity.createAnimation('walk', 11, 11 + 7, 8, -1);
    entity.createAnimation('attack1', 11 * 2, 11 * 2 + 6, 8, 0);
    entity.createAnimation('special', 11 * 3, 11 * 3 + 6, 8, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(140 * hitBoxScale, 240 * hitBoxScale, 20 * hitBoxScale, 0 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 100, 0, 200, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 200, 0, 300, 200, baseDamage * 3, CharacterModel.DamageType.PHYSICAL, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 50,
            minX: 10,
            y: 5
        },
        special: {
            x: 100,
            minX: 30,
            y: 5
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateHeroKnight(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'heroKnight',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 140, props.frameHeight || 140, props.displayWidth ?? 140 * (props.scale || 5), props.displayHeight ?? 140 * (props.scale || 5), props.uiOffsetY || -160);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 11 кадров в ряду
    entity.createAnimation('idle', 0, 10, 8, -1);
    entity.createAnimation('walk', 11, 11 + 7, 8, -1);
    entity.createAnimation('attack1', 11 * 2, 11 * 2 + 5, 8, 0);
    entity.createAnimation('special', 11 * 2, 11 * 2 + 5, 8, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 200 * hitBoxScale, 0, -35 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 100, -40, 200, 200, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, -40, 200, 200, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 80,
            minX: 10,
            y: 5
        },
        special: {
            x: 80,
            minX: 10,
            y: 5
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}
export function generateMartialHero(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'martialHero',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 200, props.frameHeight || 200, props.displayWidth ?? 200 * (props.scale || 5), props.displayHeight ?? 200 * (props.scale || 5), props.uiOffsetY || -160);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 8 кадров в ряду
    entity.createAnimation('idle', 0, 7, 8, -1);
    entity.createAnimation('walk', 8, 8 + 7, 10, -1);
    entity.createAnimation('attack1', 8 * 2, 8 * 2 + 5, 6, 0);
    entity.createAnimation('special', 8 * 3, 8 * 3 + 5, 6, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;
    entity.setHitbox(125 * hitBoxScale, 260 * hitBoxScale, 0, -20 * hitBoxScale);

    entity.setAttackHitFrames('attack1', [5]);
    entity.setAttackHitFrames('special', [5]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                applyAttackDamage(scene, entity, enemies, 240, -5, 400, 250, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'special':
                applyAttackDamage(scene, entity, enemies, 240, -5, 400, 250, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 1);
                break
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 300,
            minX: 10,
            y: 5
        },
        special: {
            x: 300,
            minX: 10,
            y: 5
        }
    });

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    // entity.setDebugMode(true);

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateOldGolem(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'oldGolem',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 160, props.frameHeight || 160, props.displayWidth ?? 160 * (props.scale || 5), props.displayHeight ?? 160 * (props.scale || 5), props.uiOffsetY || -230);

    entity.setDirection(false);
    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 8 кадров в ряду
    entity.createAnimation('idle', 0, 5, 8, -1);
    entity.createAnimation('walk', 8, 8 + 7, 6, -1);
    // entity.createAnimation('attack1', 8 * 2, 8 * 2 + 7, 8, 0);
    entity.createAnimation('attack1', 8 * 3, 8 * 3 + 7, 8, 0);
    entity.createAnimation('special', 8 * 3, 8 * 3 + 7, 8, 0);

    entity.setAttacksConfig(1, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(140 * hitBoxScale, 450 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [6]);
    // entity.setAttackHitFrames('attack2', [6]);
    entity.setAttackHitFrames('special', [6]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1':
                applyAttackDamage(scene, entity, enemies, 150, 50, 350, 350, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 150, 50, 350, 350, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 3);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 220,
            minX: 40,
            y: 170,
        },
        special: {
            x: 220,
            minX: 40,
            y: 170
        }
    });

    // entity.setDebugMode(true);

    entity.flipSpritesheet = true;
    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}

export function generateOldGuardian(scene: GameScene, team: 'ally' | 'enemy', props: CharacterProps): Character {
    const entity = new Character(scene, props.x || 1000, props.y || 200, props.character.baseStats.speed,
        props.textureKey || 'oldGuardian',
        props.character.progression.level,
        props.character.baseStats,
        props.character.advancedStats,
        props.character.role,
        props.character.faction,
        props.frameWidth || 120, props.frameHeight || 120, props.displayWidth ?? 120 * (props.scale || 5), props.displayHeight ?? 120 * (props.scale || 5), props.uiOffsetY || -150);

    entity.setMaxHP(props.character.baseStats.maxHp);
    entity.setCooldownAttack(props.character.advancedStats.cooldownAttack);

    // 10 кадров в ряду
    entity.createAnimation('idle', 0, 5, 10, -1);
    entity.createAnimation('walk', 10, 10 + 7, 10, -1);
    entity.createAnimation('attack1', 10 * 2, 10 * 2 + 9, 10, 0);
    entity.createAnimation('attack2', 10 * 3, 10 * 3 + 7, 10, 0);
    entity.createAnimation('special', 10 * 3, 10 * 3 + 7, 10, 0);

    entity.setAttacksConfig(2, true);

    const hitBoxScale = (props.scale || 5) / 5;

    entity.setHitbox(125 * hitBoxScale, 310 * hitBoxScale, 0, 0);

    entity.setAttackHitFrames('attack1', [7]);
    entity.setAttackHitFrames('attack2', [6]);
    entity.setAttackHitFrames('special', [6]);

    const baseDamage = props.character.baseStats.attack;

    entity.onAttackFrame = (attackName: string, _: number): void => {
        const enemies = team === 'ally' ? scene.getEnemies() : scene.getAllies();
        switch (attackName) {
            case 'attack1': {
                const dmg = baseDamage;
                applyAttackDamage(scene, entity, enemies, 100, 0, 300, 300, dmg, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            }
            case 'attack2':
                applyAttackDamage(scene, entity, enemies, 100, 0, 300, 300, baseDamage, CharacterModel.DamageType.PHYSICAL, 1);
                break;
            case 'special':
                applyAttackDamage(scene, entity, enemies, 100, 0, 300, 300, baseDamage * 2, CharacterModel.DamageType.PHYSICAL, 3);
        }
    }

    entity.setAttacksDistances({
        attack1: {
            x: 100,
            minX: 10,
            y: 5
        },
        attack2: {
            x: 100,
            minX: 10,
            y: 5
        },
        special: {
            x: 100,
            minX: 10,
            y: 5
        }
    });

    // entity.setDebugMode(true);

    if (team === 'ally') {
        entity.updateHPBarColor(0x00ff00)
        entity.updateHPBarBgColor(0x000000)
        scene.addAlly(entity);
        entity.onEnergyChange = (energy: number) => {
            EventBus.emit('allyEnergyChange', {
                index: scene.getAllies().indexOf(entity),
                energy
            });
        }
    } else {
        entity.updateHPBarColor(0xff0000)
        entity.updateHPBarBgColor(0x000000)
        scene.addEnemy(entity);
        entity.setFlipX(true);
    }

    entity.playAnimation('idle', 'idle', true);

    return entity;
}


type AviableCharacter = 'firewarrior' | 'viking' | 'fireKing' | 'frostGuardian' | 'crystalKing' | 'warrior'
    | 'spearwoman' | 'demonSlime' | 'elementalWind'
    | 'groundMonk' | 'waterPriestess' | 'blueSlime' | 'greenSlime' | 'purpleSlime'
    | 'fantasyWarrior' | 'kitsune' | 'minotaur' | 'bringerOfDeath' | 'nightBorne' | 'knight' | 'steelKnight' | 'heroKnight' | 'martialHero'
    | 'oldGolem' | 'oldGuardian';

export default function generateCharacter(scene: GameScene, team: 'ally' | 'enemy', character: AviableCharacter, props: CharacterProps): Character {
    switch (character) {
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
        case 'kitsune':
            return generateKitsune(scene, team, props);
        case 'minotaur':
            return generateMinotaur(scene, team, props);
        case 'bringerOfDeath':
            return generateBringerOfDeath(scene, team, props);
        case 'nightBorne':
            return generateNightBorne(scene, team, props);
        case 'knight':
            return generateKnight(scene, team, props);
        case 'steelKnight':
            return generateSteelKnight(scene, team, props);
        case 'heroKnight':
            return generateHeroKnight(scene, team, props);
        case 'martialHero':
            return generateMartialHero(scene, team, props);
        case 'oldGolem':
            return generateOldGolem(scene, team, props);
        case 'oldGuardian':
            return generateOldGuardian(scene, team, props);
        default:
            const type: never = character;
            throw new Error('Unknown character: ' + type);
    }
}