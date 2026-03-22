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
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

// Пресеты для быстрой вставки тинтов
const iceTint = { baseColor: 0xadd8e6 } as PlayerCharacterState;
const deepFrostTint = { baseColor: 0x00f0ff } as PlayerCharacterState;

export const CHAPTER_2_STAGES: IStage[] = [
  // --- АКТ 1: ПОДНОЖИЕ ГОР (1-10) ---
  {
    chapterNumber: 2, stageNumber: 1, background: "snow_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 27, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 27, iceTint),
      cloneCharacter(GREEN_SLIME_CHARACTER, 22, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 22, iceTint),
    ],
    rewards: {
      balances: { gold: 3000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
        createEquipment(AllEquipment.EQUIPMENT.bworn.chest),
        createEquipment(AllEquipment.EQUIPMENT.light.chest),
      ]
    }
  },
  {
    chapterNumber: 2, stageNumber: 2, background: "snow_bg",
    enemies: [
      cloneCharacter(MINOTAUR_CHARACTER, 19, deepFrostTint), cloneCharacter(BLUE_SLIME_CHARACTER, 17, deepFrostTint),
      cloneCharacter(PURPLE_SLIME_CHARACTER, 16, iceTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 19, deepFrostTint),
    ],
    rewards: { balances: { gold: 3200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 3, background: "snow_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 36, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 36, deepFrostTint)],
    rewards: { balances: { gold: 3400, gems: 5, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 4, background: "snow_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 25, iceTint), cloneCharacter(BLUE_SLIME_CHARACTER, 26, iceTint),
      cloneCharacter(MINOTAUR_CHARACTER, 20)
    ],
    rewards: { balances: { gold: 3600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 5, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 33, iceTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 33, iceTint),
      cloneCharacter(KNIGHT_CHARACTER, 33, iceTint),
    ],
    rewards: { balances: { gold: 3800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 6, background: "ice_lake_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 36, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 36, iceTint)],
    rewards: { balances: { gold: 4000, gems: 10, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 7, background: "ice_abyss_2_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 27, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 27, iceTint)],
    rewards: { balances: { gold: 4200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 8, background: "ice_abyss_2_bg",
    enemies: [
      cloneCharacter(NIGHT_BORNE_CHARACTER, 36, iceTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 36, iceTint),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 36, iceTint),
    ],
    rewards: { balances: { gold: 4400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 9, background: "ice_boss_1_bg",
    enemies: [cloneCharacter(FROST_GUARDIAN, 50, {
      hp: 2400
    } as PlayerCharacterState)],
    ost: 'battle',
    rewards: { balances: { gold: 4600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 10, background: "ice_boss_1_bg",
    enemies: [cloneCharacter(VIKING_CHARACTER, 42, { hp: 1600 } as PlayerCharacterState)],
    ost: 'battle',
    rewards: {
      balances: { gold: 8000, gems: 100, summons: 1, summonsSpecial: 0 }, equipment: [
        createEquipment(Weapons.WEAPONS.bone)
      ]
    }
  },

  // --- АКТ 2: ПЕРЕВАЛЫ И ОЗЕРА (11-20) ---
  {
    chapterNumber: 2, stageNumber: 11, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 33, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 33, deepFrostTint),
      cloneCharacter(KNIGHT_CHARACTER, 33, iceTint), cloneCharacter(MINOTAUR_CHARACTER, 33, deepFrostTint),
    ],
    rewards: { balances: { gold: 5000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 12, background: "ice_lake_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 34, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 27, iceTint)],
    rewards: { balances: { gold: 5200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 13, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 39, iceTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 40, iceTint),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 43, iceTint)
    ],
    rewards: { balances: { gold: 5400, gems: 15, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 14, background: "ice_lake_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 23, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 21, iceTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 21, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 23, deepFrostTint),
    ],
    rewards: {
      balances: { gold: 5600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
        createEquipment(Accessories.ACCESSORIES.magic_crystal_gloves)
      ]
    }
  },
  {
    chapterNumber: 2, stageNumber: 15, background: "snow_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 38, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 39, iceTint)],
    rewards: { balances: { gold: 5800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 16, background: "snow_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 49, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 49, iceTint)],
    rewards: { balances: { gold: 6000, gems: 20, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 17, background: "ice_abyss_bg",
    enemies: [
      cloneCharacter(HERO_KNIGHT_CHARACTER, 37, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 37, iceTint),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 33, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 33, iceTint),
    ],
    rewards: { balances: { gold: 6200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 18, background: "ice_abyss_bg",
    enemies: [
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 36, deepFrostTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 38, deepFrostTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 39, deepFrostTint), cloneCharacter(BLUE_SLIME_CHARACTER, 33, deepFrostTint),
    ],
    rewards: { balances: { gold: 6400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 19, background: "ice_lake_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 45, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 43, iceTint)],
    rewards: { balances: { gold: 6600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 20, background: "ice_lake_bg",
    enemies: [cloneCharacter(WATER_PRIESTESS_CHARACTER, 70, { hp: 1000 } as PlayerCharacterState)],
    ost: 'battle2',
    rewards: {
      balances: { gold: 12000, gems: 250, summons: 1, summonsSpecial: 0 }, equipment: [
        createEquipment(AllEquipment.EQUIPMENT.green.chest),
        createEquipment(AllEquipment.EQUIPMENT.green.helmet),
        createEquipment(AllEquipment.EQUIPMENT.green.boots),
      ]
    }
  },

  // --- АКТ 3: ЛЕДЯНОЙ ЗАМОК (21-30) ---
  {
    chapterNumber: 2, stageNumber: 21, background: "ice_castle_bg",
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 41, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 41, deepFrostTint)],
    rewards: { balances: { gold: 8000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 22, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 46, deepFrostTint), cloneCharacter(KNIGHT_CHARACTER, 46, deepFrostTint)],
    rewards: { balances: { gold: 8200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 23, background: "ice_castle_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 48, deepFrostTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 49, deepFrostTint)],
    rewards: { balances: { gold: 8400, gems: 30, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 24, background: "ice_castle_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 43, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 44, deepFrostTint)],
    rewards: { balances: { gold: 8600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 25, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 41, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 41, deepFrostTint)],
    rewards: { balances: { gold: 8800, gems: 50, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 26, background: "ice_castle_bg",
    enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 46, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 46, deepFrostTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 46, deepFrostTint)],
    rewards: { balances: { gold: 9000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 27, background: "ice_castle_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 51, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 46, deepFrostTint)],
    rewards: { balances: { gold: 9200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 28, background: "ice_castle_bg",
    enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 43, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 45, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 37, deepFrostTint)],
    rewards: { balances: { gold: 9400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 29, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GUARDIAN_CHARACTER, 49, deepFrostTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 48, deepFrostTint)],
    rewards: { balances: { gold: 9600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 30, background: "ice_boss_2_bg",
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 57)],
    ost: 'battle',
    rewards: {
      balances: { gold: 20000, gems: 300, summons: 2, summonsSpecial: 0 },
      equipment: [createEquipment(Weapons.WEAPONS.falchion)]
    }
  },

  // --- АКТ 4: ВЕРШИНА ТАЛЛОСА (31-40) ---
  {
    chapterNumber: 2, stageNumber: 31, background: "ice_abyss_bg",
    enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 44, deepFrostTint), cloneCharacter(OLD_GUARDIAN_CHARACTER, 45, deepFrostTint)],
    rewards: { balances: { gold: 12000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 32, background: "ice_abyss_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 47, deepFrostTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 49, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 45, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 41, deepFrostTint)],
    rewards: { balances: { gold: 12500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 33, background: "ice_abyss_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 43, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 35, deepFrostTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 43, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 35, deepFrostTint),
    ],
    rewards: { balances: { gold: 13000, gems: 40, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 34, background: "ice_abyss_bg",
    enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 48, deepFrostTint), cloneCharacter(BLUE_SLIME_CHARACTER, 50, deepFrostTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 48, deepFrostTint), cloneCharacter(BLUE_SLIME_CHARACTER, 50, deepFrostTint)],
    rewards: { balances: { gold: 13500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 35, background: "ice_abyss_2_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 37, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 43, deepFrostTint),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 43, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 33, deepFrostTint),
    ],
    rewards: { balances: { gold: 14000, gems: 50, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 36, background: "ice_abyss_2_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 35, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 40, deepFrostTint),
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 40, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 35, deepFrostTint),
    ],
    rewards: {
      balances: { gold: 14500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
        createEquipment(Weapons.WEAPONS.heavy_melee),
        createEquipment(Weapons.WEAPONS.royal),
        createEquipment(Accessories.ACCESSORIES.fortified_wooden_shield)
      ]
    }
  },
  {
    chapterNumber: 2, stageNumber: 37, background: "ice_abyss_2_bg",
    enemies: [cloneCharacter(MINOTAUR_CHARACTER, 47, deepFrostTint), cloneCharacter(MINOTAUR_CHARACTER, 47, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 39, deepFrostTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 40, deepFrostTint)],
    rewards: { balances: { gold: 15000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 38, background: "ice_castle_bg",
    enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 50, deepFrostTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 50, deepFrostTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 39, deepFrostTint)],
    rewards: { balances: { gold: 16000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 39, background: "ice_castle_bg",
    enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 48, deepFrostTint), cloneCharacter(OLD_GOLEM_CHARACTER, 48, deepFrostTint)],
    rewards: { balances: { gold: 18000, gems: 100, summons: 0, summonsSpecial: 0 }, equipment: [] }
  },
  {
    chapterNumber: 2, stageNumber: 40, background: "ice_boss_1_bg",
    enemies: [cloneCharacter(FROST_GUARDIAN, 60)],
    ost: 'battle2',
    rewards: {
      balances: { gold: 50000, gems: 1000, summons: 10, summonsSpecial: 0 },
      equipment: [createEquipment(Weapons.WEAPONS.emerald)]
    }
  },
];