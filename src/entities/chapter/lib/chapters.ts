import { type IChapter, type IStage, StageTypeEnum } from "./chapter.model";

import {
  CRYSTAL_KING,
  FIRE_KING_CHARACTER,
  FIREWARRIOR_CHARACTER,
  FROST_GUARDIAN,
  SPEARWOMAN_CHARACTER,
  WARRIOR_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import {
  Accessories,
  AllEquipment,
  Weapons,
} from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";

export const SURVIVAL_CHAPTERS: IStage[] = [
  {
    chapterNumber: 1,
    stageNumber: 1,
    background: "magic_field_bg",
    enemies: [cloneCharacter(FROST_GUARDIAN, 1)],
    type: StageTypeEnum.SURVIVAL,
    rewards: {
      balances: { gold: 1000, gems: 10, summons: 1 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 2,
    background: "magic_field_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [
      cloneCharacter(FIREWARRIOR_CHARACTER, 1),
      cloneCharacter(CRYSTAL_KING, 2),
    ],
    rewards: {
      balances: { gold: 2000, gems: 10, summons: 1 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 3,
    background: "magic_field_bg",
    type: StageTypeEnum.SURVIVAL,
    enemies: [
      cloneCharacter(FIREWARRIOR_CHARACTER, 2),
      cloneCharacter(WARRIOR_CHARACTER, 2),
    ],
    rewards: {
      balances: { gold: 3000, gems: 15, summons: 1 },
      equipment: [],
    },
  },
];

export const CHAPTERS: IChapter[] = [
  {
    name: "Глава 1",
    chapterNumber: 1,
    stages: [
      {
        chapterNumber: 1,
        stageNumber: 1,
        background: "magic_field_bg",
        enemies: [cloneCharacter(FIREWARRIOR_CHARACTER, 1)],
        rewards: {
          balances: { gold: 100, gems: 10, summons: 1 },
          equipment: [
            createEquipment(AllEquipment.EQUIPMENT.bworn.helmet),
            createEquipment(AllEquipment.EQUIPMENT.bworn.chest),
            createEquipment(AllEquipment.EQUIPMENT.bworn.boots),
          ],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 2,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIREWARRIOR_CHARACTER, 1),
          cloneCharacter(CRYSTAL_KING, 2),
        ],
        rewards: {
          balances: { gold: 200, gems: 10, summons: 1 },
          equipment: [createEquipment(Accessories.ACCESSORIES.lapis_ring)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 3,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIREWARRIOR_CHARACTER, 2),
          cloneCharacter(WARRIOR_CHARACTER, 2),
        ],
        rewards: {
          balances: { gold: 300, gems: 15, summons: 1 },
          equipment: [createEquipment(AllEquipment.EQUIPMENT.gold.chest)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 4,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIREWARRIOR_CHARACTER, 2),
          cloneCharacter(SPEARWOMAN_CHARACTER, 3),
          cloneCharacter(WARRIOR_CHARACTER, 2),
        ],
        rewards: {
          balances: { gold: 400, gems: 15, summons: 1 },
          equipment: [createEquipment(Accessories.ACCESSORIES.royal_necklace)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 5,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(WARRIOR_CHARACTER, 3),
          cloneCharacter(SPEARWOMAN_CHARACTER, 3),
          cloneCharacter(FIREWARRIOR_CHARACTER, 3),
        ],
        rewards: {
          balances: { gold: 500, gems: 20, summons: 1 },
          equipment: [createEquipment(Weapons.WEAPONS.ancient_heavy)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 6,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIREWARRIOR_CHARACTER, 4),
          cloneCharacter(WARRIOR_CHARACTER, 3),
          cloneCharacter(SPEARWOMAN_CHARACTER, 4),
        ],
        rewards: {
          balances: { gold: 600, gems: 20, summons: 1 },
          equipment: [createEquipment(Weapons.WEAPONS.ancient_heavy)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 7,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(WARRIOR_CHARACTER, 4),
          cloneCharacter(SPEARWOMAN_CHARACTER, 4),
          cloneCharacter(CRYSTAL_KING, 4),
        ],
        rewards: {
          balances: { gold: 700, gems: 25, summons: 1 },
          equipment: [createEquipment(Weapons.WEAPONS.ancient_heavy)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 8,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIREWARRIOR_CHARACTER, 5),
          cloneCharacter(WARRIOR_CHARACTER, 4),
          cloneCharacter(SPEARWOMAN_CHARACTER, 5),
          cloneCharacter(CRYSTAL_KING, 4),
        ],
        rewards: {
          equipment: [createEquipment(Weapons.WEAPONS.ancient_heavy)],
          balances: { gold: 800, gems: 25, summons: 1 },
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 9,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(WARRIOR_CHARACTER, 5),
          cloneCharacter(SPEARWOMAN_CHARACTER, 5),
          cloneCharacter(CRYSTAL_KING, 5),
        ],
        rewards: {
          balances: { gold: 900, gems: 30, summons: 1 },
          equipment: [createEquipment(Weapons.WEAPONS.ancient_heavy)],
        },
      },
      {
        chapterNumber: 1,
        stageNumber: 10,
        background: "magic_field_bg",
        enemies: [
          cloneCharacter(FIRE_KING_CHARACTER, 6),
          cloneCharacter(FIREWARRIOR_CHARACTER, 5),
          cloneCharacter(SPEARWOMAN_CHARACTER, 5),
          cloneCharacter(WARRIOR_CHARACTER, 5),
        ],
        rewards: {
          balances: { gold: 1200, gems: 40, summons: 2 },
          equipment: [createEquipment(AllEquipment.EQUIPMENT.bworn.chest)],
        },
      },
    ],
  },
];

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
