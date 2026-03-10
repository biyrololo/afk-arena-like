import { Character, cloneCharacter } from "../types/character";
import { calculateCharacterPower } from "../types/develop";
import type { PlayerCharacter } from "../types/PlayerCharacter";
import { create } from "zustand";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { KITSUNE_CHARACTER, BLUE_SLIME_CHARACTER, GREEN_SLIME_CHARACTER, PURPLE_SLIME_CHARACTER, CRYSTAL_KING, DEMON_SLIME, ELEMENTAL_WIND_CHARACTER, FIRE_KING_CHARACTER, FIREWARRIOR_CHARACTER, FROST_GUARDIAN, GROUND_MONK_CHARACTER, SPEARWOMAN_CHARACTER, VIKING_CHARACTER, WARRIOR_CHARACTER, WATER_PRIESTESS_CHARACTER, FANTASY_WARRIOR_CHARACTER, MINOTAUR_CHARACTER, BRINGER_OF_DEATH_CHARACTER, NIGHT_BORNE_CHARACTER, KNIGHT_CHARACTER, STEEL_KNIGHT_CHARACTER, HERO_KNIGHT_CHARACTER, MARTIAL_HERO_CHARACTER, OLD_GOLEM_CHARACTER, OLD_GUARDIAN_CHARACTER } from "@/entities/character/lib/allCharacters";
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";

interface PlayerCharactersStore {
  characters: PlayerCharacter[];
  equipment: Character.Equipment[];
  setCharacters: (characters: PlayerCharacter[]) => void;
  setEquipment: (equipment: Character.Equipment[]) => void;
  addEquipment: (equipment: Character.Equipment) => void;
  addCharacter: (character: PlayerCharacter) => void;
}

export const mockCharacters: Character.Character[] = [
  cloneCharacter(FIRE_KING_CHARACTER),
  cloneCharacter(CRYSTAL_KING),
  cloneCharacter(FROST_GUARDIAN),
  cloneCharacter(WARRIOR_CHARACTER),
  cloneCharacter(SPEARWOMAN_CHARACTER),
  cloneCharacter(VIKING_CHARACTER),
  cloneCharacter(FIREWARRIOR_CHARACTER),
  cloneCharacter(DEMON_SLIME),
  cloneCharacter(ELEMENTAL_WIND_CHARACTER),
  cloneCharacter(GROUND_MONK_CHARACTER),
  cloneCharacter(WATER_PRIESTESS_CHARACTER),
  cloneCharacter(BLUE_SLIME_CHARACTER),
  cloneCharacter(GREEN_SLIME_CHARACTER),
  cloneCharacter(PURPLE_SLIME_CHARACTER),
  cloneCharacter(FANTASY_WARRIOR_CHARACTER),
  cloneCharacter(KITSUNE_CHARACTER),
  // cloneCharacter(MINOTAUR_CHARACTER),
  // cloneCharacter(BRINGER_OF_DEATH_CHARACTER),
  // cloneCharacter(NIGHT_BORNE_CHARACTER),
  // cloneCharacter(KNIGHT_CHARACTER),
  // cloneCharacter(STEEL_KNIGHT_CHARACTER),
  // cloneCharacter(HERO_KNIGHT_CHARACTER),
  // cloneCharacter(MARTIAL_HERO_CHARACTER),
  // cloneCharacter(OLD_GOLEM_CHARACTER),
  // cloneCharacter(OLD_GUARDIAN_CHARACTER),
];

const usePlayerCharactersStore = create<PlayerCharactersStore>((set) => ({
  // characters: mockCharacters.map(c => {
  //   const copy = structuredClone(c);
  //   copy.power = calculateCharacterPower(copy);
  //   return copy;
  // }),
  characters: [
    cloneCharacter(FIRE_KING_CHARACTER),
    // ...mockCharacters.map(c => {
    //   const copy = structuredClone(c);
    //   copy.power = calculateCharacterPower(copy);
    //   return copy;
    // })
  ],
  equipment: [
    // ...Object.values(Weapons.WEAPONS).map(weapon => createEquipment(weapon)),
    // ...Object.values(Accessories.ACCESSORIES).map(accessory => createEquipment(accessory)),
    // ...Object.values(AllEquipment.EQUIPMENT).map(eq => Object.values(eq).map(a => createEquipment(a)).flat()).flat()
  ],
  setCharacters: (characters: PlayerCharacter[]) => set({ characters }),
  setEquipment: (equipment: Character.Equipment[]) => set({ equipment }),
  addEquipment: (equipment: Character.Equipment) => set((state) => ({ equipment: [...state.equipment, equipment] })),
  addCharacter: (character: PlayerCharacter) => set((state) => ({ characters: [...state.characters, character] })),
}))

export default usePlayerCharactersStore