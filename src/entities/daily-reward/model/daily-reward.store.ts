import { Character } from "@/shared/types/character";
import type { IDailyReward } from "./daily-reward.model";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export const getDailyRewards = (): IDailyReward[] => { 
    return Array.from({
        length: 21
    }).map((_, index) => {
        return {
            icon: 'gems',
            rarity: Character.Rarity.EPIC,
            count: 100 + index,
            day: index + 1,
            onClaim: () => {
                usePlayerStore.getState().addBalance('gems', 100 + index);
            }
        }
    })
}

interface IDailyRewardsStore {
    currentDay: number;
    lastClaimedAt: string; // Date ISO string
    isOpenedModal: boolean;
    setIsOpenedModal: (isOpened: boolean) => void;
    claimToday: () => void;
    setLastClaimedAt: (date: string) => void;
    setCurrentDay: (day: number) => void;
}

export const useDailyRewardsStore = create<IDailyRewardsStore>()(
    devtools(
        subscribeWithSelector((set, get) => ({   
            currentDay: 2,
            lastClaimedAt: new Date(Date.now() - 86400000).toISOString(),
            isOpenedModal: false,
            setIsOpenedModal: (isOpened: boolean) => {
                set(() => ({ isOpenedModal: isOpened }), false, "setIsOpenedModal");
            },
            claimToday: () => {
                const day = get().currentDay;
                const date = new Date();
                date.setHours(23, 59, 59, 999);
                set({ lastClaimedAt: date.toISOString(), currentDay: day + 1 }, false, "claimToday");
            },
            setLastClaimedAt: (date: string) => {
                set(() => ({ lastClaimedAt: date }), false, "setLastClaimedAt");
            },
            setCurrentDay: (day: number) => {
                set(() => ({ currentDay: day }), false, "setCurrentDay");
            },
        }))   
    )
)