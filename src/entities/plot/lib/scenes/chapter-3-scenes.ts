import * as CHARACTERS from "@/entities/character/lib/allCharacters";
import kitsune_appear from '@/assets/scenes/kitsune_appear.webp'
import kitsune_before_battle from '@/assets/scenes/kitsune_before_battle.webp'
import kitsune_escape from '@/assets/scenes/kitsune_escape.webp'
import spearwoman_appear from '@/assets/scenes/spearwoman_appear.webp'
import spearwoman_heal from '@/assets/scenes/spearwoman_heal.webp'
import crystalKing_rage from '@/assets/scenes/crystalKing_rage.webp'
import chapter_3_final from '@/assets/scenes/chapter_3_final.webp'
import womanwarrior_appear from '@/assets/scenes/womanwarrior_appear.webp'
import womanwarrior_lose from '@/assets/scenes/womanwarrior_lose.webp'
import firewarrior_appear from '@/assets/scenes/firewarrior_appear.webp'

const checkProgress = (chapter: number, stage: number) => {
    const { chapterNumber, stageNumber } = usePlayerStore.getState()
    return chapterNumber === chapter && stageNumber === stage;
}

// ======================
// SCENES CHAPTER 3: Кристальная блокада (80 этапов)
// ======================

import type { IPlotScene } from "../plot.model";
import { Avatars } from "@/shared/avatars";
import { usePlayerStore } from "@/entities/player/model/player.store";

export const CHAPTER_3_SCENES: IPlotScene[] = [
    // --- ЭТАП 1: ПЕРЕД БОЕМ С МАРОДЕРАМИ ---
    {
        id: "chapter3_start",
        statements: [
            {
                id: "c3s1",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Стоять! Эта территория теперь под нашим владением. Сдавайте ценности, пока не поздно.",
                avatar: Avatars.metalBladekeeper,
                isAvailable: () => checkProgress(3, 2)
            },
            {
                id: "c3s2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Что вы делаете? Вы просто забираете последнее у тех, кто и так всё потерял!",
                avatar: Avatars.warrior,
            },
            {
                id: "c3s3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Мир меняется, но жадность остается прежней. Мы не отдадим вам ничего, проваливайте!",
                avatar: Avatars.fireKing,
            },
            {
                id: "c3s4",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Тогда мы заберем его сами. Рыцари, окружить их!",
                avatar: Avatars.metalBladekeeper,
            },
        ],
    },

    // --- ЭТАП 2: ПОСЛЕ БОЯ С МАРОДЕРАМИ ---
    {
        id: "after_bladekeeper",
        statements: [
            {
                id: "c3ab1",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Агх... это еще не конец! Орден запомнит ваше лицо, Игнис!",
                avatar: Avatars.metalBladekeeper,
                isAvailable: () => checkProgress(3, 3)
            },
            {
                id: "c3ab2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Пусть бегут. У нас есть дела поважнее, чем споры с разбойниками в доспехах.",
                avatar: Avatars.warrior,
            },
        ],
    },

    // --- ЭТАП 20: ПЕРЕД БОЕМ С АКАРИ ---
    {
        id: 'akari_encounter',
        statements: [
            {
                id: "c3ar1",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "purple",
                authorPosition: 'right',
                text: "Свет... он ослепляет... Тьма кажется такой спокойной... Уходите, пока она не поглотила и вас!",
                avatar: Avatars.spearwoman,
                isAvailable: () => checkProgress(3, 20),
                backgroundImage: spearwoman_appear
            },
            {
                id: "c3ar2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Акари, приди в себя!",
                avatar: Avatars.warrior,
                backgroundImage: spearwoman_appear
            },
            {
                id: "c3ar3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Игнис, её взгляд пустой, скверна уже завладела ей!",
                avatar: Avatars.warrior,
                backgroundImage: spearwoman_appear
            },
            {
                id: "c3ar4",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Я вижу это. Но ещё не слишком поздно! Мы можем её спасти, но сначала придется успокоить её.",
                avatar: Avatars.fireKing,
                backgroundImage: spearwoman_appear
            },
        ],
    },

    // --- ЭТАП 21: ПОСЛЕ БОЯ С АКАРИ (Очищение) ---
    {
        id: "after_akari_rescue",
        statements: [
            {
                id: "c3ara4",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Сейчас, подходящий момент! Огонь, очисти её разум от теней!",
                avatar: Avatars.fireKing,
                isAvailable: () => checkProgress(3, 21),
                backgroundImage: spearwoman_heal
            },
            {
                id: "c3ara5",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Ох... словно пробуждение от долгого сна. Мой разум был в ледяных оковах... Кажется, я прихожу в себя!",
                avatar: Avatars.spearwoman,
                backgroundImage: spearwoman_heal
            },
            {
                id: "c3ara6",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Зефирос... Повелитель здешних земель... он полностью поддался искажению, а потом сразил и меня. Он перекрыл путь к Столице!",
                avatar: Avatars.spearwoman,
                backgroundImage: spearwoman_heal
            },
            {
                id: "c3ara7",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Значит, слухи верны. Нам придется идти в обход через Междуземье после того, как разберемся здесь.",
                avatar: Avatars.warrior,
                backgroundImage: spearwoman_heal
            }
        ],
    },

    // --- ЭТАП 35: ПЕРЕД БОЕМ С КИЦУНЭ ---
    {
        id: 'kitsune_encounter',
        statements: [
            {
                id: "c3k1",
                author: CHARACTERS.KITSUNE_CHARACTER.name,
                color: "orange",
                authorPosition: 'right',
                text: "Милые путники, не желаете ли вы немного помощи? Кристаллы могут быть очень коварными, а я знаю тайные тропы.",
                avatar: Avatars.kitsune,
                backgroundImage: kitsune_appear,
                isAvailable: () => checkProgress(3, 35)
            },
            {
                id: "c3k2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Допустим. А у тебя какие цели?",
                avatar: Avatars.fireKing,
                backgroundImage: kitsune_appear,
            },
            {
                id: "c3k3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "В её словах слишком много фальши. Игнис, будь начеку, я чувствую подвох.",
                avatar: Avatars.warrior,
                backgroundImage: kitsune_appear,
            },
            {
                id: "c3k4",
                author: CHARACTERS.KITSUNE_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Какая проницательность! Но поздно — вы уже в моей ловушке, нужно было действовать быстрее!",
                avatar: Avatars.kitsune,
                backgroundImage: kitsune_before_battle,
            },
            {
                id: "c3k5",
                author: CHARACTERS.KITSUNE_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Посмотрим, как вы справитесь с моими иллюзиями!",
                avatar: Avatars.kitsune,
                backgroundImage: kitsune_before_battle,
            },
        ],
    },

    // --- ЭТАП 36: ПОСЛЕ БОЯ С КИЦУНЭ ---
    {
        id: 'after_kitsune',
        statements: [
            {
                id: "c3ka3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Держите её! У неё заканчиваются силы на магию!",
                avatar: Avatars.fireKing,
                backgroundImage: kitsune_escape,
                isAvailable: () => checkProgress(3, 36)
            },
            {
                id: "c3ka4",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Она исчезла! Только лепестки в воздухе... Хитрый лис, она использовала нас, чтобы проверить наши силы!",
                avatar: Avatars.viking,
                backgroundImage: kitsune_escape,
            },
            {
                id: "c3ka5",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Она ушла с помощью магии. Нам нельзя расслабляться, она может в любой момент вернуться.",
                avatar: Avatars.warrior,
                backgroundImage: kitsune_escape,
            },
        ],
    },

    // --- ЭТАП 50: ПЕРЕД БОЕМ С ВОИТЕЛЬНИЦЕЙ ---
    {
        id: 'woman_warrior_encounter',
        statements: [
            {
                id: "c3ww1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Ни шагу дальше! Мы защищаем рубеж Столицы. Весь остальной мир уже поглощен скверной, и мы не впустим её сюда!",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(3, 50),
                backgroundImage: womanwarrior_appear,
            },
            {
                id: "c3ww2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Остановитесь! Мы пришли из тех земель, и они еще сражаются! Вас обманули!",
                avatar: Avatars.warrior,
                backgroundImage: womanwarrior_appear,
            },
            {
                id: "c3ww3",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Хранитель Зефирос рассказал всё: снаружи не осталось ничего живого. Вы — лишь тени. В бой, рыцари!",
                avatar: Avatars.womanWarrior,
                backgroundImage: womanwarrior_appear,
            },
        ],
    },

    // --- ЭТАП 51: ПОСЛЕ БОЯ С ВОИТЕЛЬНИЦЕЙ ---
    {
        id: 'after_woman_warrior',
        statements: [
            {
                id: "c3wwj1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Вы... вы действительно не из бездны. Зефирос... он солгал нам, чтобы мы не покидали пост?",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(3, 51),
                backgroundImage: womanwarrior_lose,
            },
            {
                id: "c3wwj2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Его разум захвачен, он видит мир через призму бездны. Столица вот-вот падет под натиском чудовищ, пока вы стоите здесь.",
                avatar: Avatars.fireKing,
                backgroundImage: womanwarrior_lose,
            },
            {
                id: "c3wwj3",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Если Столица в опасности, я должна быть там! Я провожу вас до центральных врат, чтобы искупить свою вину!",
                avatar: Avatars.womanWarrior,
                backgroundImage: womanwarrior_lose,
            },
        ],
    },

    // --- ЭТАП 65: ПЕРЕД БОЕМ С БРАННОМ ---
    {
        id: 'firewarrior_rematch',
        statements: [
            {
                id: "c3fc1",
                author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: "right",
                text: "Игнис! Моя сила стала еще ярче. Я кое-чему научился, пока ты сбегал! Узри мою мощь!",
                avatar: Avatars.firewarrior,
                isAvailable: () => checkProgress(3, 65),
                backgroundImage: firewarrior_appear,
            },
            {
                id: "c3fc2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Бранн, сейчас не время для поединков! Земля содрогается, ты разве не чувствуешь?",
                avatar: Avatars.warrior,
                backgroundImage: firewarrior_appear,
            },
        ],
    },

    // --- ЭТАП 66: ПОСЛЕ БОЯ С БРАННОМ (Вторжение) ---
    {
        id: 'firewarrior_escape',
        statements: [
            {
                id: "c3fc3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Смотрите! На горизонте целая лавина чудовищ! Они наступают!",
                avatar: Avatars.warrior,
                isAvailable: () => checkProgress(3, 66)
            },
            {
                id: "c3fc4",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Их слишком много даже для нас! Нужно отходить к кристальным пикам!",
                avatar: Avatars.viking,
            },
            {
                id: "c3fc5",
                author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: "right",
                text: "Ха! Тьма сама дает мне шанс уйти. Это знак! Моя мощь растет с каждым днём!",
                avatar: Avatars.firewarrior,
            },
            {
                id: "c3fc6",
                author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: "right",
                text: "Наслаждайтесь своим спасением, пока можете!",
                avatar: Avatars.firewarrior,
            },
        ],
    },

    // --- ЭТАП 80: ПЕРЕД ФИНАЛЬНЫМ БОЕМ (Зефирос) ---
    {
        id: "crystal_king_encounter",
        statements: [
            {
                id: "c3ck1",
                author: CHARACTERS.CRYSTAL_KING.name,
                color: "red",
                authorPosition: 'right',
                text: "Путники. Ваше путешествие закончилось здесь. Было ошибкой приходить сюда...",
                avatar: Avatars.crystalKing,
                isAvailable: () => checkProgress(3, 80),
                backgroundImage: crystalKing_rage,
            },
            {
                id: "c3ck2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Ты ответишь за то, что пропустил их! Попробуй остановить моё пламя!",
                avatar: Avatars.fireKing,
                backgroundImage: crystalKing_rage,
            },
        ],
    },

    // --- КОНЕЦ ГЛАВЫ (После победы над Зефиросом) ---
    {
        id: "chapter3_end",
        statements: [
            {
                id: "c3end1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                text: "Барьер исчез... Но я вижу дым над Столицей! Я должна идти к своим людям на помощь.",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(4, 1),
                backgroundImage: chapter_3_final,
            },
            {
                id: "c3end2",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                text: "Береги город. А мы отправимся другой дорогой - в Междуземье. Там нужно встретиться с моим союзником, если он ещё держится.",
                avatar: Avatars.spearwoman,
                backgroundImage: chapter_3_final,
            },
            {
                id: "c3end3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Путь будет непростым, но мы уже зашли слишком далеко, чтобы отступать.",
                avatar: Avatars.warrior,
                backgroundImage: chapter_3_final,
            },
        ],
    },
];