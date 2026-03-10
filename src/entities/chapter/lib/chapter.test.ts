import { calculateStatsWithEquipment } from "@/shared/types/develop";
import type { IChapter, IStage } from "./chapter.model";

export const testChapter = (chapter: IChapter) => {
    console.clear();
    console.log(`Testing chapter: ${chapter.name}`)
    const sum = (stage: IStage) => {
        return stage
            .enemies
            .filter(e => e !== undefined)
            .map(e => calculateStatsWithEquipment(e))
            .reduce((acc, e) => acc + e.power, 0)
    }

    for(let i = 1; i < chapter.stages.length; i++) {
        if(sum(chapter.stages[i]) <= sum(chapter.stages[i - 1])) {
            console.error(`Stage ${chapter.stages[i].stageNumber}: ${sum(chapter.stages[i])} is weaker than stage ${chapter.stages[i - 1].stageNumber}: ${sum(chapter.stages[i - 1])}`);
        } else {
            console.log(`Stage ${chapter.stages[i].stageNumber}: ${sum(chapter.stages[i])} is stronger than stage ${chapter.stages[i - 1].stageNumber}: ${sum(chapter.stages[i - 1])}`);
        }
    }
}