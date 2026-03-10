import { type IChapter, type IStage, StageTypeEnum } from "./chapter.model";

import {
  BLUE_SLIME_CHARACTER,
  PURPLE_SLIME_CHARACTER,

  CRYSTAL_KING,
  DEMON_SLIME,
  ELEMENTAL_WIND_CHARACTER,
  FIRE_KING_CHARACTER,
  FIREWARRIOR_CHARACTER,
  FROST_GUARDIAN,
  GREEN_SLIME_CHARACTER,
  GROUND_MONK_CHARACTER,
  SPEARWOMAN_CHARACTER,
  WARRIOR_CHARACTER,
  WATER_PRIESTESS_CHARACTER,
  FANTASY_WARRIOR_CHARACTER,
  KITSUNE_CHARACTER,
  VIKING_CHARACTER,
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
import { createEquipment } from "@/entities/character/lib/allEquipment";
import {
  Accessories,
  AllEquipment,
  Weapons,
} from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";
import { CHAPTER_1_STAGES } from "./stages/chapter-1-stages";
import { testChapter } from "./chapter.test";
import { CHAPTER_2_STAGES } from "./stages/chapter-2-stages";

export const CHAPTERS: IChapter[] = [
  {
    name: "Глава 1 - Пепельная граница",
    chapterNumber: 1,
    stages: CHAPTER_1_STAGES,
  },
  {
    name: "Глава 2 - Пепельная граница",
    chapterNumber: 2,
    stages: CHAPTER_2_STAGES,
  },
]

// CHAPTERS.forEach(testChapter)
export const SURVIVAL_CHAPTERS: IStage[] = [
  // --- ЭТАПЫ 1-5 (Символическая награда, уровни 1-10) ---
  {
    chapterNumber: 1,
    stageNumber: 1,
    background: "grass_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(BLUE_SLIME_CHARACTER, 1)],
    rewards: { balances: { gold: 300, gems: 0, summons: 0 }, equipment: [] }, // Чисто на чай
  },
  {
    chapterNumber: 1,
    stageNumber: 2,
    background: "grass_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(GREEN_SLIME_CHARACTER, 3), cloneCharacter(BLUE_SLIME_CHARACTER, 3)],
    rewards: { balances: { gold: 400, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 3,
    background: "grass_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 5)],
    rewards: { balances: { gold: 500, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 4,
    background: "night_castle_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(KNIGHT_CHARACTER, 8), cloneCharacter(BLUE_SLIME_CHARACTER, 8)],
    rewards: { balances: { gold: 600, gems: 5, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 5, // Первый чекпоинт
    background: "night_castle_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 10), cloneCharacter(PURPLE_SLIME_CHARACTER, 10)],
    rewards: { balances: { gold: 2300, gems: 20, summons: 1 }, equipment: [] },
  },

  // --- ЭТАПЫ 6-10 (Начинается реальный фарм, уровни 12-18) ---
  {
    chapterNumber: 1,
    stageNumber: 6,
    background: "abyss_bg_2",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 12), cloneCharacter(NIGHT_BORNE_CHARACTER, 12)],
    rewards: { balances: { gold: 4000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 7,
    background: "abyss_bg_2",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 14), cloneCharacter(MINOTAUR_CHARACTER, 14)],
    rewards: { balances: { gold: 8000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 8,
    background: "abyss_bg_2",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 16), cloneCharacter(STEEL_KNIGHT_CHARACTER, 16)],
    rewards: { balances: { gold: 15000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 9,
    background: "volcano_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 18), cloneCharacter(PURPLE_SLIME_CHARACTER, 18)],
    rewards: { balances: { gold: 25000, gems: 10, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 10, // Второй чекпоинт
    background: "volcano_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 20), cloneCharacter(KNIGHT_CHARACTER, 20)],
    rewards: { balances: { gold: 60000, gems: 70, summons: 1 }, equipment: [] },
  },

  // --- ЭТАПЫ 11-15 (Элитный фарм для тех, кто выжил, уровни 21-25) ---
  {
    chapterNumber: 1,
    stageNumber: 11,
    background: "ancient_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 21), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 21)],
    rewards: { balances: { gold: 45000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 12,
    background: "ancient_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(NIGHT_BORNE_CHARACTER, 22), cloneCharacter(HERO_KNIGHT_CHARACTER, 22)],
    rewards: { balances: { gold: 55000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 13,
    background: "ancient_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 23), cloneCharacter(STEEL_KNIGHT_CHARACTER, 23)],
    rewards: { balances: { gold: 70000, gems: 0, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 14,
    background: "ancient_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 24), cloneCharacter(PURPLE_SLIME_CHARACTER, 24)],
    rewards: { balances: { gold: 90000, gems: 45, summons: 0 }, equipment: [] },
  },
  {
    chapterNumber: 1,
    stageNumber: 15, // ФИНАЛЬНЫЙ БОСС
    background: "ancient_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 25), cloneCharacter(OLD_GOLEM_CHARACTER, 25)],
    rewards: { balances: { gold: 200000, gems: 250, summons: 3 }, equipment: [] },
  },
];

testChapter(CHAPTERS[1])

// testChapter({
//   name: "Тестовая глава",
//   chapterNumber: 1,
//   stages: SURVIVAL_CHAPTERS,
// });

export const findStage = (chapterNumber: number, stageNumber: number) => {
  return CHAPTERS.find(
    (chapter) => chapter.chapterNumber === chapterNumber,
  )?.stages.find((stage) => stage.stageNumber === stageNumber);
};

export const findChapter = (chapterNumber: number) => {
  return CHAPTERS.find((chapter) => chapter.chapterNumber === chapterNumber);
};

export const nextStage = (chapterNumber: number, stageNumber: number) => {
  if (findStage(chapterNumber, stageNumber + 1)) {
    return [chapterNumber, stageNumber + 1];
  }
  if (findChapter(chapterNumber + 1)) {
    return [chapterNumber + 1, 1];
  }
  return [1, 1];
};
