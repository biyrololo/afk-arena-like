import type { IconKey } from "@/shared/icons";
import type { Character } from "@/shared/types/character";
import type { JSX } from "react";

export interface IQuest {
    id: string;
    title: string | JSX.Element;
    reward: IconKey;
    rewardRarity: Character.Rarity;
    count?: number;
    getProgressText: () => string;
    getProgress: () => number;
    onClaim: () => void;
}