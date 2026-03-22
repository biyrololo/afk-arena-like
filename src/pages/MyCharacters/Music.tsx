import { MUSIC } from "@/assets/music/music";
import { useBackgroundMusic } from "@/shared/hooks/useBackgroundMusic";
import { useEffect, type FC } from "react";

export const Music: FC = () => {
    const music = useBackgroundMusic(MUSIC.menu, { loop: true, volume: 0.2 });
    useEffect(() => {
        music.play();
        return () => {
            music.stop();
        };
    }, []);

    return null;
}