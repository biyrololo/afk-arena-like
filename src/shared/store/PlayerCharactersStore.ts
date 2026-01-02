import { Rarity } from "../types/character";
import type { PlayerCharacter } from "../types/PlayerCharacter";
import { create } from "zustand";

interface PlayerCharactersStore {
    characters: PlayerCharacter[];
    setCharacters: (characters: PlayerCharacter[]) => void;
}

const mockCharacters: PlayerCharacter[] = [
    {
        id: 10,
        key: 'fireKing',
        name: 'Огненный рыцарь',
        maxHp: 100,
        damage: 50,
        rarity: Rarity.COMMON,
        speed: 250
    },
    {
        id: 15,
        key: 'crystalKing',
        name: 'Кристальный воин',
        maxHp: 100,
        damage: 50,
        rarity: Rarity.EPIC,
        speed: 150
    }
]

const usePlayerCharactersStore = create<PlayerCharactersStore>((set) => ({
  characters: mockCharacters,
  setCharacters: (characters: PlayerCharacter[]) => set({ characters }),      
}))

export default usePlayerCharactersStore