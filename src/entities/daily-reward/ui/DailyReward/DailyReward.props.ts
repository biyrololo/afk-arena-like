import type { IDailyReward } from "../../model/daily-reward.model";

export interface DailyRewardProps {
    dailyReward: IDailyReward;
    claimed: boolean;
    available: boolean;
}