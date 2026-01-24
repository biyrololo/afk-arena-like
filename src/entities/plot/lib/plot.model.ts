import type { JSX } from "react";

export interface IStatement {
    id: string;
    author: string;
    color: string;
    avatar?: string;
    authorPosition?: 'left' | 'right';
    backgroundImage?: string;
    text: string | JSX.Element;
    isAvailable?: () => boolean;
}

export interface IPlotScene {
    id: string;
    statements: IStatement[];
}

export interface IPlot {
    scenes: IPlotScene[];
}

export interface IPlotStore {
    currentStatementId?: string;
    currentSceneId?: string;
    completedScenes: string[];
    reset: () => void;
    nextStatement: () => void;
    startScene: () => void;
    addCompletedScene: (id: string) => void;
    setCompletedScenes: (ids: string[]) => void;
}