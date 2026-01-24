import { usePlayerStore } from "@/entities/player/model/player.store";
import { Icon } from "@/shared/ui/Icon/Icon";
import type { FC } from "react";
import { useShallow } from "zustand/shallow";

export const Balances: FC = () => {
    const balances = usePlayerStore(
        useShallow(state => state.balances)
    )

    return (
        <section className="absolute top-4 right-4 flex gap-20 grid-cols-3 bg-amber-800 p-4 rounded-lg">
            <span className="text-white text-2xl font-bold flex items-center gap-2">
                {balances.gold} <Icon icon="gold" />
            </span>
            <span className="text-white text-2xl font-bold flex items-center gap-2">
                {balances.gems} <Icon icon="gems" />
            </span>
            <span className="text-white text-2xl font-bold flex items-center gap-2">
                {balances.summons} <Icon icon="summon" />
            </span>
        </section>
    )
}