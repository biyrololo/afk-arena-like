import { useEffect, type FC } from "react";
import { useShallow } from "zustand/shallow";
import { useGameStateStore } from "../model/game-state.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { usePlotStore } from "@/entities/plot/lib/plot.store";
import { useQuestsStore } from "@/entities/quest/model/quest.store";
import { SDK } from "@/entities/sdk/model/sdk";

export const Observer: FC = () => {
  const [setPaused, inited] = useGameStateStore(useShallow((state) => [state.setPaused, state.inited]));
  const [characters, equipment] = usePlayerCharactersStore(useShallow(state => [state.characters, state.equipment]))
  const [usedPromocodes, stageNumber, chapterNumber, gems, gold, summons] = usePlayerStore(useShallow(state => [state.usedPromocodes, state.stageNumber, state.chapterNumber,
  state.balances.gems, state.balances.gold, state.balances.summons]))
  const [completedScenes] = usePlotStore(useShallow(state => [state.completedScenes]))
  const [completedQuests] = useQuestsStore(useShallow(state => [state.completedQuests]))

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener('blur', () => {
      setPaused(true);
    }, { signal: controller.signal })

    window.addEventListener('focus', () => {
      setPaused(false);
    }, { signal: controller.signal })

    return () => {
      controller.abort();
    };
  }, [setPaused])

  useEffect(() => {
    if (inited) {
      SDK.getInstance().syncWithLocal();
    }
  }, [inited, characters, equipment, usedPromocodes, completedScenes, completedQuests, stageNumber, chapterNumber, gems, gold, summons])

  return null;
}