import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface PlayerStatsStore {
    killedEnemies: Record<string, number>;
    maxSurvivialDepthPerChapter: Record<number, number>;

    setKilledEnemies(killedEnemies: Record<string, number>): void;
    setMaxSurvivialDepthPerChapter(maxSurvivialDepthPerChapter: Record<number, number>): void;

    addKilledEnemy: (enemyKey: string) => void;
    updateMaxSurvivialDepth: (chapterNumber: number, depth: number) => void;
}

export const usePlayerStatsStore = create<PlayerStatsStore>()(
    devtools(
        subscribeWithSelector((set) => ({
            killedEnemies: {},
            maxSurvivialDepthPerChapter: {},

            setKilledEnemies: (killedEnemies) =>
                set((state) => ({
                    killedEnemies: { ...state.killedEnemies, ...killedEnemies },
                })),

            setMaxSurvivialDepthPerChapter: (maxSurvivialDepthPerChapter) =>
                set((state) => ({
                    maxSurvivialDepthPerChapter: {
                        ...state.maxSurvivialDepthPerChapter,
                        ...maxSurvivialDepthPerChapter,
                    },
                })),
            addKilledEnemy: (enemyKey) =>
                set((state) => ({
                    killedEnemies: {
                        ...state.killedEnemies,
                        [enemyKey]: (state.killedEnemies[enemyKey] || 0) + 1,
                    },
                })),
            updateMaxSurvivialDepth: (chapterNumber, depth) =>
                set((state) => ({
                    maxSurvivialDepthPerChapter: {
                        ...state.maxSurvivialDepthPerChapter,
                        [chapterNumber]: Math.max(state.maxSurvivialDepthPerChapter[chapterNumber] || 0, depth),
                    },
                })),
        })
        )
    ))