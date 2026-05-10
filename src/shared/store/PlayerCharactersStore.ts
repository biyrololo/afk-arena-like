import { Character, cloneCharacter } from "../types/character";
import type { PlayerCharacter } from "../types/PlayerCharacter";
import { create } from "zustand";
import { DEMON_SLIME, FIRE_KING_CHARACTER, SPEARWOMAN_CHARACTER } from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";
import { calculateCharacterPower } from "../types/develop";
import * as CHARACTERS from "@/entities/character/lib/allCharacters";
import { mockCharacters } from "./mockCharacters";

interface PlayerCharactersStore {
  characters: PlayerCharacter[];
  equipment: Character.Equipment[];
  setCharacters: (characters: PlayerCharacter[]) => void;
  setEquipment: (equipment: Character.Equipment[]) => void;
  addEquipment: (equipment: Character.Equipment) => void;
  addCharacter: (character: PlayerCharacter) => void;
}

const usePlayerCharactersStore = create<PlayerCharactersStore>((set) => ({
  characters: [
    cloneCharacter(FIRE_KING_CHARACTER),
    // ...mockCharacters.filter(c => 'power' in c).map(c => {
    //   const copy = structuredClone(c);
    //   copy.power = calculateCharacterPower(copy);
    //   return copy;
    // })
  ],
  equipment: [
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat(),
  ],
  setCharacters: (characters: PlayerCharacter[]) => set({ characters }),
  setEquipment: (equipment: Character.Equipment[]) => set({ equipment }),
  addEquipment: (equipment: Character.Equipment) => set((state) => ({ equipment: [...state.equipment, equipment] })),
  addCharacter: (character: PlayerCharacter) => set((state) => ({ characters: [...state.characters, character] })),
}))

export default usePlayerCharactersStore