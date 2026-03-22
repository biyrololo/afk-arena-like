import { type IStage } from "../chapter.model";

import {
  BLUE_SLIME_CHARACTER,
  PURPLE_SLIME_CHARACTER,

  FIREWARRIOR_CHARACTER,
  GREEN_SLIME_CHARACTER,
  WARRIOR_CHARACTER,
  MINOTAUR_CHARACTER,
  BRINGER_OF_DEATH_CHARACTER,
  NIGHT_BORNE_CHARACTER,
  KNIGHT_CHARACTER,
  STEEL_KNIGHT_CHARACTER,
  HERO_KNIGHT_CHARACTER,
  OLD_GUARDIAN_CHARACTER,
  MARTIAL_HERO_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import {
  Accessories,
  AllEquipment,
  Weapons,
} from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

export const CHAPTER_1_STAGES: IStage[] = [
  {
    chapterNumber: 1,
    stageNumber: 1,
    background: "grass_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 1),
      cloneCharacter(BLUE_SLIME_CHARACTER, 1),
    ],
    rewards: {
      balances: { gold: 150, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.browngreen.helmet),
        createEquipment(Weapons.WEAPONS.sharp_pink),
      ],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 2,
    background: "grass_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 1),
      cloneCharacter(GREEN_SLIME_CHARACTER, 2),
      cloneCharacter(GREEN_SLIME_CHARACTER, 1),
    ],
    rewards: {
      balances: { gold: 250, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },

  // БОСС WARRIOR
  {
    chapterNumber: 1,
    stageNumber: 3,
    background: "grass_bg",
    enemies: [
      cloneCharacter(WARRIOR_CHARACTER, 6, {
        hp: 200
      } as PlayerCharacterState),
    ],
    ost: 'battle',
    rewards: {
      balances: { gold: 1000, gems: 50, summons: 1, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.gold.boots),
        // createEquipment(Weapons.WEAPONS.emerald),
        // createEquipment(Accessories.ACCESSORIES.iron_gloves)
      ],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 4,
    background: "grass_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 8),
      cloneCharacter(BLUE_SLIME_CHARACTER, 11),
      cloneCharacter(GREEN_SLIME_CHARACTER, 8),
      cloneCharacter(BLUE_SLIME_CHARACTER, 11),
    ],
    rewards: {
      balances: { gold: 400, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 5,
    background: "volcano_bg",
    enemies: [
      cloneCharacter(GREEN_SLIME_CHARACTER, 12),
      cloneCharacter(MINOTAUR_CHARACTER, 12),
      cloneCharacter(BLUE_SLIME_CHARACTER, 12),
      cloneCharacter(MINOTAUR_CHARACTER, 12),
    ],
    rewards: {
      balances: { gold: 600, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 6,
    background: "volcano_bg",
    enemies: [
      cloneCharacter(BLUE_SLIME_CHARACTER, 12),
      cloneCharacter(MINOTAUR_CHARACTER, 13),
      cloneCharacter(MINOTAUR_CHARACTER, 13),
      cloneCharacter(BLUE_SLIME_CHARACTER, 12),
    ],
    rewards: {
      balances: { gold: 800, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [
        // createEquipment(AllEquipment.EQUIPMENT.gold.chest),
        // createEquipment(AllEquipment.EQUIPMENT.orange.helmet),
        createEquipment(AllEquipment.EQUIPMENT.browngreen.boots),
      ],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 7,
    background: "volcano_bg",
    enemies: [
      cloneCharacter(BLUE_SLIME_CHARACTER, 12),
      cloneCharacter(MINOTAUR_CHARACTER, 14),
      cloneCharacter(MINOTAUR_CHARACTER, 14),
      cloneCharacter(MINOTAUR_CHARACTER, 13),
    ],
    rewards: {
      balances: { gold: 1000, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(Weapons.WEAPONS.solid_purple),
        // createEquipment(Weapons.WEAPONS.torch),
      ],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 8,
    background: "volcano_bg",
    enemies: [
      cloneCharacter(MINOTAUR_CHARACTER, 13),
      cloneCharacter(MINOTAUR_CHARACTER, 13),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 14),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 14),
    ],
    rewards: {
      balances: { gold: 1500, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [
        // createEquipment(AllEquipment.EQUIPMENT.steel.helmet),
        // createEquipment(AllEquipment.EQUIPMENT.steel.chest),
      ],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 9,
    background: "abyss_bg_2",
    enemies: [
      cloneCharacter(PURPLE_SLIME_CHARACTER, 11),
      cloneCharacter(MINOTAUR_CHARACTER, 11),
      cloneCharacter(PURPLE_SLIME_CHARACTER, 11),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 11),
    ],
    rewards: {
      balances: { gold: 1800, gems: 5, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(Accessories.ACCESSORIES.wooden_shield)
      ],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 10,
    background: "abyss_bg_2",
    enemies: [
      cloneCharacter(PURPLE_SLIME_CHARACTER, 16),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 16),
      cloneCharacter(MINOTAUR_CHARACTER, 14),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 14),
    ],
    rewards: {
      balances: { gold: 2500, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 11,
    background: "abyss_bg_2",
    enemies: [
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 15),
      cloneCharacter(PURPLE_SLIME_CHARACTER, 17),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 15),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 17),
    ],
    rewards: {
      balances: { gold: 2600, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 12,
    background: "abyss_bg_2",
    enemies: [
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 19),
      cloneCharacter(MINOTAUR_CHARACTER, 19),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 19),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 27),
    ],
    rewards: {
      balances: { gold: 2800, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 13,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 23),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 24),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 24),
      cloneCharacter(KNIGHT_CHARACTER, 21),
    ],
    rewards: {
      balances: { gold: 2100, gems: 35, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.steel_browngreen.chest),
        createEquipment(AllEquipment.EQUIPMENT.steel_browngreen.helmet),
        createEquipment(AllEquipment.EQUIPMENT.steel_browngreen.boots),
      ],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 14,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(HERO_KNIGHT_CHARACTER, 23),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 24),
      cloneCharacter(BLUE_SLIME_CHARACTER, 23),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 23),
    ],
    rewards: {
      balances: { gold: 3500, gems: 75, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(Weapons.WEAPONS.short_blue),
      ],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 15,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(PURPLE_SLIME_CHARACTER, 13),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 13),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 13),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 13),
    ],
    rewards: {
      balances: { gold: 2400, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 16,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 18),
      cloneCharacter(KNIGHT_CHARACTER, 18),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 16),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 18),
    ],
    rewards: {
      balances: { gold: 2700, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 17,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 23),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 22),
      cloneCharacter(MARTIAL_HERO_CHARACTER, 23),
      cloneCharacter(KNIGHT_CHARACTER, 27),
    ],
    rewards: {
      balances: { gold: 2800, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 18,
    background: "night_castle_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 21),
      cloneCharacter(HERO_KNIGHT_CHARACTER, 21),
      cloneCharacter(MINOTAUR_CHARACTER, 21),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 19),
    ],
    rewards: {
      balances: { gold: 3000, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 19,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(KNIGHT_CHARACTER, 15),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 25),
      cloneCharacter(MINOTAUR_CHARACTER, 21),
      cloneCharacter(MINOTAUR_CHARACTER, 21),
    ],
    rewards: {
      balances: { gold: 3500, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },

  // БОСС FIRE WARRIOR
  {
    chapterNumber: 1,
    stageNumber: 20,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(FIREWARRIOR_CHARACTER, 50, {
        hp: 1100
      } as PlayerCharacterState),
    ],
    ost: 'battle2',
    rewards: {
      balances: { gold: 6000, gems: 200, summons: 2, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.steel_light.chest),
        createEquipment(Weapons.WEAPONS.hellstone),
        createEquipment(Accessories.ACCESSORIES.gold_ring)
      ],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 21,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 21),
      cloneCharacter(BLUE_SLIME_CHARACTER, 22),
      cloneCharacter(MINOTAUR_CHARACTER, 23),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 23),
    ],
    rewards: {
      balances: { gold: 4000, gems: 15, summons: 0, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.bworn.chest),
      ],
    },
  },

  {
    chapterNumber: 1,
    stageNumber: 22,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(NIGHT_BORNE_CHARACTER, 23),
      cloneCharacter(BLUE_SLIME_CHARACTER, 23),
      cloneCharacter(PURPLE_SLIME_CHARACTER, 23),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 23),
    ],
    rewards: {
      balances: { gold: 4500, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 23,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(NIGHT_BORNE_CHARACTER, 21),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 21),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 21),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 21),
    ],
    rewards: {
      balances: { gold: 5000, gems: 0, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },
  {
    chapterNumber: 1,
    stageNumber: 24,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(NIGHT_BORNE_CHARACTER, 22),
      cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 21),
      cloneCharacter(STEEL_KNIGHT_CHARACTER, 22),
      cloneCharacter(NIGHT_BORNE_CHARACTER, 27),
    ],
    rewards: {
      balances: { gold: 5500, gems: 50, summons: 0, summonsSpecial: 0 },
      equipment: [],
    },
  },

  // КОНЕЦ ГЛАВЫ
  {
    chapterNumber: 1,
    stageNumber: 25,
    background: "ancient_bg",
    enemies: [
      cloneCharacter(OLD_GUARDIAN_CHARACTER, 44),
    ],
    ost: 'battle',
    rewards: {
      balances: { gold: 20000, gems: 500, summons: 5, summonsSpecial: 0 },
      equipment: [
        createEquipment(AllEquipment.EQUIPMENT.bworn.boots),
      ],
    },
  },
];