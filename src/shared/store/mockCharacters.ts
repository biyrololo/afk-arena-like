import { Character, cloneCharacter } from "../types/character";
import { KITSUNE_CHARACTER, CRYSTAL_KING, DEMON_SLIME, ELEMENTAL_WIND_CHARACTER, FIRE_KING_CHARACTER, FIREWARRIOR_CHARACTER, FROST_GUARDIAN, GROUND_MONK_CHARACTER, SPEARWOMAN_CHARACTER, VIKING_CHARACTER, WARRIOR_CHARACTER, WATER_PRIESTESS_CHARACTER, FANTASY_WARRIOR_CHARACTER, STEEL_KNIGHT_CHARACTER, METAL_BLADEKEEPER_CHARACTER, WOMAN_WARRIOR_CHARACTER } from "@/entities/character/lib/allCharacters";


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
    // cloneCharacter(BLUE_SLIME_CHARACTER),
    // cloneCharacter(GREEN_SLIME_CHARACTER),
    // cloneCharacter(PURPLE_SLIME_CHARACTER),
    cloneCharacter(FANTASY_WARRIOR_CHARACTER),
    cloneCharacter(KITSUNE_CHARACTER),
    // cloneCharacter(MINOTAUR_CHARACTER),
    // cloneCharacter(BRINGER_OF_DEATH_CHARACTER),
    // cloneCharacter(NIGHT_BORNE_CHARACTER),
    // cloneCharacter(KNIGHT_CHARACTER),
    cloneCharacter(STEEL_KNIGHT_CHARACTER),
    // cloneCharacter(HERO_KNIGHT_CHARACTER),
    // cloneCharacter(MARTIAL_HERO_CHARACTER),
    // cloneCharacter(OLD_GOLEM_CHARACTER),
    // cloneCharacter(OLD_GUARDIAN_CHARACTER),
    cloneCharacter(METAL_BLADEKEEPER_CHARACTER),
    cloneCharacter(WOMAN_WARRIOR_CHARACTER),
];