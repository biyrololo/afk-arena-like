import { useEffect, useState, type FC } from "react";

// import bg from "@/assets/backgrounds/loading.webp";
import loading_bg from '@/assets/backgrounds/wallpaper.webp'
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { EventBus } from "@/utils/eventBus";

export const Loader: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const onStart = () => {
      setProgress(0);
      setIsLoaded(true);
    };

    const onEnd = () => {
      setIsLoaded(false);
    };

    const onProgress = (progress: number) => {
      // progress = 0 to 1
      // console.log(`Loading progress:`, progress);
      setProgress(progress * 100);
      // if(progress === 1) {
      //     onEnd();
      // }
    };

    EventBus.on("load:start", onStart);
    EventBus.on("load:end", onEnd);
    EventBus.on("load:progress", onProgress);

    return () => {
      EventBus.off("load:start", onStart);
      EventBus.off("load:end", onEnd);
      EventBus.off("load:progress", onProgress);
    };
  }, []);

  if (!isLoaded) return null;

  return (
    <ResponsiveUI zIndex={9999}>
      <div
        className="w-full h-full bg-cover bg-center flex flex-col gap-4 items-center justify-center relative"
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${loading_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "all",
          zIndex: 9999,
        }}
      >
        <p className="text-white text-8xl font-bold text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] mt-30">
          Загрузка...
        </p>
        <div
          className="w-full h-20 bg-sky-950 mt-auto relative"
        >
          <div className="h-full bg-sky-500 absolute" style={{ width: `${progress}%`, transition: "width 0.5s" }} />
          <p
            className="text-white text-6xl font-bold text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] absolute top-1/2 left-1/2 -translate-1/2"
          >
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    </ResponsiveUI>
  );
};

export const PermanentLoader: FC = () => {
  return (
    <ResponsiveUI zIndex={9999}>
      <div
        className="w-full h-full bg-cover bg-center flex flex-col gap-4 items-center justify-center relative"
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${loading_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "all",
          zIndex: 9999,
        }}
      >
        <p className="text-white text-8xl font-bold text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] mt-30">
          Загрузка...
        </p>
        <div
          className="w-full h-20 bg-sky-950 mt-auto relative"
        >
        </div>
      </div>
    </ResponsiveUI>
  );
};
