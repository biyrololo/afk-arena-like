import { usePlayerStore } from "@/entities/player/model/player.store";
import type { IQuest } from "./quest.model";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { Character } from "@/shared/types/character";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";

export const QUESTS: IQuest[] = [
    // --- СЮЖЕТНЫЕ ВЕХИ ---
    {
        id: 'boss-warrior-1',
        title: "Пройдите 3 этапа",
        reward: 'summons',
        count: 1,
        rewardRarity: Character.Rarity.RARE,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(chapterNumber === 1 && stageNumber <= 3) {
                return `${stageNumber - 1} / 3`
            }
            return `3 / 3`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(chapterNumber === 1 && stageNumber <= 3)
                return (stageNumber - 1) / 3;
            return 1;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('summons', 1);
        }
    },
    {
        id: 'half-way-chapter-1',
        title: "Экватор: Пройти 12 стадий",
        reward: 'gems',
        count: 320, // 2 призыва
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(chapterNumber === 1 && stageNumber <= 12) {
                return `${stageNumber - 1} / 12`
            }
            return `12 / 12`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if (chapterNumber > 1) return 1;
            return Math.min((stageNumber - 1) / 12, 1);
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 320);
        }
    },
    {
        id: 'fire-warrior-slayer',
        title: "Укротитель огня: Победить воина огня",
        reward: 'gems',
        count: 500,
        rewardRarity: Character.Rarity.LEGENDARY,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            return (stageNumber > 20 || chapterNumber > 1) ? '1 / 1' : '0 / 1';
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            return (stageNumber > 20 || chapterNumber > 1) ? 1 : 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 500);
        }
    },

    // --- ОХОТА НА МОБОВ (Нужно реализовать счетчик убийств в Store) ---
    {
        id: 'slime-hunter',
        title: "Истребитель слизней (50 шт.)",
        reward: 'gold',
        count: 15000,
        rewardRarity: Character.Rarity.COMMON,
        getProgressText: () => {
            const { killedEnemies } = usePlayerStatsStore.getState();
            const blue = killedEnemies['blueSlime'] || 0;
            const green = killedEnemies['greenSlime'] || 0;
            const purple = killedEnemies['purpleSlime'] || 0;
            return `${Math.min(blue + green + purple, 50)} / 50`;
        },
        getProgress: () => {
            const { killedEnemies } = usePlayerStatsStore.getState();
            const blue = killedEnemies['blueSlime'] || 0;
            const green = killedEnemies['greenSlime'] || 0;
            const purple = killedEnemies['purpleSlime'] || 0;
            return Math.min((blue + green + purple) / 50, 1);
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gold', 15000);
        }
    },
    {
        id: 'knight-honor',
        title: "Рыцарский турнир: Победить 10 Стальных Рыцарей",
        reward: 'summons',
        count: 2,
        rewardRarity: Character.Rarity.RARE,
        getProgressText: () => {
            const { killedEnemies } = usePlayerStatsStore.getState();
            return `${Math.min(killedEnemies['steelKnight'] || 0, 10)} / 10`;
        },
        getProgress: () => {
            const { killedEnemies } = usePlayerStatsStore.getState();
            return Math.min((killedEnemies['steelKnight'] || 0) / 10, 1);
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('summons', 2);
        }
    },

    // --- ВЫЖИВАНИЕ ---
    {
        id: 'survival-rookie',
        title: "Выживший: Пройти 5 этапов выживания",
        reward: 'gems',
        count: 160, // 1 призыв
        rewardRarity: Character.Rarity.RARE,
        getProgressText: () => {
            const { maxSurvivialDepthPerChapter } = usePlayerStatsStore.getState();
            return `${Math.min(maxSurvivialDepthPerChapter[1] || 0, 5)} / 5`;
        },
        getProgress: () => {
            const { maxSurvivialDepthPerChapter } = usePlayerStatsStore.getState();
            return Math.min((maxSurvivialDepthPerChapter[1] || 0) / 5, 1);
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 160);
        }
    },
];

export const useGetDailyQuests = (): IQuest[] => {
    const date = new Date().toISOString().slice(0, 10);
    return [
        {
            id: `daily-gold-${date}`,
            title: "Золотая лихорадка: Заработать 5000 золота",
            reward: 'gems',
            count: 50,
            rewardRarity: Character.Rarity.RARE,
            getProgressText: () => "Считай золото за день",
            getProgress: () => 0,
            onClaim: () => {
                usePlayerStore.getState().addBalance('gems', 50);
            }
        },
        {
            id: `daily-win-${date}`,
            title: "Победный марш: Выиграть 3 любых боя",
            reward: 'summons',
            count: 1,
            rewardRarity: Character.Rarity.EPIC,
            getProgressText: () => "Счетчик побед за день",
            getProgress: () => 0,
            onClaim: () => {
                usePlayerStore.getState().addBalance('summons', 1);
            }
        }
    ];
}

interface QuestsStore {
    completedQuests: IQuest['id'][];
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    completeQuest: (id: IQuest['id']) => void;
    setCompletedQuests: (completedQuests: IQuest['id'][]) => void;
}

export const useQuestsStore = create<QuestsStore>()(
    devtools(
        subscribeWithSelector(
            (set, get) => ({
                completedQuests: [],
                isModalOpen: false,
                completeQuest: (id) => {
                    set((state) => ({
                        completedQuests: [...state.completedQuests, id]
                    }));
                },
                setCompletedQuests: (completedQuests) => {
                    set(() => ({ completedQuests }), false, 'setCompletedQuests');
                },
                setIsModalOpen: (isModalOpen) => {
                    set(() => ({ isModalOpen }), false, 'setIsModalOpen');
                },
                
            })
        )
    )
)

export const openQuestsModal = () => {
    useQuestsStore.getState().setIsModalOpen(true);
}
