import { type IStage } from "../chapter.model";
import {
    BLUE_SLIME_CHARACTER,
    PURPLE_SLIME_CHARACTER,
    FROST_GUARDIAN,
    GREEN_SLIME_CHARACTER,
    WATER_PRIESTESS_CHARACTER,
    VIKING_CHARACTER,
    MINOTAUR_CHARACTER,
    BRINGER_OF_DEATH_CHARACTER,
    NIGHT_BORNE_CHARACTER,
    KNIGHT_CHARACTER,
    STEEL_KNIGHT_CHARACTER,
    HERO_KNIGHT_CHARACTER,
    OLD_GUARDIAN_CHARACTER,
    OLD_GOLEM_CHARACTER,
    MARTIAL_HERO_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

export const CHAPTER_3_STAGES: IStage[] = [
    {
        chapterNumber: 3, stageNumber: 1, background: "ice_temple_bg",
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 46), cloneCharacter(STEEL_KNIGHT_CHARACTER, 36)],
        rewards: { balances: { gold: 16000, gems: 0, summons: 0 }, equipment: [] }
    },
];