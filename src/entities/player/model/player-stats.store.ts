import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface PlayerStatsStore {
    killedEnemies: Record<string, number>;
    maxSurvivialDepthPerChapter: Record<number, number>;
    visitedPages: Record<string, boolean>;
    boughtProducts: string[];

    setKilledEnemies(killedEnemies: Record<string, number>): void;
    setMaxSurvivialDepthPerChapter(maxSurvivialDepthPerChapter: Record<number, number>): void;
    setVisitedPages(visitedPages: Record<string, boolean>): void;
    setBoughtProducts(boughtProducts: string[]): void;


    addKilledEnemy: (enemyKey: string) => void;
    updateMaxSurvivialDepth: (chapterNumber: number, depth: number) => void;
    visitPage: (pageKey: string) => void;
    addBoughtProduct: (productKey: string) => void;
}

export const usePlayerStatsStore = create<PlayerStatsStore>()(
    devtools(
        subscribeWithSelector((set) => ({
            killedEnemies: {},
            maxSurvivialDepthPerChapter: {},
            visitedPages: {},
            boughtProducts: [],

            setVisitedPages: (visitedPages) =>
                set((state) => ({
                    visitedPages: { ...state.visitedPages, ...visitedPages },
                })),
            visitPage: (pageKey) =>
                set((state) => ({
                    visitedPages: { ...state.visitedPages, [pageKey]: true },
                })),

            setKilledEnemies: (killedEnemies) =>
                set((state) => ({
                    killedEnemies: { ...state.killedEnemies, ...killedEnemies },
                })),
            setBoughtProducts: (boughtProducts) =>
                set((state) => ({
                    boughtProducts: [...state.boughtProducts, ...boughtProducts],
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
            addBoughtProduct: (productKey) =>
                set((state) => ({
                    boughtProducts: [...state.boughtProducts, productKey],
                })),
        })
        )
    ))