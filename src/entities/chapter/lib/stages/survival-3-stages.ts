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
    TREE_MAN_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

const iceTint = { baseColor: 0xd6adff } as PlayerCharacterState;

const BACKGROUNDS = {
    crystal_cave: 'crystal_cave_bg',
    sky: 'sky_bg',
    forest_bg: 'forest_bg',
    crystal_bg: 'crystal_bg',
    mistic_library_bg: 'mistic_library_bg',
    ancient_floor_bg: 'ancient_floor_bg',
}

export const SURVIVAL_3_CHAPTERS: IStage[] = [
    // --- ЭТАПЫ 1-5 (Символическая награда, уровни 1-10) ---
    {
        chapterNumber: 1,
        stageNumber: 1,
        background: BACKGROUNDS.forest_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 50, iceTint)],
        rewards: { balances: { gold: 6000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }, // Чисто на чай
    },
    {
        chapterNumber: 1,
        stageNumber: 2,
        background: BACKGROUNDS.forest_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(GREEN_SLIME_CHARACTER, 50, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 50, iceTint)],
        rewards: { balances: { gold: 8000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 3,
        background: BACKGROUNDS.forest_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 46, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 46, iceTint)],
        rewards: { balances: { gold: 10000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 4,
        background: BACKGROUNDS.sky,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(KNIGHT_CHARACTER, 42, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 42, iceTint)],
        rewards: { balances: { gold: 12000, gems: 5, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 5, // Первый чекпоинт
        background: BACKGROUNDS.sky,
        type: StageTypeEnum.SURVIVAL,
        enemies: [
            cloneCharacter(TREE_MAN_CHARACTER, 47, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 47, iceTint),
            cloneCharacter(BLUE_SLIME_CHARACTER, 47, iceTint),
        ],
        rewards: { balances: { gold: 15000, gems: 20, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 6-10 (Начинается реальный фарм, уровни 12-18) ---
    {
        chapterNumber: 1,
        stageNumber: 6,
        background: BACKGROUNDS.crystal_cave,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 53, iceTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 50, iceTint)],
        rewards: { balances: { gold: 25000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 7,
        background: BACKGROUNDS.crystal_cave,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 54, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 54, iceTint)],
        rewards: { balances: { gold: 30000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 8,
        background: BACKGROUNDS.crystal_cave,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 60, iceTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 60, iceTint)],
        rewards: { balances: { gold: 40000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 9,
        background: BACKGROUNDS.mistic_library_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 62, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 62, iceTint)],
        rewards: { balances: { gold: 50000, gems: 10, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 10, // Второй чекпоинт
        background: BACKGROUNDS.mistic_library_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 70), cloneCharacter(KNIGHT_CHARACTER, 70, iceTint)],
        rewards: { balances: { gold: 65000, gems: 70, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 11-15 (Элитный фарм для тех, кто выжил, уровни 21-25) ---
    {
        chapterNumber: 1,
        stageNumber: 11,
        background: BACKGROUNDS.mistic_library_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 72), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 72)],
        rewards: { balances: { gold: 70000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 12,
        background: BACKGROUNDS.ancient_floor_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(NIGHT_BORNE_CHARACTER, 74), cloneCharacter(HERO_KNIGHT_CHARACTER, 74)],
        rewards: { balances: { gold: 80000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 13,
        background: BACKGROUNDS.ancient_floor_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 76), cloneCharacter(STEEL_KNIGHT_CHARACTER, 76)],
        rewards: { balances: { gold: 90000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 14,
        background: BACKGROUNDS.ancient_floor_bg,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 80), cloneCharacter(PURPLE_SLIME_CHARACTER, 80, iceTint)],
        rewards: { balances: { gold: 100000, gems: 45, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 15, // ФИНАЛЬНЫЙ БОСС
        background: BACKGROUNDS.crystal_cave,
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 100), cloneCharacter(TREE_MAN_CHARACTER, 100), cloneCharacter(TREE_MAN_CHARACTER, 100)],
        rewards: { balances: { gold: 200000, gems: 250, summons: 3, summonsSpecial: 0 }, equipment: [] },
    },
];
