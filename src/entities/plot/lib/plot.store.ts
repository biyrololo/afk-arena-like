import { create } from "zustand";
import type { IStatement, IPlot, IPlotStore } from "./plot.model";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { CHAPTER_1_SCENES } from "./scenes/chapter-1-scenes";
import { CHAPTER_2_SCENES } from "./scenes/chapter-2-scenes";

const PLOT: IPlot = {
    scenes: [
        ...CHAPTER_1_SCENES,
        ...CHAPTER_2_SCENES
    ],
};

const isAvailableStatement = (statement: IStatement) => {
    if (statement.isAvailable) return statement.isAvailable();
    return true;
};

const findScene = (id: string) => PLOT.scenes.find((scene) => scene.id === id);

export const findStatement = (sceneId: string, statementId: string) => {
    const scene = findScene(sceneId);
    if (!scene) return undefined;
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
                    if (!scene) {
                        get().reset();
                        return;
                    }
                    const index = scene.statements.findIndex(
                        (statement) => statement.id === get().currentStatementId
                    );

                    if (index === -1 || index === scene.statements.length - 1) {
                        scene.onComplete?.();
                        get().reset()
                        return;
                    }
                    if (isAvailableStatement(scene.statements[index + 1])) {
                        set(() => ({
                            currentStatementId: scene.statements[index + 1].id,
                        }));
                    } else {
                        get().reset()
                    }
                },
                startScene: () => {
                    if (get().currentSceneId) return;
                    const completedScenes = get().completedScenes;
                    const availableScenes = PLOT.scenes.find(
                        (scene) => {
                            if (completedScenes.includes(scene.id)) return false;
                            return scene.statements[0] && isAvailableStatement(scene.statements[0]);
                        }
                    );

                    // console.log(
                    //     completedScenes,
                    //     availableScenes
                    // )

                    if (!availableScenes) return;

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