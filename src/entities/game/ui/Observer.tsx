import { useEffect, type FC } from "react";
import { useShallow } from "zustand/shallow";
import { useGameStateStore } from "../model/game-state.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { usePlotStore } from "@/entities/plot/lib/plot.store";
import { useQuestsStore } from "@/entities/quest/model/quest.store";
import { SDK } from "@/entities/sdk/model/sdk";
import { useDailyRewardsStore } from "@/entities/daily-reward/model/daily-reward.store";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";

export const Observer: FC = () => {
  const [setPaused, inited] = useGameStateStore(useShallow((state) => [state.setPaused, state.inited]));
  const [characters, equipment] = usePlayerCharactersStore(useShallow(state => [state.characters, state.equipment]))
  const [usedPromocodes, stageNumber, chapterNumber, gems, gold, summons, summonsSpecial] = usePlayerStore(useShallow(state => [state.usedPromocodes, state.stageNumber, state.chapterNumber,
  state.balances.gems, state.balances.gold, state.balances.summons, state.balances.summonsSpecial]))
  const [completedScenes] = usePlotStore(useShallow(state => [state.completedScenes]))
  const [completedQuests] = useQuestsStore(useShallow(state => [state.completedQuests]))
  const [currentDay, lastClaimedAt] = useDailyRewardsStore(useShallow(state => [state.currentDay, state.lastClaimedAt]))
  const [killedEnemies, maxSurvivialDepthPerChapter, visitedPages, boughtProducts] = usePlayerStatsStore(useShallow(state => [
    state.killedEnemies, state.maxSurvivialDepthPerChapter, state.visitedPages, state.boughtProducts
  ]))

  useEffect(() => {
    const controller = new AbortController();

    const pause = () => setPaused(true);
    const resume = () => {
      if (useGameStateStore.getState().isCurrentScreenPaused) return;
      if (!document.hidden) setPaused(false);
    };

    document.addEventListener("visibilitychange", () => {
      if (useGameStateStore.getState().isCurrentScreenPaused) return;
      setPaused(document.hidden);
    }, { signal: controller.signal });

    window.addEventListener("blur", pause, { signal: controller.signal });
    window.addEventListener("focus", resume, { signal: controller.signal });

    return () => controller.abort();
  }, [setPaused]);

  useEffect(() => {
    if (!inited) return;
    const timeoutId = setTimeout(() => {
      console.log("Saving to Yandex Cloud...");
      SDK.getInstance().syncWithLocal();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inited, characters, equipment, usedPromocodes, completedScenes, completedQuests, stageNumber, chapterNumber, gems, gold, summons, summonsSpecial, currentDay, lastClaimedAt, killedEnemies, maxSurvivialDepthPerChapter, visitedPages, boughtProducts])

  return null;
}