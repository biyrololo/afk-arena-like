import { type IChapter } from "./chapter.model";
// import { testChapter } from "./chapter.test";

import { CHAPTER_1_STAGES } from "./stages/chapter-1-stages";
import { CHAPTER_2_STAGES } from "./stages/chapter-2-stages";
import { CHAPTER_3_STAGES } from "./stages/chapter-3-stages";
import { SURVIVAL_1_CHAPTERS } from "./stages/survival-1-stages";
import { SURVIVAL_2_CHAPTERS } from "./stages/survival-2-stages";
import { usePlayerStore } from "@/entities/player/model/player.store";

export const CHAPTERS: IChapter[] = [
  {
    name: "Глава 1 - Далёкое королевство",
    chapterNumber: 1,
    stages: CHAPTER_1_STAGES,
  },
  {
    name: "Глава 2 - Ледяная пустошь",
    chapterNumber: 2,
    stages: CHAPTER_2_STAGES,
  },
  {
    name: "Глава 3 - Кристальная столица",
    chapterNumber: 3,
    stages: CHAPTER_3_STAGES,
  },
]

const SURVIVAL_CHAPTERS = [
  SURVIVAL_1_CHAPTERS,
  SURVIVAL_2_CHAPTERS,
  SURVIVAL_2_CHAPTERS,
]

export const getSurvivalChapters = () => {
  const chapterNumber = usePlayerStore.getState().chapterNumber;
  return SURVIVAL_CHAPTERS[chapterNumber - 1];
}

// testChapter(CHAPTERS[0])

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
