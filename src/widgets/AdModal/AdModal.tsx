import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { SDK } from "@/entities/sdk/model/sdk";
import { useEffect, useState, type FC } from "react";
import { useShallow } from "zustand/shallow";

const AD_INTERVAL = 180000; // раз в 3 минуты

export const AdModal: FC = () => {
    const [lastAdAt, adAvailable, setLastAdAt, setPaused, setAdAvailable, setIsCurrentScreenPaused] = useGameStateStore(useShallow(state => [
        state.lastAdAt, state.adAvailable, state.setLastAdAt, state.setPaused, state.setAdAvailable, state.setIsCurrentScreenPaused
    ]))

    const [adShownThisSession, setAdShownThisSession] = useState(false);

    useEffect(() => {
        const now = new Date().getTime();
        if (now - lastAdAt >= AD_INTERVAL && adAvailable && !adShownThisSession) {
            setAdShownThisSession(true);
            setLastAdAt(now);
            setAdAvailable(false);
            setPaused(true);
            setIsCurrentScreenPaused(true);
            SDK.getInstance()
                .showFullscreenAdv({
                    onClose: () => {
                        setIsCurrentScreenPaused(false);
                        setPaused(false);
                        SDK.getInstance().gameStart();
                    },
                    onError: () => {
                        setIsCurrentScreenPaused(false);
                        setPaused(false);
                        SDK.getInstance().gameStart();
                    },
                });
        }
    }, [])

    return null;
}