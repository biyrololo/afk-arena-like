import type { FC } from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PhaserGame from "@/shared/ui/PhaserGame";
import BootScene from "@/scenes/BootScene";
import { EventBus } from "@/utils/eventBus";
import { Loader, PermanentLoader } from "../Loader/Loader";

export const Wrapper: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onEnd = () => {
      setIsLoaded(true);
    };

    EventBus.on("load:end", onEnd);

    return () => {
      EventBus.off("load:end", onEnd);
    };
  }, []);

  if (!isLoaded) {
    return (
      <>
        <PhaserGame scenes={[BootScene]} />
        <PermanentLoader />
        <Loader />
      </>
    );
  }

  return <Outlet />;
};
