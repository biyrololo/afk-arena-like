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

// Пресеты для быстрой вставки тинтов
const iceTint = { baseColor: 0xadd8e6 } as PlayerCharacterState;
const deepFrostTint = { baseColor: 0x00f0ff } as PlayerCharacterState;

export const CHAPTER_2_STAGES: IStage[] = [
  // --- АКТ 1: ПОДНОЖИЕ ГОР (1-10) ---
  {
    chapterNumber: 2, stageNumber: 1, background: "ice_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 20, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 20, iceTint),
      cloneCharacter(GREEN_SLIME_CHARACTER, 22, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 22, iceTint),
    ],
    rewards: { balances: { gold: 3000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 2, background: "ice_bg",
    enemies: [
      cloneCharacter(MINOTAUR_CHARACTER, 16, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 18, deepFrostTint),
      cloneCharacter(PURPLE_SLIME_CHARACTER, 18, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 18, deepFrostTint),
    ],
    rewards: { balances: { gold: 3200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 3, background: "ice_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 28, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 28, deepFrostTint)],
    rewards: { balances: { gold: 3400, gems: 5, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 4, background: "ice_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 25, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 20, iceTint),
      cloneCharacter(MINOTAUR_CHARACTER, 20)
    ],
    rewards: { balances: { gold: 3600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 5, background: "ice_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 27, iceTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 27, iceTint),
      cloneCharacter(KNIGHT_CHARACTER, 27, iceTint),
    ],
    rewards: { balances: { gold: 3800, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 6, background: "ice_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 28, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 28, iceTint)],
    rewards: { balances: { gold: 4000, gems: 10, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 7, background: "ice_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 25, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 25, iceTint)],
    rewards: { balances: { gold: 4200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 8, background: "ice_bg",
    enemies: [
      cloneCharacter(NIGHT_BORNE_CHARACTER, 30, iceTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 30, iceTint),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 30, iceTint),
    ],
    rewards: { balances: { gold: 4400, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 9, background: "ice_bg",
    enemies: [cloneCharacter(FROST_GUARDIAN, 30, {
      hp: 2500
    } as PlayerCharacterState)],
    rewards: { balances: { gold: 4600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 10, background: "ice_bg",
    enemies: [cloneCharacter(VIKING_CHARACTER, 40, { hp: 2000 } as PlayerCharacterState)],
    ost: 'battle',
    rewards: { balances: { gold: 8000, gems: 100, summons: 1 }, equipment: [] }
  },

  // --- АКТ 2: ПЕРЕВАЛЫ И ОЗЕРА (11-20) ---
  {
    chapterNumber: 2, stageNumber: 11, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 27, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 27, deepFrostTint),
      cloneCharacter(KNIGHT_CHARACTER, 27, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 27, deepFrostTint),
    ],
    rewards: { balances: { gold: 5000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 12, background: "ice_lake_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 27, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 26, iceTint)],
    rewards: { balances: { gold: 5200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 13, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 28, iceTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 35, iceTint),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 36, iceTint)
    ],
    rewards: { balances: { gold: 5400, gems: 15, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 14, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 22, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 22, iceTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 22, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 22, iceTint),
    ],
    rewards: { balances: { gold: 5600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 15, background: "ice_lake_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 35, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 35, iceTint)],
    rewards: { balances: { gold: 5800, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 16, background: "ice_lake_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 45, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 38, iceTint)],
    rewards: { balances: { gold: 6000, gems: 20, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 17, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(HERO_KNIGHT_CHARACTER, 31, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 31, iceTint),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 31, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 31, iceTint),
    ],
    rewards: { balances: { gold: 6200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 18, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 36, iceTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 38, deepFrostTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 30, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 38, deepFrostTint),
    ],
    rewards: { balances: { gold: 6400, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 19, background: "ice_lake_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 40, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 38, iceTint)],
    rewards: { balances: { gold: 6600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 20, background: "ice_lake_bg",
    enemies: [cloneCharacter(WATER_PRIESTESS_CHARACTER, 60, { hp: 4500 } as PlayerCharacterState)],
    ost: 'battle2',
    rewards: { balances: { gold: 12000, gems: 250, summons: 1 }, equipment: [] }
  },

  // --- АКТ 3: ЛЕДЯНОЙ ЗАМОК (21-30) ---
  {
    chapterNumber: 2, stageNumber: 21, background: "ice_castle_bg",
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 35, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 35, deepFrostTint)],
    rewards: { balances: { gold: 8000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 22, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 43, deepFrostTint), cloneCharacter(KNIGHT_CHARACTER, 43, iceTint)],
    rewards: { balances: { gold: 8200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 23, background: "ice_castle_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 44, deepFrostTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 45, deepFrostTint)],
    rewards: { balances: { gold: 8400, gems: 30, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 24, background: "ice_castle_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 38, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 36, iceTint)],
    rewards: { balances: { gold: 8600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 25, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 42, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 42, iceTint)],
    rewards: { balances: { gold: 8800, gems: 50, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 26, background: "ice_castle_bg",
    enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 43, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 43, iceTint)],
    rewards: { balances: { gold: 9000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 27, background: "ice_castle_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 39, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 40, deepFrostTint)],
    rewards: { balances: { gold: 9200, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 28, background: "ice_castle_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 41, iceTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 45, deepFrostTint)],
    rewards: { balances: { gold: 9400, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 29, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 43, deepFrostTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 48, deepFrostTint)],
    rewards: { balances: { gold: 9600, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 30, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 40)],
    ost: 'battle',
    rewards: {
      balances: { gold: 20000, gems: 300, summons: 2 },
      equipment: [createEquipment(AllEquipment.EQUIPMENT.steel.chest)]
    }
  },

  // --- АКТ 4: ВЕРШИНА ТАЛЛОСА (31-40) ---
  {
    chapterNumber: 2, stageNumber: 31, background: "ice_temple_bg",
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 39, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 39, deepFrostTint)],
    rewards: { balances: { gold: 12000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 32, background: "ice_temple_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 47, deepFrostTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 49, deepFrostTint)],
    rewards: { balances: { gold: 12500, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 33, background: "ice_temple_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 35, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 37, deepFrostTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 35, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 37, deepFrostTint),
    ],
    rewards: { balances: { gold: 13000, gems: 40, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 34, background: "ice_temple_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 53, deepFrostTint), cloneCharacter(BLUE_SLIME_CHARACTER, 54, deepFrostTint)],
    rewards: { balances: { gold: 13500, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 35, background: "ice_temple_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 25, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 25, iceTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 25, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 39, iceTint),
    ],
    rewards: { balances: { gold: 14000, gems: 50, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 36, background: "ice_temple_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 32, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 34, deepFrostTint),
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 32, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 34, deepFrostTint),
    ],
    rewards: { balances: { gold: 14500, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 37, background: "ice_temple_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 47, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 48, iceTint)],
    rewards: { balances: { gold: 15000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 38, background: "ice_temple_bg",
    enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 48, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 36, deepFrostTint)],
    rewards: { balances: { gold: 16000, gems: 0, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 39, background: "ice_temple_bg",
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 36, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 36, deepFrostTint)],
    rewards: { balances: { gold: 18000, gems: 100, summons: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 40, background: "ice_temple_bg",
    enemies: [cloneCharacter(FROST_GUARDIAN, 50)],
    ost: 'battle2',
    rewards: {
      balances: { gold: 50000, gems: 1000, summons: 10 },
      equipment: [createEquipment(Weapons.WEAPONS.emerald)]
    }
  },
];