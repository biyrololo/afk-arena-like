import type { FC } from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PhaserGame from "@/shared/ui/PhaserGame";
import BootScene from "@/scenes/BootScene";
import { EventBus } from "@/utils/eventBus";
import { Loader, PermanentLoader } from "../Loader/Loader";
import { useShallow } from "zustand/shallow";
import { SDK } from "@/entities/sdk/model/sdk";
import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { Observer } from "@/entities/game/ui/Observer";

export const Wrapper: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inited] = useGameStateStore(useShallow((state) => [state.inited]));

  useEffect(() => {
    const onEnd = () => {
      setIsLoaded(true);
    };

    EventBus.on("load:end", onEnd);

    return () => {
      EventBus.off("load:end", onEnd);
    };
  }, []);

  useEffect(() => {
    if(isLoaded) {
      SDK.getInstance()
        .gameReady()
    }
    if(isLoaded && inited) {
      SDK.getInstance()
        .gameStart()
      useGameStateStore.getState().setLastAdAt(new Date().getTime());
    }
  }, [isLoaded, inited])

  if (!isLoaded || !inited) {
    return (
      <>
        <PhaserGame scenes={[BootScene]} />
        <PermanentLoader />
        <Loader />
      </>
    );
  }

  return <>
    <Observer />
    <Outlet />
  </>;
};
