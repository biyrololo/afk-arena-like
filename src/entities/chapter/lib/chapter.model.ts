import type { PlayerBalances } from "@/entities/player/model/player.model";
import type { Character } from "@/shared/types/character";

export interface IStageReward {
    balances: PlayerBalances;
    equipment: Character.Equipment[];
}

export interface IStage {
    chapterNumber: number;
    stageNumber: number;

    background: string;
    enemies: Character.Character[];
    rewards: IStageReward;
}

export interface IChapter {
    name: string;
    chapterNumber: number;
    stages: IStage[];
}