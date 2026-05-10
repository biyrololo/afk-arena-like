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
import { usePreloadAssets } from "@/shared/hooks/useAssetsPreload";
import { Avatars } from "@/shared/avatars";
import { Icons } from "@/shared/icons";
import { Backgrounds } from "@/shared/backgrounds";

import crystal from "@/assets/menu/crystal.png";
import sword from "@/assets/menu/sword.png";
import heroes from "@/assets/menu/heroes.png";
import equipment from "@/assets/menu/equipment.png";
import tower from "@/assets/menu/tower.webp";
import shop from "@/assets/menu/shop.png";
import survival from "@/assets/menu/survival.webp";
import quests from '@/assets/menu/quests.webp'
import summon from "@/assets/backgrounds/summon.webp";
import characters from '@/assets/backgrounds/characters.webp';
import tavern from "@/assets/backgrounds/tavern.webp";
import shopBg from "@/assets/backgrounds/shop.webp";
import gameStart from "@/assets/backgrounds/gamestart.webp";
import menu from '@/assets/menu/menu.webp'
import loading_bg from '@/assets/backgrounds/wallpaper.webp'

import featuredImage1 from '@/assets/banners/featured/banner1.webp';
import featuredImage2 from '@/assets/banners/featured/banner2.webp';
import featuredImage3 from '@/assets/banners/featured/banner3.webp';
import featuredImage4 from '@/assets/banners/featured/banner4.webp';
import banner1 from "@/assets/banners/banner1.webp";
import banner2 from "@/assets/banners/banner2.webp";

import scene1 from '@/assets/scenes/scene-1.webp';
import scene2 from '@/assets/scenes/scene-2.webp';
import scene3 from '@/assets/scenes/scene-3.webp';
import scene4 from '@/assets/scenes/scene-4.webp';
import scene5 from '@/assets/scenes/scene-5.webp';
import scene6 from '@/assets/scenes/scene-6.webp';
import kitsune_appear from '@/assets/scenes/kitsune_appear.webp'
import kitsune_before_battle from '@/assets/scenes/kitsune_before_battle.webp'
import kitsune_escape from '@/assets/scenes/kitsune_escape.webp'
import spearwoman_appear from '@/assets/scenes/spearwoman_appear.webp'
import spearwoman_heal from '@/assets/scenes/spearwoman_heal.webp'
import crystalKing_rage from '@/assets/scenes/crystalKing_rage.webp'
import chapter_3_final from '@/assets/scenes/chapter_3_final.webp'
import womanwarrior_appear from '@/assets/scenes/womanwarrior_appear.webp'
import womanwarrior_lose from '@/assets/scenes/womanwarrior_lose.webp'
import firewarrior_appear from '@/assets/scenes/firewarrior_appear.webp'
import out_of_ice_cave from '@/assets/scenes/out_of_ice_cave.webp'
import frost_guardian_appear from '@/assets/scenes/frost_guardian_appear.webp'
import frost_guardian_lose from '@/assets/scenes/frost_guardian_lose.webp'
import chapter_1_final from '@/assets/scenes/chatper_1_final.webp'

import { fixEquipment } from "@/shared/types/develop";

const assetUrls = {
  rest: [
    loading_bg, menu, scene1, scene2, scene3, scene4, scene5, scene6,
    crystal, sword, heroes, equipment, shop, survival, quests, banner1, banner2, featuredImage1, featuredImage2, featuredImage3, featuredImage4,
    summon, characters, tavern, shopBg, gameStart, tower,
    kitsune_appear, kitsune_before_battle, kitsune_escape, spearwoman_appear, spearwoman_heal, crystalKing_rage, chapter_3_final, womanwarrior_appear, womanwarrior_lose, firewarrior_appear, out_of_ice_cave, frost_guardian_appear, frost_guardian_lose, chapter_1_final,
  ],
  avatars: Object.values(Avatars),
  icons: Object.values(Icons),
  backgrounds: Object.values(Backgrounds),
};


export const Wrapper: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inited] = useGameStateStore(useShallow((state) => [state.inited]));
  const { isReady } = usePreloadAssets(assetUrls);

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
    if (isLoaded && isReady) {
      SDK.getInstance()
        .gameReady()
    }
    if (isLoaded && inited && isReady) {
      SDK.getInstance()
        .gameStart()
      useGameStateStore.getState().setLastAdAt(new Date().getTime());
      document.getElementById('loading')?.remove();
      fixEquipment();
    }
  }, [isLoaded, inited, isReady])

  if (!isLoaded || !inited || !isReady) {
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
