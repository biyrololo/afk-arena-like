import { create } from "zustand";
import type { IStatement, IPlot, IPlotScene, IPlotStore } from "./plot.model";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { usePlayerStore } from "@/entities/player/model/player.store";
import { Avatars } from "@/shared/avatars";

const greeting: IPlotScene = {
    id: "greeting",
    statements: [
        {
            id: "greeting-1",
            author: "NPC",
            color: "green",
            text: "Привет! Игра хайп!",
            avatar: Avatars.crystalKing,
        },
        {
            id: "greeting-2",
            author: "NPC 2",
            color: "red",
            text: "Чтобы начать играть, нажми на 'В бой'!",
            avatar: Avatars.fireKing,
            authorPosition: "right",
        },
        {
            id: "greeting-3",
            author: "NPC 3",
            color: "blue",
            text: "Так же можно играть в режиме выживания, чтобы фармить ресурсы для прокачки",
            avatar: Avatars.frostGuardian,
        },
        {
            id: "greeting-4",
            author: "NPC 4",
            color: "purple",
            text: "В меню призыва можно призвать новых крутых героев",
            avatar: Avatars.spearwoman,
        },
    ],
};

const afterFight: IPlotScene = {
    id: "after-fight",
    statements: [
        {
            id: "after-fight-1",
            author: "NPC",
            color: "green",
            text: "Супер. Вы выиграли первую битву",
            isAvailable: () => {
                const chapterNumber = usePlayerStore.getState().chapterNumber;
                const stageNumber = usePlayerStore.getState().stageNumber;

                return chapterNumber === 1 && stageNumber === 2;
            }
        },
    ],
};

const PLOT: IPlot = {
    scenes: [
        // greeting,
        // afterFight,
    ],
};

const isAvailableStatement = (statement: IStatement) => {
    if(statement.isAvailable) return statement.isAvailable();
    return true;
};

const findScene = (id: string) => PLOT.scenes.find((scene) => scene.id === id);

export const findStatement = (sceneId: string, statementId: string) => {
    const scene = findScene(sceneId);
    if(!scene) return undefined;
    return scene.statements.find((statement) => statement.id === statementId);
};

export const usePlotStore = create<IPlotStore>()(
    devtools(
        subscribeWithSelector(
            (set, get) => ({
                currentStatementId: undefined,
                currentSceneId: undefined,
                completedScenes: [],
                reset: () => {
                    set(() => ({
                        currentStatementId: undefined,
                        currentSceneId: undefined,
                    }));
                },
                nextStatement: () => {
                    const sceneId = get().currentSceneId;
                    const scene = sceneId && findScene(sceneId);
                    if(!scene) {
                        get().reset();
                        return;
                    }
                    const index = scene.statements.findIndex(
                        (statement) => statement.id === get().currentStatementId
                    );

                    if (index === -1 || index === scene.statements.length - 1) {
                        get().reset()
                        return;
                    }
                    if(isAvailableStatement(scene.statements[index + 1])) {
                        set(() => ({
                            currentStatementId: scene.statements[index + 1].id,
                        }));
                    } else {
                        get().reset()
                    }
                },
                startScene: () => {
                    if(get().currentSceneId) return;
                    const completedScenes = get().completedScenes;
                    const availableScenes = PLOT.scenes.find(
                        (scene) => {
                            if(completedScenes.includes(scene.id)) return false;
                            return scene.statements[0] && isAvailableStatement(scene.statements[0]);
                        }
                    );

                    console.log(
                        completedScenes,
                        availableScenes
                    )

                    if(!availableScenes) return;

                    set(() => ({
                        currentSceneId: availableScenes.id,
                        currentStatementId: availableScenes.statements[0].id,
                        completedScenes: [...completedScenes, availableScenes.id],
                    }));
                },
                addCompletedScene: (id) => {
                    set((state) => ({
                        completedScenes: [...state.completedScenes, id],
                    }));
                },
                setCompletedScenes: (ids) => {
                    set(() => ({
                        completedScenes: ids,
                    }));
                },
            })
        )
    )
)