import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { PlayerBalances } from "./player.model";

interface PlayerStore {
    balances: PlayerBalances;
    chapterNumber: number;
    stageNumber: number;
    setBalances: (balances: PlayerBalances) => void;
    setChapterNumber: (chapterNumber: number) => void;
    setStageNumber: (stageNumber: number) => void;
}

export const usePlayerStore = create<PlayerStore>()(
    devtools(
        subscribeWithSelector(
            (set, get) => ({
                balances: {
                    gold: 1e6,
                    gems: 1e6,
                    summons: 1000
                },
                chapterNumber: 1,
                stageNumber: 1,
                setChapterNumber: (chapterNumber: number) => set(() => ({ chapterNumber })),
                setStageNumber: (stageNumber: number) => set(() => ({ stageNumber })),
                setBalances: (balances: PlayerBalances) => set(() => ({ balances }))
            })
        ),
        {
            name: 'player-store'
        }
    )
)