import type { FC } from "react";
import type { DailyRewardProps } from "./DailyReward.props";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import classNames from "classnames";
import styles from './DailyReward.module.css'

export const DailyReward: FC<DailyRewardProps> = ({
    dailyReward,
    claimed,
    available,
    className,
    onClick
}) => {
    return (
        <div className={
            classNames(`flex flex-col gap-4 shrink-0 items-center p-3 pb-6 rounded-2xl border-4
            ${available ? 'bg-[#3bae44] border-[#48de70] scale-110 cursor-pointer hover:scale-105 duration-100 ' + styles.greenGlow :
                    claimed ? 'bg-[#5599c0] border-[#457a98]' :
                        dailyReward.day % 7 === 0 ? 'bg-rose-800/80 border-rose-500 opacity-90' :
                            'bg-gray-600/80 border-gray-500 opacity-90'}
            `, className)
        } onClick={onClick}>
            <div className="text-white text-shadow-[0px_0px_2px_black] text-2xl text-center"
                style={{ color: available || claimed ? '#F5F7FF' : '#c9c9c9' }}
            >
                День {dailyReward.day}
            </div>
            <div className="rounded-2xl border-4 aspect-square w-[140px] h-[140px] flex items-center justify-center relative"
                style={{
                    borderColor: getRarityColor(dailyReward.rarity),
                    backgroundColor: `${getRarityColor(dailyReward.rarity)}77`
                }}
            >
                <Icon icon={dailyReward.icon} size={100} />
                {
                    Boolean(dailyReward.count) && (
                        <span
                            className="absolute left-1 top-1 text-white text-shadow-[0px_0px_2px_black] text-2xl"
                        >x{dailyReward.count}</span>
                    )
                }
            </div>
            {available && <span className="text-white text-shadow-[0px_0px_2px_black] text-2xl">Сегодня</span>}
            {claimed && <span className="text-green-400 text-shadow-[0px_0px_2px_black] text-2xl">Получено</span>}
            {!available && <span className="text-red-400 text-shadow-[0px_0px_2px_black] text-2xl"></span>}
        </div>
    )
}