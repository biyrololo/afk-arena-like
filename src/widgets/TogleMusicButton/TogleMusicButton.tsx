import type { FC } from "react";
import icon from '@/assets/menu/music.webp';
import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { useShallow } from "zustand/shallow";

export const TogleMusicButton: FC = () => {
    const [musicDisabled, toggleMusicDisabled] = useGameStateStore(
        useShallow(state => [state.musicDisabled, state.toggleMusicDisabled])
    );

    return (
        <div
            tabIndex={-1}
            className="size-40 bg-cover bg-center absolute top-4 left-4 cursor-pointer flex flex-col items-center hover:scale-105 justify-center active:scale-90 transition-transform"
            style={{
                backgroundImage: `url(${icon})`,
            }}
            onClick={toggleMusicDisabled}
        >
            {
                musicDisabled && (
                    <div
                        className="mt-2 ml-3 w-4/5 h-3 bg-sky-400 -rotate-20 border-2 rounded-full"
                    />
                )
            }
        </div>
    )
}