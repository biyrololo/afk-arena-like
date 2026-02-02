import { useEffect, useState, type FC } from "react";

import bg from '@/assets/backgrounds/loading.webp';
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { EventBus } from "@/utils/eventBus";

export const Loader: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onStart = () => {
            setProgress(0);
            setIsLoaded(true);
        };

        const onEnd = () => {
            setIsLoaded(false);
        };

        const onProgress = (progress: number) => {
            console.log(`Loading progress:`, progress);
            setProgress(progress * 100);
            // if(progress === 1) {
            //     onEnd();
            // }
        };

        EventBus.on('load:start', onStart);
        EventBus.on('load:end', onEnd);
        EventBus.on('load:progress', onProgress);

        return () => {
            EventBus.off('load:start', onStart);
            EventBus.off('load:end', onEnd);
            EventBus.off('load:progress', onProgress);
        };
    }, [])

    if(!isLoaded)
        return null;

    return (
        <ResponsiveUI zIndex={9999}>
            <div className="w-full h-full bg-cover bg-center flex flex-col gap-4 items-center justify-center"
                style={{ 
                    backgroundColor: '#000000',
                    backgroundImage: `url(${bg})`, 
                    backgroundSize: "cover", 
                    backgroundPosition: "center",
                    pointerEvents: 'all',
                    zIndex: 9999
                }}
            >
                <p className="text-white text-6xl font-bold text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]">Загрузка...</p>
                <p className="text-white text-6xl font-bold text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]">{Math.floor(progress)}%</p>
            </div>
        </ResponsiveUI>
    )
}