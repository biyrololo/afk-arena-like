import { type IStage, StageTypeEnum } from "../chapter.model";

import {
    BLUE_SLIME_CHARACTER,
    PURPLE_SLIME_CHARACTER,

    GREEN_SLIME_CHARACTER,
    KNIGHT_CHARACTER,
    STEEL_KNIGHT_CHARACTER,
    HERO_KNIGHT_CHARACTER,
    MARTIAL_HERO_CHARACTER,
    MINOTAUR_CHARACTER,
    BRINGER_OF_DEATH_CHARACTER,
    NIGHT_BORNE_CHARACTER,
    OLD_GOLEM_CHARACTER,
    OLD_GUARDIAN_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

const iceTint = { baseColor: 0xadd8e6 } as PlayerCharacterState;
const deepFrostTint = { baseColor: 0x00f0ff } as PlayerCharacterState;

export const SURVIVAL_2_CHAPTERS: IStage[] = [
    // --- ЭТАПЫ 1-5 (Символическая награда, уровни 1-10) ---
    {
        chapterNumber: 1,
        stageNumber: 1,
        background: "ice_lake_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 20, iceTint)],
        rewards: { balances: { gold: 600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }, // Чисто на чай
    },
    {
        chapterNumber: 1,
        stageNumber: 2,
        background: "ice_lake_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(GREEN_SLIME_CHARACTER, 24, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 24, iceTint)],
        rewards: { balances: { gold: 800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 3,
        background: "ice_lake_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 26, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 26, iceTint)],
        rewards: { balances: { gold: 1000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 4,
        background: "ice_abyss_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(KNIGHT_CHARACTER, 32, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 32, iceTint)],
        rewards: { balances: { gold: 1200, gems: 5, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 5, // Первый чекпоинт
        background: "ice_abyss_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [
            cloneCharacter(HERO_KNIGHT_CHARACTER, 27, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 27, iceTint),
            cloneCharacter(BLUE_SLIME_CHARACTER, 27, iceTint),
        ],
        rewards: { balances: { gold: 2500, gems: 20, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 6-10 (Начинается реальный фарм, уровни 12-18) ---
    {
        chapterNumber: 1,
        stageNumber: 6,
        background: "ice_abyss_2_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 28, iceTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 28, iceTint)],
        rewards: { balances: { gold: 5000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 7,
        background: "ice_abyss_2_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 34, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 34, iceTint)],
        rewards: { balances: { gold: 6000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 8,
        background: "ice_abyss_2_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 24, iceTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 24, iceTint)],
        rewards: { balances: { gold: 8000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 9,
        background: "snow_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 35, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 35, iceTint)],
        rewards: { balances: { gold: 10000, gems: 10, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 10, // Второй чекпоинт
        background: "snow_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 38, deepFrostTint), cloneCharacter(KNIGHT_CHARACTER, 38, iceTint)],
        rewards: { balances: { gold: 14000, gems: 70, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 11-15 (Элитный фарм для тех, кто выжил, уровни 21-25) ---
    {
        chapterNumber: 1,
        stageNumber: 11,
        background: "ice_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 36, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 36, deepFrostTint)],
        rewards: { balances: { gold: 20000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 12,
        background: "ice_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(NIGHT_BORNE_CHARACTER, 40, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 40, deepFrostTint)],
        rewards: { balances: { gold: 25000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 13,
        background: "ice_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 41, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 41, deepFrostTint)],
        rewards: { balances: { gold: 30000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 14,
        background: "ice_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 42, deepFrostTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 42, iceTint)],
        rewards: { balances: { gold: 35000, gems: 45, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 15, // ФИНАЛЬНЫЙ БОСС
        background: "ice_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 44, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 44, deepFrostTint)],
        rewards: { balances: { gold: 100000, gems: 250, summons: 3, summonsSpecial: 0 }, equipment: [] },
    },
];
