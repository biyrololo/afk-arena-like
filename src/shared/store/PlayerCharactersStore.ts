import { v4 } from "uuid";
import { Character, cloneCharacter } from "../types/character";
import { calculateCharacterPower } from "../types/develop";
import type { PlayerCharacter } from "../types/PlayerCharacter";
import { create } from "zustand";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { CRYSTAL_KING, FIRE_KING_CHARACTER, FIREWARRIOR_CHARACTER, FROST_GUARDIAN, SPEARWOMAN_CHARACTER, VIKING_CHARACTER, WARRIOR_CHARACTER } from "@/entities/character/lib/allCharacters";
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";

interface PlayerCharactersStore {
    characters: PlayerCharacter[];
    equipment: Character.Equipment[];
    setCharacters: (characters: PlayerCharacter[]) => void;
    setEquipment: (equipment: Character.Equipment[]) => void;
}

export const mockCharacters: Character.Character[] = [
    cloneCharacter(FIRE_KING_CHARACTER),
    cloneCharacter(CRYSTAL_KING),
    cloneCharacter(FROST_GUARDIAN),
    cloneCharacter(WARRIOR_CHARACTER),
    cloneCharacter(SPEARWOMAN_CHARACTER),
    cloneCharacter(VIKING_CHARACTER),
    cloneCharacter(FIREWARRIOR_CHARACTER)
];

const usePlayerCharactersStore = create<PlayerCharactersStore>((set) => ({
  characters: mockCharacters.map(c => {
    const copy = structuredClone(c);
    copy.power = calculateCharacterPower(copy);
    return copy;
  }),
  equipment: [
    ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat()
  ],
  setCharacters: (characters: PlayerCharacter[]) => set({ characters }),      
  setEquipment: (equipment: Character.Equipment[]) => set({ equipment }),
}))

export default usePlayerCharactersStore