import { useEffect, useRef, type FC } from "react";
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
  const [usedPromocodes, stageNumber, chapterNumber, gems, gold, summons, summonsSpecial, towerFloor] = usePlayerStore(useShallow(state => [state.usedPromocodes, state.stageNumber, state.chapterNumber,
  state.balances.gems, state.balances.gold, state.balances.summons, state.balances.summonsSpecial, state.towerFloor]))
  const [completedScenes] = usePlotStore(useShallow(state => [state.completedScenes]))
  const [completedQuests] = useQuestsStore(useShallow(state => [state.completedQuests]))
  const [currentDay, lastClaimedAt] = useDailyRewardsStore(useShallow(state => [state.currentDay, state.lastClaimedAt]))
  const [killedEnemies, maxSurvivialDepthPerChapter, visitedPages, boughtProducts] = usePlayerStatsStore(useShallow(state => [
    state.killedEnemies, state.maxSurvivialDepthPerChapter, state.visitedPages, state.boughtProducts
  ]))

  // Throttle saving to prevent too frequent saves (max once per second)
  const lastSaveRef = useRef<number>(0);
  const pendingSaveRef = useRef<boolean>(false);

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

  // Save data when user closes/refreshes the tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only save if game has been initialized
      if (!useGameStateStore.getState().inited) {
        console.log('[Observer] Page unloading but not initialized yet - skipping save');
        return;
      }

      console.log('[Observer] Page unloading - forcing immediate save...');
      // Synchronous save - best effort before page unloads
      try {
        SDK.getInstance().syncWithLocal(1); // 1 retry, fast as possible
      } catch (error) {
        console.error('[Observer] Error during beforeunload save:', error);
      }

      // Standard browser way to show confirmation dialog (optional)
      // e.preventDefault();
      // e.returnValue = '';
    };

    // Also save when page becomes hidden (user switches tab or minimizes)
    // And reload from cloud when returning (in case data changed on another device)
    const handleVisibilityChange = () => {
      if (!useGameStateStore.getState().inited) return;

      if (document.hidden) {
        console.log('[Observer] Tab hidden - forcing immediate save...');
        SDK.getInstance().syncImmediately();
      } else {
        // User returned to tab - sync from cloud to get latest data
        console.log('[Observer] Tab visible - syncing from cloud...');
        SDK.getInstance().syncWithRemote(1);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!inited) return;

    const now = Date.now();
    const timeSinceLastSave = now - lastSaveRef.current;

    // If less than 1 second since last save, debounce
    if (timeSinceLastSave < 1000) {
      if (pendingSaveRef.current) return; // Already have a pending save
      pendingSaveRef.current = true;

      const timeoutId = setTimeout(() => {
        console.log("[Observer] Debounced save to Yandex Cloud...");
        SDK.getInstance().syncWithLocal();
        lastSaveRef.current = Date.now();
        pendingSaveRef.current = false;
      }, 1000 - timeSinceLastSave);

      return () => clearTimeout(timeoutId);
    }

    // Save immediately if more than 1 second since last save
    console.log("[Observer] Immediate save to Yandex Cloud...");
    SDK.getInstance().syncWithLocal();
    lastSaveRef.current = now;
  }, [inited, characters, equipment, usedPromocodes, completedScenes, completedQuests, stageNumber, chapterNumber, gems, gold, summons, summonsSpecial, currentDay, lastClaimedAt, killedEnemies, maxSurvivialDepthPerChapter, visitedPages, boughtProducts, towerFloor])

  return null;
}