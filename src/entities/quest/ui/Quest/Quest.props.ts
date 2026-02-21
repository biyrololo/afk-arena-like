import type { IQuest } from "../../model/quest.model";

export interface IQuestProps {
    quest: IQuest;
    onComplete: () => void;
    completed: boolean;
}