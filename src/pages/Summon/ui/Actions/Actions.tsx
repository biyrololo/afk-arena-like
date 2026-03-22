import type { FC } from "react";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { Icon } from "@/shared/ui/Icon/Icon";
import type { PlayerBalances } from "@/entities/player/model/player.model";


export const Actions: FC<{
    summon: (amount: 1 | 10) => void;
    valute: keyof PlayerBalances;
    bannerId: string;
}> = ({ summon, bannerId, valute }) => {
    const balances = usePlayerStore(useShallow(state => state.balances))

    const summons = balances[valute];

    const manyCost = bannerId === 'all' ? 8 : 10;

    return (
        <section
            className="absolute bottom-10 right-10 flex gap-10"
        >
            <button
                tabIndex={-1}
                className="bg-blue-500 flex items-center gap-4 hover:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded disabled:opacity-50"
                disabled={summons < 1}
                onClick={() => summon(1)}
            >
                Призвать 1 - 1
                <Icon icon={valute} />
            </button>
            <button
                tabIndex={-1}
                className="bg-blue-500 flex items-center gap-4 hover:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded disabled:opacity-50"
                disabled={summons < manyCost}
                onClick={() => summon(10)}
            >
                Призвать 10 -
                {
                    manyCost !== 10 ? (
                        <>
                            <span className="text-white text-3xl">{manyCost}</span>
                            <span className="line-through text-base opacity-50">10</span>
                        </>
                    ) : (
                        <span className="text-white">{manyCost}</span>
                    )
                }
                <Icon icon={valute} />
            </button>
        </section>
    )
}