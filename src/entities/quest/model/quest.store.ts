import { usePlayerStore } from "@/entities/player/model/player.store";
import type { IQuest } from "./quest.model";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { Character } from "@/shared/types/character";

export const QUESTS: IQuest[] = [
    {
        id: 'start',
        title: "Пройди первый бой",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return '1 / 1';
            }
            return `${stageNumber - 1} / 1`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return 1;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: 'start-2',
        title: "Пройди 2 боя",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return '2 / 2';
            }
            return `${stageNumber - 1} / 2`;
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return 1;
            }
            if(stageNumber === 2) {
                return 0.5;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: 'start',
        title: "Пройди первый бой",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return '1 / 1';
            }
            return `${stageNumber - 1} / 1`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return 1;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: 'start-2',
        title: "Пройди 2 боя",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return '2 / 2';
            }
            return `${stageNumber - 1} / 2`;
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return 1;
            }
            if(stageNumber === 2) {
                return 0.5;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: 'start',
        title: "Пройди первый бой",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return '1 / 1';
            }
            return `${stageNumber - 1} / 1`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return 1;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: 'start-2',
        title: "Пройди 2 боя",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return '2 / 2';
            }
            return `${stageNumber - 1} / 2`;
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return 1;
            }
            if(stageNumber === 2) {
                return 0.5;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
]

export const useGetDailyQuests = (): IQuest[] => {
    const date = new Date().toISOString().slice(0, 10);
    return ([
    {
        id: `daily-1-${date}`,
        title: "Пройди первый бой",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return '1 / 1';
            }
            return `${stageNumber - 1} / 1`
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 1 || chapterNumber > 1) {
                return 1;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    {
        id: `daily-2-${date}`,
        title: "Пройди 2 боя",
        reward: 'gems',
        count: 100,
        rewardRarity: Character.Rarity.EPIC,
        getProgressText: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return '2 / 2';
            }
            return `${stageNumber - 1} / 2`;
        },
        getProgress: () => {
            const { stageNumber, chapterNumber } = usePlayerStore.getState();
            if(stageNumber > 2 || chapterNumber > 1) {
                return 1;
            }
            if(stageNumber === 2) {
                return 0.5;
            }
            return 0;
        },
        onClaim: () => {
            usePlayerStore.getState().addBalance('gems', 100);
        }
    },
    ])
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
