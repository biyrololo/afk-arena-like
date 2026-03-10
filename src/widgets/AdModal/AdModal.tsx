import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { SDK } from "@/entities/sdk/model/sdk";
import { Modal } from "@/shared/ui/Modal";
import { useEffect, useState, type FC } from "react";
import { useShallow } from "zustand/shallow";

const AD_INTERVAL = 180000; // раз в 3 минуты

export const AdModal: FC = () => {
    const [lastAdAt, setLastAdAt, setPaused] = useGameStateStore(useShallow(state => [
        state.lastAdAt, state.setLastAdAt, state.setPaused
    ]))

    const [isOpened, setIsOpened] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const now = new Date().getTime();
        if (now - lastAdAt >= AD_INTERVAL) {
            setIsOpened(true);
            setLastAdAt(now);
            setPaused(true);
            setTimer(5);
        }
    }, [lastAdAt])

    useEffect(() => {
        if (isOpened) {
            const interval = setInterval(() => {
                setTimer(timer => {
                    if (timer > 0) return timer - 1;
                    clearInterval(interval);
                    SDK.getInstance()
                        .showFullscreenAdv({
                            onClose: () => {
                                setIsOpened(false);
                                setPaused(false);
                            },
                            onError: () => {
                                setIsOpened(false);
                                setPaused(false);
                            },
                        });
                    return 0;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpened, setTimer, setPaused])

    return (
        <Modal
            isOpened={isOpened}
            close={() => setIsOpened(false)}
            maxWidth="1000px"
        >
            <div className="text-white text-6xl text-center">Реклама начнётся через {Math.max(0, timer)}</div>
        </Modal>
    )
}