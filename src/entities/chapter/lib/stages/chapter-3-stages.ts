import { type IStage } from "../chapter.model";
import {
    METAL_BLADEKEEPER_CHARACTER,
    SPEARWOMAN_CHARACTER,
    KITSUNE_CHARACTER,
    WOMAN_WARRIOR_CHARACTER,
    CRYSTAL_KING,
    FIREWARRIOR_CHARACTER,
    KNIGHT_CHARACTER,
    STEEL_KNIGHT_CHARACTER,
    HERO_KNIGHT_CHARACTER,
    PURPLE_SLIME_CHARACTER,
    BLUE_SLIME_CHARACTER,
    GREEN_SLIME_CHARACTER,
    OLD_GOLEM_CHARACTER,
    BRINGER_OF_DEATH_CHARACTER,
    NIGHT_BORNE_CHARACTER,
    MARTIAL_HERO_CHARACTER,
    MINOTAUR_CHARACTER,
    TREE_MAN_CHARACTER,
} from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";
import { cloneCharacter } from "@/shared/types/character";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

const abyssTint = { baseColor: 0x4b0082 } as PlayerCharacterState;
const crystalTint = { baseColor: 0x00ffff } as PlayerCharacterState;

const BACKGROUNDS = {
    crystal_cave: 'crystal_cave_bg',
    sky: 'sky_bg',
    forest_bg: 'forest_bg',
    crystal_bg: 'crystal_bg',
    mistic_library_bg: 'mistic_library_bg',
    ancient_floor_bg: 'ancient_floor_bg',
    abyss_bg: 'abyss_bg'
}

export const CHAPTER_4_STAGES: IStage[] = [
    {
        chapterNumber: 4, stageNumber: 1, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(FIREWARRIOR_CHARACTER, 50), cloneCharacter(FIREWARRIOR_CHARACTER, 50), cloneCharacter(FIREWARRIOR_CHARACTER, 50)],
        rewards: { balances: { gold: 5000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    }
]

export const CHAPTER_3_STAGES: IStage[] = [
    // --- АКТ 1: ЗЕМЛИ ОРДЕНА (1-10) ---
    {
        chapterNumber: 3, stageNumber: 1, background: BACKGROUNDS.forest_bg,
        enemies: [
            cloneCharacter(KNIGHT_CHARACTER, 35), cloneCharacter(PURPLE_SLIME_CHARACTER, 35, abyssTint), cloneCharacter(KNIGHT_CHARACTER, 35)
        ],
        rewards: { balances: { gold: 5000, gems: 20, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 2, background: BACKGROUNDS.forest_bg,
        enemies: [
            cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 42),
            cloneCharacter(KNIGHT_CHARACTER, 42),
            cloneCharacter(MINOTAUR_CHARACTER, 42),
            cloneCharacter(HERO_KNIGHT_CHARACTER, 42),
        ],
        rewards: { balances: { gold: 5200, gems: 0, summons: 10, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 3, background: BACKGROUNDS.forest_bg,
        enemies: [
            cloneCharacter(KNIGHT_CHARACTER, 43), cloneCharacter(MINOTAUR_CHARACTER, 43), cloneCharacter(KNIGHT_CHARACTER, 43),
            cloneCharacter(HERO_KNIGHT_CHARACTER, 43),
        ],
        rewards: { balances: { gold: 5400, gems: 10, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 4, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 38, crystalTint), cloneCharacter(BLUE_SLIME_CHARACTER, 38, crystalTint), cloneCharacter(GREEN_SLIME_CHARACTER, 38, abyssTint)],
        rewards: { balances: { gold: 5600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 5, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 46), cloneCharacter(STEEL_KNIGHT_CHARACTER, 46), cloneCharacter(STEEL_KNIGHT_CHARACTER, 46)],
        rewards: { balances: { gold: 5800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 6, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 40, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 40, abyssTint), cloneCharacter(GREEN_SLIME_CHARACTER, 40, abyssTint)],
        rewards: { balances: { gold: 6000, gems: 15, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 7, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 41), cloneCharacter(KNIGHT_CHARACTER, 41), cloneCharacter(HERO_KNIGHT_CHARACTER, 41)],
        rewards: { balances: { gold: 6200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 8, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 50), cloneCharacter(HERO_KNIGHT_CHARACTER, 50), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 49, abyssTint)],
        rewards: { balances: { gold: 6400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 9, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 43), cloneCharacter(HERO_KNIGHT_CHARACTER, 43), cloneCharacter(PURPLE_SLIME_CHARACTER, 43, crystalTint)],
        rewards: { balances: { gold: 6600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 10, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 52), cloneCharacter(STEEL_KNIGHT_CHARACTER, 52)],
        ost: 'battle',
        rewards: { balances: { gold: 12000, gems: 100, summons: 1, summonsSpecial: 0 }, equipment: [createEquipment(Weapons.WEAPONS.heavy_melee)] }
    },

    // --- АКТ 2: ПУТЬ К АКАРИ (11-20) ---
    {
        chapterNumber: 3, stageNumber: 11, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 53, abyssTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 53, abyssTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 53, abyssTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 53, abyssTint)],
        rewards: { balances: { gold: 7000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 12, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 46), cloneCharacter(HERO_KNIGHT_CHARACTER, 46), cloneCharacter(PURPLE_SLIME_CHARACTER, 46, abyssTint)],
        rewards: { balances: { gold: 7200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 13, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 55, crystalTint), cloneCharacter(MINOTAUR_CHARACTER, 55, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 54, crystalTint)],
        rewards: { balances: { gold: 7400, gems: 20, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 14, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 48), cloneCharacter(HERO_KNIGHT_CHARACTER, 48), cloneCharacter(MINOTAUR_CHARACTER, 48, crystalTint)],
        rewards: { balances: { gold: 7600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 15, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 57), cloneCharacter(NIGHT_BORNE_CHARACTER, 57, abyssTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 57)],
        rewards: { balances: { gold: 7800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 16, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 58, abyssTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 58, abyssTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 58, abyssTint)],
        rewards: { balances: { gold: 8000, gems: 25, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 17, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(KNIGHT_CHARACTER, 51), cloneCharacter(HERO_KNIGHT_CHARACTER, 51), cloneCharacter(NIGHT_BORNE_CHARACTER, 51, abyssTint)],
        rewards: { balances: { gold: 8200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 18, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 52), cloneCharacter(KNIGHT_CHARACTER, 52), cloneCharacter(HERO_KNIGHT_CHARACTER, 52)],
        rewards: { balances: { gold: 8400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 19, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 61, abyssTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 60, abyssTint), cloneCharacter(MINOTAUR_CHARACTER, 61, abyssTint)],
        rewards: { balances: { gold: 8600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 20, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(SPEARWOMAN_CHARACTER, 62, { ...abyssTint } as PlayerCharacterState)],
        ost: 'battle2',
        rewards: {
            balances: { gold: 20000, gems: 500, summons: 20, summonsSpecial: 0 },
            equipment: [createEquipment(Accessories.ACCESSORIES.magic_crystal_gloves)]
        }
    },

    // --- АКТ 3: ИЛЛЮЗИИ КИЦУНЭ (21-30) ---
    {
        chapterNumber: 3, stageNumber: 21, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 63, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 63, crystalTint)],
        rewards: { balances: { gold: 9000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 22, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 64, crystalTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 63, abyssTint)],
        rewards: { balances: { gold: 9200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 23, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 65, crystalTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 64, abyssTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 64, crystalTint)],
        rewards: { balances: { gold: 9400, gems: 30, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 24, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 65, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 65, crystalTint)],
        rewards: { balances: { gold: 9600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 25, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(KNIGHT_CHARACTER, 58), cloneCharacter(HERO_KNIGHT_CHARACTER, 58), cloneCharacter(PURPLE_SLIME_CHARACTER, 58, crystalTint)],
        rewards: { balances: { gold: 10000, gems: 50, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 26, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 67, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 67, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 67, crystalTint)],
        rewards: { balances: { gold: 10200, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 27, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 68, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 67, abyssTint)],
        rewards: { balances: { gold: 10400, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 28, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 68, abyssTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 68, crystalTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 69, abyssTint)],
        rewards: { balances: { gold: 10600, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 29, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 62), cloneCharacter(KNIGHT_CHARACTER, 62), cloneCharacter(HERO_KNIGHT_CHARACTER, 62)],
        rewards: { balances: { gold: 10800, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 30, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 70)],
        ost: 'battle',
        rewards: {
            balances: { gold: 22000, gems: 150, summons: 1, summonsSpecial: 0 },
            equipment: [createEquipment(Accessories.ACCESSORIES.fortified_wooden_shield)]
        }
    },

    // --- АКТ 4: РУБЕЖ СТОЛИЦЫ (31-40) ---
    {
        chapterNumber: 3, stageNumber: 31, background: BACKGROUNDS.abyss_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 71), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 71, abyssTint)],
        rewards: { balances: { gold: 11500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 32, background: BACKGROUNDS.abyss_bg,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 72), cloneCharacter(NIGHT_BORNE_CHARACTER, 72, abyssTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 72)],
        rewards: { balances: { gold: 12000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 33, background: BACKGROUNDS.abyss_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 65), cloneCharacter(KNIGHT_CHARACTER, 65), cloneCharacter(HERO_KNIGHT_CHARACTER, 65)],
        rewards: { balances: { gold: 12500, gems: 40, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 34, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 74, abyssTint), cloneCharacter(MINOTAUR_CHARACTER, 74, crystalTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 74, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 74, crystalTint)],
        rewards: { balances: { gold: 13000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 35, background: BACKGROUNDS.crystal_bg,
        enemies: [cloneCharacter(KITSUNE_CHARACTER, 90), cloneCharacter(KITSUNE_CHARACTER, 60, abyssTint)],
        ost: 'battle',
        rewards: { balances: { gold: 30000, gems: 200, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 36, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 76), cloneCharacter(MARTIAL_HERO_CHARACTER, 76, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 76, abyssTint)],
        rewards: {
            balances: { gold: 14000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
                createEquipment(Weapons.WEAPONS.heavy_melee),
                createEquipment(Weapons.WEAPONS.royal)
            ]
        }
    },
    {
        chapterNumber: 3, stageNumber: 37, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 77), cloneCharacter(HERO_KNIGHT_CHARACTER, 77), cloneCharacter(OLD_GOLEM_CHARACTER, 77, crystalTint)],
        rewards: { balances: { gold: 14500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 38, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(TREE_MAN_CHARACTER, 78, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 78, crystalTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 78)],
        rewards: { balances: { gold: 15000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 39, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 71), cloneCharacter(KNIGHT_CHARACTER, 71), cloneCharacter(HERO_KNIGHT_CHARACTER, 71)],
        rewards: { balances: { gold: 16000, gems: 60, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 40, background: BACKGROUNDS.forest_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 72), cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 72)],
        rewards: { balances: { gold: 40000, gems: 300, summons: 1, summonsSpecial: 0 }, equipment: [createEquipment(Weapons.WEAPONS.royal)] }
    },

    // --- АКТ 5: ВЕРШИНА И ФИНАЛ (41-60) ---
    {
        chapterNumber: 3, stageNumber: 41, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 81), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 81, abyssTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 81)],
        rewards: { balances: { gold: 17000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 42, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 82, crystalTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 82, abyssTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 82, abyssTint)],
        rewards: { balances: { gold: 17500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 43, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(HERO_KNIGHT_CHARACTER, 83), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 83, abyssTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 83, crystalTint)],
        rewards: { balances: { gold: 18000, gems: 50, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 44, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 84, abyssTint), cloneCharacter(MINOTAUR_CHARACTER, 84, crystalTint), cloneCharacter(GREEN_SLIME_CHARACTER, 84, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 84, crystalTint)],
        rewards: { balances: { gold: 18500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 45, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 85, crystalTint), cloneCharacter(OLD_GOLEM_CHARACTER, 85, crystalTint)],
        rewards: { balances: { gold: 19000, gems: 70, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 46, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 86), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 86, abyssTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 86, crystalTint)],
        rewards: { balances: { gold: 19500, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 47, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 79), cloneCharacter(KNIGHT_CHARACTER, 79), cloneCharacter(HERO_KNIGHT_CHARACTER, 79), cloneCharacter(NIGHT_BORNE_CHARACTER, 79, abyssTint)],
        rewards: {
            balances: { gold: 20000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
                createEquipment(Accessories.ACCESSORIES.magic_crystal_gloves)
            ]
        }
    },
    {
        chapterNumber: 3, stageNumber: 48, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 88, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 88, crystalTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 88)],
        rewards: { balances: { gold: 21000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 49, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 81), cloneCharacter(KNIGHT_CHARACTER, 81), cloneCharacter(HERO_KNIGHT_CHARACTER, 81)],
        rewards: { balances: { gold: 22000, gems: 80, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 50, background: BACKGROUNDS.forest_bg,
        enemies: [
            cloneCharacter(WOMAN_WARRIOR_CHARACTER, 90),
            cloneCharacter(HERO_KNIGHT_CHARACTER, 88),
            cloneCharacter(HERO_KNIGHT_CHARACTER, 88)
        ],
        ost: 'battle2',
        rewards: { balances: { gold: 50000, gems: 1000, summons: 30, summonsSpecial: 0 }, equipment: [createEquipment(AllEquipment.EQUIPMENT.green.chest)] }
    },

    // --- АКТ 6: КРИСТАЛЬНЫЙ ПИК И ФИНАЛ (51-80) ---
    {
        chapterNumber: 3, stageNumber: 51, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(TREE_MAN_CHARACTER, 91, abyssTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 91, abyssTint)],
        rewards: { balances: { gold: 23000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 52, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 92), cloneCharacter(MARTIAL_HERO_CHARACTER, 92, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 92, abyssTint)],
        rewards: { balances: { gold: 24000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 53, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 93, crystalTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 93), cloneCharacter(OLD_GOLEM_CHARACTER, 93, crystalTint)],
        rewards: { balances: { gold: 25000, gems: 90, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 54, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MINOTAUR_CHARACTER, 94, abyssTint), cloneCharacter(MINOTAUR_CHARACTER, 94, crystalTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 94, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 94, crystalTint)],
        rewards: { balances: { gold: 26000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 55, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 95, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 95, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 95, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 95, crystalTint)],
        rewards: { balances: { gold: 27000, gems: 100, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 56, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(NIGHT_BORNE_CHARACTER, 96, abyssTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 96, abyssTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 96)],
        rewards: { balances: { gold: 28000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 57, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(TREE_MAN_CHARACTER, 89), cloneCharacter(KNIGHT_CHARACTER, 89), cloneCharacter(HERO_KNIGHT_CHARACTER, 89)],
        rewards: { balances: { gold: 29000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 58, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 98), cloneCharacter(STEEL_KNIGHT_CHARACTER, 98)],
        rewards: { balances: { gold: 30000, gems: 120, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 59, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 80, crystalTint), cloneCharacter(KNIGHT_CHARACTER, 80), cloneCharacter(TREE_MAN_CHARACTER, 70)],
        rewards: { balances: { gold: 31000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 60, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 92), cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 92)],
        rewards: { balances: { gold: 35000, gems: 150, summons: 2, summonsSpecial: 0 }, equipment: [createEquipment(AllEquipment.EQUIPMENT.green.helmet)] }
    },

    // --- АКТ 7: ПОСЛЕДНИЙ РУБЕЖ (61-70) ---
    {
        chapterNumber: 3, stageNumber: 61, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 101, abyssTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 101, abyssTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 101)],
        rewards: { balances: { gold: 32000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 62, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 102, crystalTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 102), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 102, abyssTint)],
        rewards: { balances: { gold: 33000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 63, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 95, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 95, crystalTint), cloneCharacter(GREEN_SLIME_CHARACTER, 95, abyssTint)],
        rewards: { balances: { gold: 34000, gems: 110, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 64, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(TREE_MAN_CHARACTER, 80, crystalTint), cloneCharacter(OLD_GOLEM_CHARACTER, 80, crystalTint), cloneCharacter(TREE_MAN_CHARACTER, 80, crystalTint), cloneCharacter(OLD_GOLEM_CHARACTER, 104, crystalTint)],
        rewards: { balances: { gold: 35000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 65, background: BACKGROUNDS.mistic_library_bg,
        enemies: [, cloneCharacter(FIREWARRIOR_CHARACTER, 70, { baseColor: 0xd6adff } as PlayerCharacterState), cloneCharacter(FIREWARRIOR_CHARACTER, 120, { baseColor: 0xff8c00 } as PlayerCharacterState), cloneCharacter(FIREWARRIOR_CHARACTER, 70, abyssTint)],
        ost: 'battle',
        rewards: { balances: { gold: 60000, gems: 500, summons: 2, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 66, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 106, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 106, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 106, abyssTint)],
        rewards: { balances: { gold: 36000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 67, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 107), cloneCharacter(HERO_KNIGHT_CHARACTER, 107), cloneCharacter(KNIGHT_CHARACTER, 107)],
        rewards: { balances: { gold: 37000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 68, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(TREE_MAN_CHARACTER, 108, abyssTint), cloneCharacter(TREE_MAN_CHARACTER, 108, abyssTint), cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 108)],
        rewards: {
            balances: { gold: 38000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [
                createEquipment(Weapons.WEAPONS.heavy_melee)
            ]
        }
    },
    {
        chapterNumber: 3, stageNumber: 69, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 101), cloneCharacter(KNIGHT_CHARACTER, 101), cloneCharacter(HERO_KNIGHT_CHARACTER, 101)],
        rewards: { balances: { gold: 39000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 70, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 110, abyssTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 110, abyssTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 110, abyssTint)],
        rewards: { balances: { gold: 40000, gems: 150, summons: 1, summonsSpecial: 0 }, equipment: [] }
    },

    // --- АКТ 8: ФИНАЛЬНАЯ БИТВА (71-80) ---
    {
        chapterNumber: 3, stageNumber: 71, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 111, crystalTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 111, abyssTint), cloneCharacter(STEEL_KNIGHT_CHARACTER, 111)],
        rewards: { balances: { gold: 42000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 72, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 112, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 112, abyssTint), cloneCharacter(HERO_KNIGHT_CHARACTER, 112)],
        rewards: { balances: { gold: 44000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 73, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(PURPLE_SLIME_CHARACTER, 113, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 113, crystalTint), cloneCharacter(PURPLE_SLIME_CHARACTER, 113, abyssTint), cloneCharacter(BLUE_SLIME_CHARACTER, 113, crystalTint)],
        rewards: { balances: { gold: 46000, gems: 180, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 74, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(OLD_GOLEM_CHARACTER, 114, crystalTint), cloneCharacter(KNIGHT_CHARACTER, 114)],
        rewards: { balances: { gold: 48000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 75, background: BACKGROUNDS.mistic_library_bg,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 107), cloneCharacter(KNIGHT_CHARACTER, 107), cloneCharacter(PURPLE_SLIME_CHARACTER, 107, abyssTint)],
        rewards: { balances: { gold: 50000, gems: 200, summons: 1, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 76, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 116), cloneCharacter(MARTIAL_HERO_CHARACTER, 116, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 116, abyssTint)],
        rewards: { balances: { gold: 55000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 77, background: BACKGROUNDS.ancient_floor_bg,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 117, crystalTint), cloneCharacter(NIGHT_BORNE_CHARACTER, 117, abyssTint), cloneCharacter(KNIGHT_CHARACTER, 117), cloneCharacter(TREE_MAN_CHARACTER, 100)],
        rewards: { balances: { gold: 60000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 78, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(STEEL_KNIGHT_CHARACTER, 118), cloneCharacter(HERO_KNIGHT_CHARACTER, 118), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 118, abyssTint), cloneCharacter(OLD_GOLEM_CHARACTER, 118, crystalTint), cloneCharacter(BRINGER_OF_DEATH_CHARACTER, 100)],
        rewards: { balances: { gold: 65000, gems: 250, summons: 3, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 79, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(MARTIAL_HERO_CHARACTER, 119, crystalTint), cloneCharacter(MARTIAL_HERO_CHARACTER, 119, crystalTint), cloneCharacter(METAL_BLADEKEEPER_CHARACTER, 119)],
        rewards: { balances: { gold: 70000, gems: 0, summons: 0, summonsSpecial: 0 }, equipment: [] }
    },
    {
        chapterNumber: 3, stageNumber: 80, background: BACKGROUNDS.crystal_cave,
        enemies: [cloneCharacter(CRYSTAL_KING, 140)],
        ost: 'boss_theme',
        rewards: {
            balances: { gold: 150000, gems: 500, summons: 50, summonsSpecial: 10 },
            equipment: [createEquipment(Weapons.WEAPONS.crystal), createEquipment(Weapons.WEAPONS.royal)]
        }
    },
];

CHAPTER_3_STAGES.forEach(stage => {
    stage.rewards.balances.gold += 30_000;
});
