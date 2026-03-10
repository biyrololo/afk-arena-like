import * as CHARACTERS from '@/entities/character/lib/allCharacters'
import type { IStatement, IPlot, IPlotScene, IPlotStore } from "../plot.model";
import { Avatars } from "@/shared/avatars";
import { usePlayerStore } from '@/entities/player/model/player.store';
import usePlayerCharactersStore from '@/shared/store/PlayerCharactersStore';
import { cloneCharacter } from '@/shared/types/character';

const checkProgress = (chapter: number, stage: number) => {
    const { chapterNumber, stageNumber } = usePlayerStore.getState()
    return chapterNumber === chapter && stageNumber === stage;
}

// ======================
// SCENES CHAPTER 2: Замёрзшие перевалы
// ======================

export const CHAPTER_2_SCENES: IPlotScene[] = [
    // --- НАЧАЛО ГЛАВЫ ---
    {
        id: "chapter2_start",
        statements: [
            {
                id: "c2s1",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Снег здесь обжигает не хуже пламени. Бездна промерзла до самого основания.",
                avatar: Avatars.fireKing,
                isAvailable: () => checkProgress(2, 2)
            },
            {
                id: "c2s2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                authorPosition: 'right',
                text: "Будь начеку. Старые Стражи теперь бродят здесь как обычные слуги Бездны.",
                avatar: Avatars.warrior,
            },
            {
                id: "c2s3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Нам нужно пробиться сквозь эти льды.",
                avatar: Avatars.fireKing,
            },
        ],
    },

    // --- ЭТАП 9: Первая Встреча с Стражем Льда ---
    {
        id: 'frost_guardian_first_encounter',
        statements: [
            {
                id: "c2fg1_1",
                author: CHARACTERS.FROST_GUARDIAN.name,
                color: "red",
                authorPosition: 'right',
                text: "ОБНАРУЖЕН ТЕПЛОВОЙ СЛЕД. ЗАПУСК ПРОЦЕССА ЗАМОРОЗКИ.",
                avatar: Avatars.frostGuardian,
                isAvailable: () => checkProgress(2, 9)
            },
            {
                id: "c2fg1_2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Этот страж огромный! Но он кажется поврежденным.",
                avatar: Avatars.fireKing,
            },
            {
                id: "c2fg1_3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Его броня треснула. Давай покончим с ним быстро!",
                avatar: Avatars.warrior,
            },
        ],
    },

    // --- ЭТАП 10: ПОБЕГ СТРАЖА И ЯВЛЕНИЕ ВИКИНГА ---
    {
        id: 'viking_interruption',
        statements: [
            {
                id: "c2vi1",
                author: CHARACTERS.FROST_GUARDIAN.name,
                color: "red",
                authorPosition: 'right',
                text: "ЦЕЛЬ ЗАХВАЧЕНА. ИНИЦИАЦИЯ ЗАМОРОЗКИ... ОШИБКА!",
                avatar: Avatars.frostGuardian,
                isAvailable: () => checkProgress(2, 10)
            },
            {
                id: "c2vi2",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "orange",
                authorPosition: 'right',
                text: "Эй, железная консерва! Попробуй заморозить мой топор!",
                avatar: Avatars.viking,
            },
            {
                id: "c2vi3",
                author: CHARACTERS.FROST_GUARDIAN.name,
                color: "red",
                authorPosition: 'right',
                text: "ОБНАРУЖЕНА НОВАЯ УГРОЗА. ОТСТУПЛЕНИЕ ДЛЯ ПЕРЕГРУЗКИ.",
                avatar: Avatars.frostGuardian,
            },
            {
                id: "c2vi4",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Он сбежал! Эй ты, северянин, он был почти уничтожен!",
                avatar: Avatars.fireKing,
            },
            {
                id: "c2vi5",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "orange",
                authorPosition: 'right',
                text: "Он бы раздавил тебя, малявка. Сначала победи меня, а потом ной о своей добыче!",
                avatar: Avatars.viking,
            },
        ],
    },

    // --- ЭТАП 11: ПОСЛЕ БОЯ С ВИКИНГОМ (Присоединение) ---
    {
        id: "after_viking_battle",
        statements: [
            {
                id: "c2av1",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Ха-ха! Твое пламя греет не хуже доброго эля. Мой топор — твой!",
                avatar: Avatars.viking,
                isAvailable: () => checkProgress(2, 11)
            },
            {
                id: "c2av2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Нам пригодится твоя сила. Тот Страж точно вернется сильнее, чем был.",
                avatar: Avatars.fireKing,
            },
            {
                id: "c2av3",
                color: "green",
                text: `Получен персонаж: ${CHARACTERS.VIKING_CHARACTER.name}`,
            },
        ],
        onComplete: () => {
            const characters = usePlayerCharactersStore.getState().characters;
            const c = characters.find(char => char.key === CHARACTERS.VIKING_CHARACTER.key);
            if (c) {
                c.progression.ascension < 5 ? c.progression.ascension += 1 : usePlayerStore.getState().addBalance('gems', 20);
            } else {
                usePlayerCharactersStore.getState().addCharacter(cloneCharacter(CHARACTERS.VIKING_CHARACTER));
            }
        }
    },

    // --- ЭТАП 20: ВСТРЕЧА СО ЖРИЦЕЙ (Случайная битва) ---
    {
        id: 'water_priestess_encounter',
        statements: [
            {
                id: "c2wp1",
                author: CHARACTERS.WATER_PRIESTESS_CHARACTER.name,
                color: "blue",
                authorPosition: 'right',
                text: "Вы принесли огонь в царство покоя. Воды этого края возмущены вашим присутствием.",
                avatar: Avatars.waterPriestess,
                isAvailable: () => checkProgress(2, 20)
            },
            {
                id: "c2wp2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Мы сражаемся против Бездны! Ты на чьей стороне, женщина?",
                avatar: Avatars.warrior,
            },
            {
                id: "c2wp3",
                author: CHARACTERS.WATER_PRIESTESS_CHARACTER.name,
                color: "blue",
                authorPosition: 'right',
                text: "Я вижу, что наши намерения не совпадают. Испытайте мощь прилива!",
                avatar: Avatars.waterPriestess,
            },
        ],
    },

    // --- ЭТАП 21: ПОСЛЕ ЖРИЦЫ (Мирный уход) ---
    {
        id: 'after_water_battle',
        statements: [
            {
                id: "c2awp1",
                author: CHARACTERS.WATER_PRIESTESS_CHARACTER.name,
                color: "blue",
                authorPosition: 'right',
                text: "Достаточно. Ваша воля крепка, но ярость пламени еще погубит вас.",
                avatar: Avatars.waterPriestess,
                isAvailable: () => checkProgress(2, 21)
            },
            {
                id: "c2awp2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Скверна — вот настоящий враг. Помоги нам!",
                avatar: Avatars.fireKing,
            },
            {
                id: "c2awp3",
                author: CHARACTERS.WATER_PRIESTESS_CHARACTER.name,
                color: "blue",
                authorPosition: 'right',
                text: "Мое время еще не пришло. Ищите меня там, где реки встречаются с бездной. Прощайте.",
                avatar: Avatars.waterPriestess,
            },
        ],
    },

    // --- ЭТАП 30: СТАРЫЙ ГОЛЕМ ---
    {
        id: 'old_golem_appears',
        statements: [
            {
                id: "c2og1",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Смотрите, это же ожившая скала! Охраняет проход к пику.",
                avatar: Avatars.viking,
                isAvailable: () => checkProgress(2, 30)
            },
            {
                id: "c2og2",
                author: CHARACTERS.OLD_GOLEM_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "НАРУШИТЕЛИ... БУДУТ... РАЗДАВЛЕНЫ...",
                avatar: Avatars.oldGolem,
            },
        ],
    },

    // --- ЭТАП 40: ФИНАЛЬНЫЙ БОСС (Frost Guardian) ---
    {
        id: "frost_guardian_final",
        statements: [
            {
                id: "c2fgf1",
                author: CHARACTERS.FROST_GUARDIAN.name,
                color: "red",
                authorPosition: 'right',
                text: "СИСТЕМА ВОССТАНОВЛЕНА. ЭНЕРГИЯ БЕЗДНЫ: 100%. ПОБЕДА — ЕДИНСТВЕННЫЙ ВЫХОД.",
                avatar: Avatars.frostGuardian,
                isAvailable: () => checkProgress(2, 40)
            },
            {
                id: "c2fgf2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "В этот раз ты не сбежишь. Мы растопим твое ледяное сердце!",
                avatar: Avatars.fireKing,
            },
            {
                id: "c2fgf3",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "За Север! За победу! В атаку!",
                avatar: Avatars.viking,
            },
        ],
    },

    // --- КОНЕЦ ГЛАВЫ (Переход к Главе 3) ---
    {
        id: "chapter2_end",
        statements: [
            {
                id: "c2end1",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Все кончено. Страж пал, но Бездна успела заразить эти земли слишком глубоко.",
                avatar: Avatars.fireKing,
                isAvailable: () => checkProgress(3, 1)
            },
            {
                id: "c2end2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Видите эти кристаллы, прорастающие сквозь лед? Они зовут нас на восток.",
                avatar: Avatars.warrior,
            },
            {
                id: "c2end3",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Долина Кристаллов... опасное место. Но с таким костром, как ты, Игнис, я не пропаду!",
                avatar: Avatars.viking,
            },
            {
                id: "c2end4",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Держим путь в Долину. Нужно найти Акари до того, как Бездна поглотит её.",
                avatar: Avatars.fireKing,
            },
        ],
    },
];