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
        advancedStats?: AdvancedStats;

        progression: CharacterProgression;

        skills: Skill[];
    }

} 