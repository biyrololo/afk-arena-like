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
            `flex flex-col gap-4 shrink-0 items-center p-3 pb-6 rounded-2xl border-4
            ${available ? 'bg-[#ffb454]/70 border-[#ffb454] scale-110' :
                claimed ? 'bg-[#5599c0]/50 border-[#5599c0]' :
                    dailyReward.day % 7 === 0 ? 'bg-rose-800/80 border-rose-500 opacity-70' :
                        'bg-gray-600/80 border-gray-500 opacity-60'}
            `
        }>
            <div className="text-white text-shadow-[0px_0px_2px_black] text-2xl text-center"
                style={{ color: '#F5F7FF' }}
            >
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
            {available && <span className="text-white text-shadow-[0px_0px_2px_black] text-2xl">Сегодня</span>}
        </div>
    )
}