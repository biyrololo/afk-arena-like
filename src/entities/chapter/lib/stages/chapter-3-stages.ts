import { type IStage } from "../chapter.model";
import {
    STEEL_KNIGHT_CHARACTER,
    MARTIAL_HERO_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { cloneCharacter } from "@/shared/types/character";

export const CHAPTER_3_STAGES: IStage[] = [
    {
        chapterNumber: 3, stageNumber: 1, background: "ice_temple_bg",
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 46), cloneCharacter(STEEL_KNIGHT_CHARACTER, 36)],
        rewards: { balances: { gold: 16000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
];