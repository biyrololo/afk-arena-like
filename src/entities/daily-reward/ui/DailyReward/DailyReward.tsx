import type { FC } from "react";
import type { DailyRewardProps } from "./DailyReward.props";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";

export const DailyReward: FC<DailyRewardProps> = ({
    dailyReward,
    claimed,
    available
}) => {
    return (
        <div className={
            `flex flex-col gap-4 shrink-0 items-center p-4 pb-8 rounded-2xl border-4
            ${available ? 'bg-amber-500/50 border-amber-400' : 
                claimed ? 'bg-green-500/50 border-green-400' :
                'bg-sky-900/80 border-sky-800'}
            `
        }>
            <div className="text-white text-shadow-[0px_0px_2px_black] text-2xl text-center">
                День {dailyReward.day}
            </div>
            <div className="rounded-2xl border-4 aspect-square w-[100px] h-[100px] flex items-center justify-center relative"
            style={{
                borderColor: getRarityColor(dailyReward.rarity),
                backgroundColor: `${getRarityColor(dailyReward.rarity)}77`
            }}
            >
                <Icon icon={dailyReward.icon} size={70} />
                {
                    Boolean(dailyReward.count) && (
                        <span
                        className="absolute left-1 top-1 text-white text-shadow-[0px_0px_2px_black] text-base"
                        >x{dailyReward.count}</span>
                    )
                }
            </div>
        </div>
    )
}