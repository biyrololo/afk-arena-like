import { SDK } from "@/entities/sdk/model/sdk";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface GameState {
    paused: boolean;
    inited: boolean;
    lastAdAt: number;
    clicked: boolean;
    musicDisabled: boolean;
    adAvailable: boolean;
    isCurrentScreenPaused: boolean;

    setPaused: (paused: boolean) => void;
    initDone: () => void;
    clickDone: () => void;
    setLastAdAt: (lastAdAt: number) => void;
    toggleMusicDisabled: () => void;
    setAdAvailable: (adAvailable: boolean) => void;
    setIsCurrentScreenPaused: (isCurrentScreenPaused: boolean) => void;
}

export const useGameStateStore = create<GameState>()(
    subscribeWithSelector(
        devtools(
            (set, get) => ({
                paused: false,
                inited: false,
                clicked: false,
                lastAdAt: new Date().getTime(),
                musicDisabled: false,
                adAvailable: false,
                isCurrentScreenPaused: false,
                setIsCurrentScreenPaused: (isCurrentScreenPaused) => set(() => ({ isCurrentScreenPaused })),

                toggleMusicDisabled: () => set(() => ({ musicDisabled: !get().musicDisabled })),
                setAdAvailable: (adAvailable) => set(() => ({ adAvailable })),

                setPaused: (paused) => {
                    if (get().paused !== paused) {
                        if (paused) {
                            SDK.getInstance().gameStop();
                        } else {
                            SDK.getInstance().gameStart();
                        }
                        set(() => ({ paused }));
                    }
                },
                clickDone: () => set(() => ({ clicked: true })),
                initDone: () => set(() => ({ inited: true })),
                setLastAdAt: (lastAdAt) => set(() => ({ lastAdAt })),
            })
        )
    )
)