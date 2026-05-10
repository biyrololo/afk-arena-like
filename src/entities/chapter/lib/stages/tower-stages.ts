import { type IStage, StageTypeEnum } from "../chapter.model";
import { cloneCharacter } from "@/shared/types/character";
import * as CHARACTERS from "@/entities/character/lib/allCharacters";
import type { PlayerCharacterState } from "@/shared/types/PlayerCharacter";

/** * Конфигурация биомов: фоны и их визуальные эффекты 
 */
const BIOMES = [
    { bg: "lava_castle_bg", tint: { baseColor: 0xff8c00 } },        // Огненный
    { bg: "ancient_floor_bg", tint: { baseColor: 0xffffff } },          // Обычный
    { bg: "ancient_bg", tint: { baseColor: 0xd4ffe1 } },          // Обычный
    { bg: "mistic_library_bg", tint: { baseColor: 0xd6adff } },   // Магический фиолетовый
    { bg: "abyss_bg_2", tint: { baseColor: 0x777777 } },        // Темный/теневой
    { bg: "ice_castle_2_bg", tint: { baseColor: 0xadd8e6 } },        // Ледяной
] as { bg: string; tint: PlayerCharacterState }[];

/** * Пулы противников 
 */
const COMMON_POOL = [
    CHARACTERS.BLUE_SLIME_CHARACTER,
    CHARACTERS.GREEN_SLIME_CHARACTER,
    CHARACTERS.PURPLE_SLIME_CHARACTER,
    CHARACTERS.KNIGHT_CHARACTER,
    CHARACTERS.MINOTAUR_CHARACTER
];

const ELITE_POOL = [
    CHARACTERS.STEEL_KNIGHT_CHARACTER,
    CHARACTERS.HERO_KNIGHT_CHARACTER,
    CHARACTERS.MARTIAL_HERO_CHARACTER,
    CHARACTERS.BRINGER_OF_DEATH_CHARACTER,
    CHARACTERS.NIGHT_BORNE_CHARACTER
];

const BOSS_POOL = [
    CHARACTERS.OLD_GOLEM_CHARACTER,
    CHARACTERS.OLD_GUARDIAN_CHARACTER,
    CHARACTERS.FIREWARRIOR_CHARACTER,
    CHARACTERS.TREE_MAN_CHARACTER,
    CHARACTERS.METAL_BLADEKEEPER_CHARACTER,
    CHARACTERS.FROST_GUARDIAN,
    CHARACTERS.DEMON_SLIME,
];

/**
 * Вспомогательная функция для выбора элемента на основе индекса (детерминировано)
 */
const pickFrom = <T>(array: T[], index: number): T => {
    return array[index % array.length];
};

/**
 * Основная функция генерации бесконечных этажей Башни
 */
export const generateTowerStage = (stage: number): IStage => {
    // 1. Определяем биом (меняется каждые 5 этажей)
    const biomeIndex = Math.floor((stage - 1) / 5);
    const currentBiome = pickFrom(BIOMES, biomeIndex);

    // 2. Параметры сложности
    const isBossStage = stage % 10 === 0;
    const enemyLevel = Math.floor(stage * 1.8) + 1; // Коэффициент роста уровня

    // 3. Генерация списка врагов
    let enemies = [];

    if (isBossStage) {
        const withHelper = Math.floor(stage / 10) % 3 == 0;
        // На этажах-боссах один мощный противник
        const bossTemplate = pickFrom(BOSS_POOL, Math.floor(stage / 10) - 1);
        const helperEnemy = pickFrom(ELITE_POOL, Math.floor(stage / 10) - 1);
        enemies = [undefined,
            cloneCharacter(bossTemplate, enemyLevel, currentBiome.tint),
            withHelper ? cloneCharacter(helperEnemy, enemyLevel, currentBiome.tint) : undefined
        ];
    } else {
        // На обычных этажах микс из 2-3 противников (для массовки)
        const commonEnemy = pickFrom(COMMON_POOL, stage);
        const commonEnemy2 = pickFrom(COMMON_POOL, stage * 2);
        const commonEnemy3 = pickFrom(COMMON_POOL, stage * 3);
        const eliteEnemy = pickFrom(ELITE_POOL, stage + 7); // +7 для смещения индекса
        const eliteEnemy2 = pickFrom(ELITE_POOL, stage * 2);

        const withSecondElite = Math.floor(stage / 10) % 2 == 0;

        enemies = [
            cloneCharacter(commonEnemy, enemyLevel, currentBiome.tint),
            cloneCharacter(eliteEnemy, Math.max(1, enemyLevel - 2), currentBiome.tint),
            cloneCharacter(commonEnemy2, enemyLevel, currentBiome.tint),
            withSecondElite ? cloneCharacter(eliteEnemy2, enemyLevel, currentBiome.tint) :
                cloneCharacter(commonEnemy3, enemyLevel, currentBiome.tint),
        ];
    }

    // 4. Расчет наград (линейный рост)
    const goldReward = stage * 500;
    const gemsReward = isBossStage ? Math.floor(stage / 10) * 15 + 20 : 0;
    const summonsReward = isBossStage ? 5 : 0;

    return {
        chapterNumber: 999, // Условный ID для режима башни
        stageNumber: stage,
        background: currentBiome.bg,
        type: StageTypeEnum.TOWER,
        enemies,
        rewards: {
            balances: {
                gold: goldReward,
                gems: gemsReward,
                summons: summonsReward,
                summonsSpecial: 0
            },
            equipment: [] // Сюда можно добавить шанс выпадения шмота по аналогии
        }
    };
};