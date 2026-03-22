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

export const SURVIVAL_1_CHAPTERS: IStage[] = [
    // --- ЭТАПЫ 1-5 (Символическая награда, уровни 1-10) ---
    {
        chapterNumber: 1,
        stageNumber: 1,
        background: "grass_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(BLUE_SLIME_CHARACTER, 1)],
        rewards: { balances: { gold: 300, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }, // Чисто на чай
    },
    {
        chapterNumber: 1,
        stageNumber: 2,
        background: "grass_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(GREEN_SLIME_CHARACTER, 3), cloneCharacter(BLUE_SLIME_CHARACTER, 3)],
        rewards: { balances: { gold: 400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 3,
        background: "grass_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 6)],
        rewards: { balances: { gold: 500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 4,
        background: "night_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(KNIGHT_CHARACTER, 10), cloneCharacter(BLUE_SLIME_CHARACTER, 10)],
        rewards: { balances: { gold: 600, gems: 5, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 5, // Первый чекпоинт
        background: "night_castle_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 14), cloneCharacter(PURPLE_SLIME_CHARACTER, 14)],
        rewards: { balances: { gold: 1000, gems: 20, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 6-10 (Начинается реальный фарм, уровни 12-18) ---
    {
        chapterNumber: 1,
        stageNumber: 6,
        background: "abyss_bg_2",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 16), cloneCharacter(NIGHT_BORNE_CHARACTER, 16)],
        rewards: { balances: { gold: 3500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 7,
        background: "abyss_bg_2",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 17), cloneCharacter(MINOTAUR_CHARACTER, 17)],
        rewards: { balances: { gold: 4000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 8,
        background: "abyss_bg_2",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 18), cloneCharacter(STEEL_KNIGHT_CHARACTER, 18)],
        rewards: { balances: { gold: 4500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 9,
        background: "volcano_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 20), cloneCharacter(PURPLE_SLIME_CHARACTER, 20)],
        rewards: { balances: { gold: 5000, gems: 10, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 10, // Второй чекпоинт
        background: "volcano_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 25), cloneCharacter(KNIGHT_CHARACTER, 25)],
        rewards: { balances: { gold: 6000, gems: 70, summons: 1, summonsSpecial: 0 }, equipment: [] },
    },

    // --- ЭТАПЫ 11-15 (Элитный фарм для тех, кто выжил, уровни 21-25) ---
    {
        chapterNumber: 1,
        stageNumber: 11,
        background: "ancient_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 28), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 28)],
        rewards: { balances: { gold: 10000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 12,
        background: "ancient_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(NIGHT_BORNE_CHARACTER, 30), cloneCharacter(HERO_KNIGHT_CHARACTER, 30)],
        rewards: { balances: { gold: 15000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 13,
        background: "ancient_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 32), cloneCharacter(STEEL_KNIGHT_CHARACTER, 32)],
        rewards: { balances: { gold: 20000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 14,
        background: "ancient_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 33), cloneCharacter(PURPLE_SLIME_CHARACTER, 33)],
        rewards: { balances: { gold: 25000, gems: 45, summons: 0, summonsSpecial: 0 }, equipment: [] },
    },
    {
        chapterNumber: 1,
        stageNumber: 15, // ФИНАЛЬНЫЙ БОСС
        background: "ancient_bg",
        type: StageTypeEnum.SURVIVAL,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 35), cloneCharacter(OLD_GOLEM_CHARACTER, 35)],
        rewards: { balances: { gold: 50000, gems: 250, summons: 3, summonsSpecial: 0 }, equipment: [] },
    },
];
