import { Character } from "@/shared/types/character";
import type { IDailyReward } from "./daily-reward.model";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { PlayerBalances } from "@/entities/player/model/player.model";


export const getDailyRewards = (): IDailyReward[] => {
    const cycleIndex = Math.floor(useDailyRewardsStore.getState().currentDay / 21);

    // Определяем "Настроение" цикла на 21 день
    // 0: Алмазный шторм (больше гемов)
    // 1: Призыв титанов (больше свитков)
    // 2: Золотая лихорадка (огромные куши золота)
    const currentCycleType = cycleIndex % 3;

    return Array.from({ length: 21 }).map((_, index) => {
        const day = index + 1;
        let type: keyof PlayerBalances = 'gems';
        let count = 0;
        let rarity = Character.Rarity.RARE;

        if (day === 1) {
            type = 'summonsSpecial';
            count = 10;
            rarity = Character.Rarity.LEGENDARY;
        } else
            // --- ЛОГИКА ГЛАВНЫХ ПРИЗОВ (Дни 7, 14, 21) ---
            if (day === 21) {
                type = 'summonsSpecial';
                count = 30; // Всегда десятка в конце
                rarity = Character.Rarity.LEGENDARY;
            }
            else if (day === 7) {
                type = 'summonsSpecial';
                // В цикле "Призыв титанов" (1) даем больше свитков на промежуточных этапах
                count = 12;
                rarity = Character.Rarity.LEGENDARY;
            }
            else if (day % 7 === 0) {
                type = 'summons';
                // В цикле "Призыв титанов" (1) даем больше свитков на промежуточных этапах
                count = 10;
                rarity = Character.Rarity.EPIC;
            }
            // --- ЛОГИКА БУДНЕЙ ---
            else if (day % 5 === 0) {
                type = 'summons';
                // В цикле "Призыв титанов" (1) даем больше свитков на промежуточных этапах
                count = 4;
                rarity = Character.Rarity.EPIC;
            }
            // --- ЛОГИКА БУДНЕЙ ---
            else if (day % 2 === 0) {
                // Четные дни: Гемы
                type = 'gems';
                const baseGems = 160;
                // В алмазном цикле (0) насыпаем +50% гемов
                const bonus = currentCycleType === 0 ? 80 : 0;
                count = baseGems + bonus + (Math.floor(index / 2) * 10);
                rarity = Character.Rarity.EPIC;
            }
            else {
                // Нечетные дни: Золото
                type = 'gold';
                const baseGold = 1000;
                // В золотом цикле (2) удваиваем награду
                const multiplier = currentCycleType === 2 ? 2.5 : 1;
                count = Math.floor((baseGold + (index * 5000)) * multiplier);
                rarity = Character.Rarity.RARE;
            }

        return {
            icon: type,
            rarity: rarity,
            count: count,
            day: day,
            onClaim: () => {
                const state = usePlayerStore.getState();
                state.addBalance(type, count);
            }
        };
    });
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
            currentDay: 1,
            lastClaimedAt: new Date(Date.now() - 86400000).toISOString(),
            isOpenedModal: true,
            setIsOpenedModal: (isOpened: boolean) => {
                set({ isOpenedModal: isOpened }, false, "setIsOpenedModal");
            },
            claimToday: () => {
                const day = get().currentDay;
                const date = new Date();
                date.setHours(23, 59, 59, 999);
                set({ lastClaimedAt: date.toISOString(), currentDay: day + 1 }, false, "claimToday");
            },
            setLastClaimedAt: (date: string) => {
                if (new Date().getTime() > new Date(date).getTime()) {
                    set({ isOpenedModal: true, lastClaimedAt: date }, false, "setIsOpenedModal")
                } else {
                    set({ lastClaimedAt: date, isOpenedModal: false }, false, "setLastClaimedAt");
                }
            },
            setCurrentDay: (day: number) => {
                set({ currentDay: day }, false, "setCurrentDay");
            },
        }))
    )
)