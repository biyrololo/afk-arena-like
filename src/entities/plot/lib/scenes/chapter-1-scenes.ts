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
// SCENES CHAPTER 1
// ======================

export const CHAPTER_1_SCENES: IPlotScene[] = [
  {
    id: "chapter1_start",
    statements: [
      {
        id: "c1s1",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Недавно открылся портал в бездну. И оттуда хлынули монстры",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1s2",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Теперь они оттуда распространяются по всему миру",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1s3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Вот и слизни.. Как их много. Сначала надо разобраться с ними",
        avatar: Avatars.fireKing,
      },
    ],
  },
  {
    id: 'warrior_appears',
    statements: [
      {
        id: "c1w1",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "А это кто? Неужели она тоже поражена бездной?",
        avatar: Avatars.fireKing,
        isAvailable: () => checkProgress(1, 3)
      },
      {
        id: "c1w2",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "orange",
        authorPosition: 'right',
        text: "Ещё один монстр из бездны?",
        avatar: Avatars.warrior,
      },
      {
        id: "c1w3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Ты ошибаешься, я борюсь с бездной!",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1w4",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "orange",
        authorPosition: 'right',
        text: "Я помню такую силу только от монтсров бездны",
        avatar: Avatars.warrior,
      },
      {
        id: "c1w5",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "orange",
        authorPosition: 'right',
        text: "Приготовься к битве",
        avatar: Avatars.warrior,
      },
    ],
  },
  {
    id: "after_warrior_battle",
    statements: [
      {
        id: "c1aw1",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Ты действительно не из бездны",
        avatar: Avatars.warrior,
        isAvailable: () => checkProgress(1, 4)
      },
      {
        id: "c1aw2",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Я сражаюсь с бездной",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1aw3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Бездна становится сильнее каждый день, но и мои способности увеличиваются",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1aw4",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Почему твоя сила похожа на неё?",
        avatar: Avatars.warrior,
      },
      {
        id: "c1aw5",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Я уверен, что причина - в открытом портале",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1aw6",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Если бездна дошла в наш далекий регион, значит, нужно торопиться",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1aw7",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Нужно отправляться в снежный регион",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1aw8",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "У нас одна цель. Я буду сражаться вместе с тобой",
        avatar: Avatars.warrior,
      },
      {
        id: "c1aw9",
        color: "green",
        text: `Получен персонаж: ${CHARACTERS.WARRIOR_CHARACTER.name}`,
      },
    ],
    onComplete: () => {
      const characters = usePlayerCharactersStore.getState().characters;

      const c = characters.find(char => char.key === CHARACTERS.WARRIOR_CHARACTER.key);
      if (c) {
        if (c.progression.ascension < 5) {
          c.progression.ascension += 1;
        } else {
          usePlayerStore.getState().addBalance('gems', 20)
        }
      } else {
        usePlayerCharactersStore.getState().addCharacter(cloneCharacter(CHARACTERS.WARRIOR_CHARACTER));
      }
    }
  },
  {
    id: 'chapter1_mid',
    statements: [
      {
        id: "c1mid1",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Надо же. Чем ближе мы к бездне, тем сильнее монстры встречаются",
        avatar: Avatars.fireKing,
        isAvailable: () => checkProgress(1, 9)
      },
      {
        id: "c1mid2",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Но и мы не отстаём по силе",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1mid3",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Надо не забывать улучшать наше снаряжение",
        avatar: Avatars.warrior,
      },
      {
        id: "c1mid4",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Без него будет тяжко",
        avatar: Avatars.warrior,
      },
    ],
  },
  {
    id: 'chapter1_orden_appears',
    statements: [
      {
        id: "c1oa1",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Это же рыцари из Ордена!",
        avatar: Avatars.warrior,
        isAvailable: () => checkProgress(1, 13)
      },
      {
        id: "c1oa2",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Неужели они решили, что мы подходящие противники",
        avatar: Avatars.warrior,
      },
      {
        id: "c1oa3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Тогда им лучше приготовиться к поражению",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1oa4",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Они знали, на что идут",
        avatar: Avatars.fireKing,
      },
    ],
  },

  {
    id: "fire_warrior_appears",
    statements: [
      {
        id: "c1fw1",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Я знал, что найду тебя здесь.",
        avatar: Avatars.firewarrior,
        isAvailable: () => checkProgress(1, 20)
      },
      {
        id: "c1fw2",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        text: "Кто это ещё?",
        avatar: Avatars.warrior,
      },
      {
        id: "c1fw3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Старый союзник… или уже нет.",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1fw4",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Твои способности увеличиваются при усилении бездны",
        avatar: Avatars.firewarrior,
      },
      {
        id: "c1fw5",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Значит, и ты ей поражён. Вы должны быть уничтожены",
        avatar: Avatars.firewarrior,
      },
    ],
  },
  {
    id: "after_fire_warrior_battle",
    statements: [
      {
        id: "c1afw1",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Хм… Я недооценил вас",
        avatar: Avatars.firewarrior,
        isAvailable: () => checkProgress(1, 21)
      },
      {
        id: "c1afw2",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Но не думай, что ты победил. Я ещё не закончил",
        avatar: Avatars.firewarrior,
      },
      {
        id: "c1afw3",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Скверна тянется к твоей силе. Берегись её",
        avatar: Avatars.firewarrior,
      },
      {
        id: "c1afw4",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "Мы ещё встретимся, когда я буду способен вас уничтожить",
        avatar: Avatars.firewarrior,
      },
      {
        id: "c1afw5",
        author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
        color: "red",
        authorPosition: "right",
        text: "А пока прощайте",
        avatar: Avatars.firewarrior,
      },
      {
        id: "c1afw6",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        text: "Ты дашь ему уйти?",
        avatar: Avatars.warrior,
      },
      {
        id: "c1afw7",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Пусть бежит. Его ярость — это лишь страх перед тем, что грядет",
        avatar: Avatars.fireKing,
      },
    ],
  },
  {
    id: "chapter1_end",
    statements: [
      {
        id: "c1end1",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        text: "Это же был один из древних стражей",
        avatar: Avatars.warrior,
        isAvailable: () => checkProgress(2, 1)
      },
      {
        id: "c1end2",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Они уже долгое время были в отключке",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1end3",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Бездна снова запустила их и поставила на стражу своих рубежей",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1end4",
        author: CHARACTERS.WARRIOR_CHARACTER.name,
        color: "green",
        authorPosition: "right",
        text: "Если древние стражи пробудились… значит вблизи бездны уже всё уничтожено",
        avatar: Avatars.warrior,
      },
      {
        id: "c1end5",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Как бы то ни было, теперь путь на Север открыт!",
        avatar: Avatars.fireKing,
      },
      {
        id: "c1end6",
        author: CHARACTERS.FIRE_KING_CHARACTER.name,
        color: "green",
        text: "Мы стали ещё ближе к Центру",
        avatar: Avatars.fireKing,
      },
    ],
  },
];