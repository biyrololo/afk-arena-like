import { v4 } from "uuid";
import { Character } from "../types/character";
import { calculateCharacterPower } from "../types/develop";
import type { PlayerCharacter } from "../types/PlayerCharacter";
import { create } from "zustand";
import { createEquipment } from "@/entities/character/lib/allEquipment";

interface PlayerCharactersStore {
    characters: PlayerCharacter[];
    equipment: Character.Equipment[];
    setCharacters: (characters: PlayerCharacter[]) => void;
    setEquipment: (equipment: Character.Equipment[]) => void;
}

export const mockCharacters: Character.Character[] = [
    {
        id: '10',
        key: 'fireKing',
        name: 'Огненный рыцарь',
        rarity: Character.Rarity.COMMON,
        role: Character.Role.DPS, // или другой подходящий вариант
        faction: Character.Faction.FIRE, // установленное произвольное значение
        damageType: Character.DamageType.PHYSICAL, // установленное произвольное значение
        power: 50,

        baseStats: {
            maxHp: 100,
            attack: 50,
            speed: 250,
            defense: 50
        },
        progression: {
            level: 1,
            maxLevel: 10,
            stars: 1,
            ascension: 0 // или любое другое значение
        },
        skills: [], // здесь можно добавить доступные навыки
    },
    {
        id: '20',
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
];

const usePlayerCharactersStore = create<PlayerCharactersStore>((set) => ({
  characters: mockCharacters.map(c => {
    const copy = structuredClone(c);
    copy.power = calculateCharacterPower(copy);
    return copy;
  }),
  equipment: [
    createEquipment({
        key: 'gold',
        slot: Character.EquipmentSlot.CHEST,
        stats: {
            maxHp: 50,
            attack: 50,
            speed: 50,
            defense: 50
        },
        name: 'Gold Chest',
        description: 'A chest full of gold',
        rarity: Character.Rarity.RARE,
        level: 5
    }),
    createEquipment({
        key: 'orange',
        slot: Character.EquipmentSlot.CHEST,
        stats: {
            maxHp: 30,
            attack: 30,
            speed: 30,
            defense: 30
        },
        name: 'Orange Chest',
        description: 'Chest made of orange',
        rarity: Character.Rarity.UNCOMMON,
        level: 1
    })
  ],
  setCharacters: (characters: PlayerCharacter[]) => set({ characters }),      
  setEquipment: (equipment: Character.Equipment[]) => set({ equipment }),
}))

export default usePlayerCharactersStore