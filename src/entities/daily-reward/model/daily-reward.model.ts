import type { IconKey } from "@/shared/icons";
import type { Character } from "@/shared/types/character";

export interface IDailyReward {
    icon: IconKey;
    rarity: Character.Rarity;
    count: number;
    day: number;
    onClaim: () => void;
}