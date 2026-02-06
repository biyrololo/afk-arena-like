import { useLocation, useNavigate } from "react-router-dom";

import { EventBus } from "@/utils/eventBus";
import GameScene from "@/scenes/GameScene";
import GameUI from "@/widgets/GameUI/GameUI";
import PhaserGame from "@/shared/ui/PhaserGame";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { useEffect } from "react";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { findStage, SURVIVAL_CHAPTERS } from "@/entities/chapter/lib/chapters";
import {
  StageTypeEnum,
  type IStage,
} from "@/entities/chapter/lib/chapter.model";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  const characters: Array<PlayerCharacter | null> | undefined =
    location.state?.characters;
  const chapter: number | undefined = location.state?.chapter;
  const stageType: StageTypeEnum | undefined = location.state?.stageType;
  const stage: number | undefined = location.state?.stage;

  useEffect(() => {
    if (!characters) {
      navigate("/", {
        replace: true,
      });
    } else {
      EventBus.emit("load:start");
    }
  }, []);

  useEffect(() => {
    if (!characters || (!chapter && !stageType) || !stage) return;
    console.log("CHARACTERS", characters);
    EventBus.on("sceneReady", (scene: string) => {
      console.log("loaded", scene);
      if (scene === "GameScene") {
        console.log("emit addAllies", characters);
        EventBus.emit("addAllies", characters);
        let currentStage: IStage | undefined;
        if (stageType === StageTypeEnum.SURVIVAL) {
          currentStage = SURVIVAL_CHAPTERS.find(
            (c) => c.stageNumber === +stage,
          );
        } else if (chapter) {
          currentStage = findStage(chapter, stage);
        }
        if (!currentStage) {
          throw new Error(
            `Stage ${chapter}-${stage} with type ${stageType} not found`,
          );
        }
        console.log("emit start");
        EventBus.emit("start", currentStage);
      }
    });

    return () => {
      EventBus.removeListener("sceneReady");
    };
  }, [characters, chapter, stage, stageType]);

  useEffect(() => {
    const callback = (data: { win: boolean }) => {
      console.log(data);
      if (stageType === StageTypeEnum.SURVIVAL) {
        navigate("/game/survival/end", {
          state: {
            ...data,
          },
        });
      } else {
        navigate("/game/end", {
          state: {
            ...data,
          },
        });
      }
    };
    EventBus.on("gameOverUI", callback);

    return () => {
      EventBus.removeListener("gameOverUI", callback);
    };
  }, [stageType]);

  if (!characters) return null;

  return (
    <>
      <PhaserGame scenes={[GameScene]} />
      <ResponsiveUI>
        <GameUI />
      </ResponsiveUI>
    </>
  );
}
