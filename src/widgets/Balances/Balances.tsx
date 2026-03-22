import { usePlayerStore } from "@/entities/player/model/player.store";
import { useSmoothCounter } from "@/shared/hooks/useSmoothCounter";
import { Icon } from "@/shared/ui/Icon/Icon";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const Balances: FC = () => {
    const navigate = useNavigate();

    const balances = usePlayerStore(
        useShallow(state => state.balances)
    )

    const goToShop = () => {
        navigate("/shop");
    };

    const animatedGold = useSmoothCounter(balances.gold, { speed: 25 });
    const animatedGems = useSmoothCounter(balances.gems, { speed: 25 });

    return (
        <section className="absolute top-4 right-4 flex gap-20 grid-cols-3 bg-amber-800 p-4 rounded-lg z-50">
            <span className="text-white text-2xl font-bold flex items-center gap-2 min-w-[200px] justify-between">
                <div onClick={goToShop} className="text-white text-4xl font-bold bg-amber-400 aspect-square size-10 rounded-md flex items-center justify-center cursor-pointer">+</div>
                {animatedGold} <Icon icon="gold" />
            </span>
            <span className="text-white text-2xl font-bold flex items-center gap-2 min-w-[200px] justify-between">
                <div onClick={goToShop} className="text-white text-4xl font-bold bg-amber-400 aspect-square size-10 rounded-md flex items-center justify-center cursor-pointer">+</div>
                {animatedGems} <Icon icon="gems" />
            </span>
        </section>
    )
}