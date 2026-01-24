import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";
import { v4 } from "uuid";

export const FROST_GUARDIAN: Character.Character = {
    id: '0',
    key: 'frostGuardian',
    name: 'Морозный страж',
    rarity: Character.Rarity.RARE,
    role: Character.Role.TANK,
    faction: Character.Faction.ICE,
    damageType: Character.DamageType.MAGIC,
    power: 70,
    
    baseStats: {
        maxHp: 400,
        attack: 35,
        speed: 100,
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
            maxHp: 100,
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
        maxHp: 100,
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
    skills: [], // здесь можно добавить доступные навыки
}

export const ALL_CHARACTERS: Character.Character[] = [
    FIRE_KING_CHARACTER,
    CRYSTAL_KING,
    FROST_GUARDIAN
]

export const cloneCharacter = (character: Character.Character) => {
    const copy = structuredClone(character);
    copy.id = v4();
    return copy;
}

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