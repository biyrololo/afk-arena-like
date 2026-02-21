import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { PlayerBalances } from "./player.model";

export type SquadMember = (string | null);
export type SquadList = [(string | null), (string | null), (string | null), (string | null)];

interface PlayerStore {
    balances: PlayerBalances;
    chapterNumber: number;
    stageNumber: number;
    assetsLoaded: boolean;
    lastSquad: SquadList;
    setLastSquad: (lastSquad: SquadList) => void;
    setBalances: (balances: PlayerBalances) => void;
    setChapterNumber: (chapterNumber: number) => void;
    setStageNumber: (stageNumber: number) => void;
    setAssetsLoaded: (assetsLoaded: boolean) => void;
    spend: (key: keyof PlayerBalances, amount: number) => void;
    addBalance: (key: keyof PlayerBalances, amount: number) => void;
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
                assetsLoaded: false,
                lastSquad: [null, null, null, null],
                setLastSquad: (lastSquad: [(string | null), (string | null), (string | null), (string | null)]) => set(() => ({ lastSquad })),
                setAssetsLoaded: (assetsLoaded: boolean) => set(() => ({ assetsLoaded })),
                setChapterNumber: (chapterNumber: number) => set(() => ({ chapterNumber })),
                setStageNumber: (stageNumber: number) => set(() => ({ stageNumber })),
                setBalances: (balances: PlayerBalances) => set(() => ({ balances })),
                spend: (key: keyof PlayerBalances, amount: number) => set((state) => {
                    if(state.balances[key] < amount) {
                        throw new Error(`Not enough ${key}: ${state.balances[key]} < ${amount}`);
                    }
                    return { balances: { ...state.balances, [key]: state.balances[key] - amount } }
                }),
                addBalance: (key: keyof PlayerBalances, amount: number) => set((state) => ({ balances: { ...state.balances, [key]: state.balances[key] + amount } })),
            })
        ),
        {
            name: 'player-store'
        }
    )
)