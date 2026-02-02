import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";
import { v4 } from "uuid";

export const FIREWARRIOR_CHARACTER: Character.Character = {
    id: '0',
    key: 'firewarrior',
    name: 'Огненный воин',
    rarity: Character.Rarity.RARE,
    role: Character.Role.DPS,
    faction: Character.Faction.FIRE,
    damageType: Character.DamageType.PHYSICAL,
    power: 100,
    baseStats: {
        maxHp: 600,
        attack: 100,
        speed: 120,
        defense: 40
    },
    progression: {
        level: 1,
        maxLevel: 999,
        stars: 0,
        ascension: 0
    },
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    skills: [],
}

export const VIKING_CHARACTER: Character.Character = {
    id: '0',
    key: 'viking',
    name: 'Викинг',
    rarity: Character.Rarity.EPIC,
    role: Character.Role.DPS,
    faction: Character.Faction.NATURE,
    damageType: Character.DamageType.PHYSICAL,
    power: 100,
    baseStats: {
        maxHp: 500,
        attack: 80,
        speed: 100,
        defense: 120
    },
    progression: {
        level: 1,
        maxLevel: 999,
        stars: 0,
        ascension: 0
    },
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    skills: [],
}

export const SPEARWOMAN_CHARACTER: Character.Character = {
    id: '0',
    key: 'spearwoman',
    name: 'Копейщик',
    rarity: Character.Rarity.LEGENDARY,
    role: Character.Role.DPS,
    faction: Character.Faction.NATURE,
    damageType: Character.DamageType.PHYSICAL,
    power: 100,
    baseStats: {
        maxHp: 300,
        attack: 150,
        speed: 250,
        defense: 20
    },
    progression: {
        level: 1,
        maxLevel: 999,
        stars: 0,
        ascension: 0
    },
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    skills: [],
}

export const WARRIOR_CHARACTER: Character.Character = {
    id: '0',
    key: 'warrior',
    name: 'Воин',
    rarity: Character.Rarity.UNCOMMON,
    role: Character.Role.TANK,
    faction: Character.Faction.NATURE,
    damageType: Character.DamageType.PHYSICAL,
    power: 100,
    baseStats: {
        maxHp: 300,
        attack: 100,
        speed: 200,
        defense: 60
    },
    progression: {
        level: 1,
        maxLevel: 999,
        stars: 0,
        ascension: 0
    },
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    skills: [],
}

export const FROST_GUARDIAN: Character.Character = {
    id: '0',
    key: 'frostGuardian',
    name: 'Морозный страж',
    rarity: Character.Rarity.RARE,
    role: Character.Role.TANK,
    faction: Character.Faction.ICE,
    damageType: Character.DamageType.MAGIC,
    power: 70,
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    
    baseStats: {
        maxHp: 800,
        attack: 35,
        speed: 60,
        defense: 70
    },
    progression: {
        level: 1,
        maxLevel: 10,
        stars: 1,
        ascension: 0
    },
    skills: [],
}

export const FIRE_KING_CHARACTER: Character.Character = {
    id: '1',
    key: 'fireKing',
    name: 'Огненный рыцарь',
    baseStats: {
            maxHp: 300,
            attack: 50,
            speed: 250,
            defense: 50
        },
    rarity: Character.Rarity.COMMON,
    role: Character.Role.DPS,
    faction: Character.Faction.FIRE,
    damageType: Character.DamageType.PHYSICAL,
    power: 100,

    progression: {
        level: 1,
        maxLevel: 999,
        stars: 0,
        ascension: 0
    },
    advancedStats: {
        critChance: 0.5,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    skills: [],
}

export const CRYSTAL_KING: Character.Character = {
    id: '2',
    key: 'crystalKing',
    name: 'Кристальный воин',
    rarity: Character.Rarity.EPIC,
    role: Character.Role.TANK, // или другой подходящий вариант
    faction: Character.Faction.NATURE, // установленное произвольное значение
    damageType: Character.DamageType.MAGIC, // установленное произвольное значение
    power: 30,

    baseStats: {
        maxHp: 300,
        attack: 50, // недостающий атрибут в исходном объекте
        speed: 150,
        defense: 50 // недостающий атрибут в исходном объекте
    },
    progression: {
        level: 1,
        maxLevel: 10,
        stars: 1,
        ascension: 0 // или любое другое значение
    },
    advancedStats: {
        critChance: 0.1,
        critDamage: 0.5,
        dodge: 0.5,
        lifesteal: 0.5,
        accuracy: 0.5,
        energyRegen: 10
    },
    
    skills: [], // здесь можно добавить доступные навыки
}

export const ALL_CHARACTERS: Character.Character[] = [
    FIRE_KING_CHARACTER,
    CRYSTAL_KING,
    FROST_GUARDIAN
]

export const getCharacterEquipment = (id: Character.Character['id']) => {
    const allEquipment = usePlayerCharactersStore.getState().equipment;
    const equipment: Character.CharacterEquipment = {}
    allEquipment.forEach(e => {
        if(e.equippedCharacterId === id) {
            equipment[e.slot] = e;
        }
    });
    return equipment;
}