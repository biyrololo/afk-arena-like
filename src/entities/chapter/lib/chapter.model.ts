import type { PlayerBalances } from "@/entities/player/model/player.model";
import type { Character } from "@/shared/types/character";
import type { PlayerCharacterWithState } from "@/shared/types/PlayerCharacter";

export interface IStageReward {
  balances: PlayerBalances;
  equipment: Character.Equipment[];
}

export enum StageTypeEnum {
  SURVIVAL = "survival",
  COMBAT = "combat",
}

export interface IStage {
  chapterNumber: number;
  stageNumber: number;

  background: string;
  ost?: string;
  enemies: (PlayerCharacterWithState | undefined)[];
  rewards: IStageReward;
  type?: StageTypeEnum;
}

export interface IChapter {
  name: string;
  chapterNumber: number;
  stages: IStage[];
}
