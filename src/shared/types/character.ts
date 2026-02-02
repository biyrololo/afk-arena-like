import { v4 } from "uuid";

export namespace Character {
    export enum Rarity {
        COMMON = 'common',
        UNCOMMON = 'uncommon',
        RARE = 'rare',
        EPIC = 'epic',
        LEGENDARY = 'legendary'
    }

    export enum Role {
        TANK = 'tank',
        DPS = 'dps',
        SUPPORT = 'support',
        // HEALER = 'healer'
    }

    export enum Faction {
        LIGHT = 'light',
        DARK = 'dark',
        NATURE = 'nature',
        FIRE = 'fire',
        ICE = 'ice',
        UNDEAD = 'undead'
    }

    export enum DamageType {
        PHYSICAL = 'physical',
        MAGIC = 'magic',
        FIRE = 'fire',
        // PURE = 'pure'
    }
    export interface BaseStats {
        maxHp: number;
        attack: number;       // %
        defense: number;
        speed: number;
    }

    export interface AdvancedStats {
        critChance: number;   // %
        critDamage: number;   // %
        dodge: number;        // %
        lifesteal: number;    // %
        accuracy: number;     // %
        energyRegen: number;
    }

    export interface CharacterProgression {
        level: number;
        maxLevel: number;
        stars: number;
        ascension: number; // пробуждение / ранги
    }

    export enum SkillType {
        ACTIVE = 'active',
        PASSIVE = 'passive',
        ULTIMATE = 'ultimate'
    }

    export interface Skill {
        id: string;
        name: string;
        description: string;
        type: SkillType;
        cooldown?: number;
        energyCost?: number;
        level: number;
        maxLevel: number;
    }

    export enum EquipmentSlot {
        WEAPON = 'weapon',
        CHEST = 'chest',
        HELMET = 'helmet',
        BOOTS = 'boots',
        ACCESSORY = 'accessory'
    }

    export interface Equipment {
        id: string;
        name: string;
        description: string;
        key: string;
        slot: EquipmentSlot;
        rarity: Rarity;
        level: number;
        stats: Partial<BaseStats & AdvancedStats>;
        equippedCharacterId?: Character['id'];
    }

    export type CharacterEquipment = Partial<Record<EquipmentSlot, Equipment>>;
    
    export interface Character {
        id: string;
        key: string;
        name: string;

        rarity: Rarity;
        role: Role;
        faction: Faction;
        damageType: DamageType;
        
        power: number;

        baseStats: BaseStats;
        advancedStats: AdvancedStats;

        progression: CharacterProgression;

        skills: Skill[];
    }

}

const levelUp = (character: Character.Character) => {
    character.progression.level++;

    character.baseStats.attack = Math.floor(character.baseStats.attack * 1.05);
    character.baseStats.defense = Math.floor(character.baseStats.defense * 1.05);
    character.baseStats.maxHp = Math.floor(character.baseStats.maxHp * 1.05);

    if(character.progression.level % 5 === 0) {
        if(character.advancedStats?.dodge) {
            character.advancedStats.dodge+=0.05;
        }
        if(character.advancedStats?.critChance) {
            character.advancedStats.critChance+=0.02;
        }
        if(character.advancedStats?.critDamage) {
            character.advancedStats.critDamage+=0.05;
        }
    }
}

export const cloneCharacter = (character: Character.Character, withLevel?: number, withStats?: unknown) => {
    const copy = structuredClone(character);
    if(withLevel) {
        for(let i = 0; i < withLevel; i++) {
            levelUp(copy);
        }
    }
    copy.id = v4();
    return copy;
}