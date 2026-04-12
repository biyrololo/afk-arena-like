import { useNavigate } from "react-router-dom";

import crystal from "@/assets/menu/crystal.png";
import sword from "@/assets/menu/sword.png";
import heroes from "@/assets/menu/heroes.png";
import equipment from "@/assets/menu/equipment.png";
import shop from "@/assets/menu/shop.png";
import survival from "@/assets/menu/survival.png";
import quests from '@/assets/menu/quests.webp'

import classes from "./MenuUI.module.css";
import { Balances } from "../Balances/Balances";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { openQuestsModal, QUESTS, useQuestsStore } from "@/entities/quest/model/quest.store";
import { QuestsModal } from "@/entities/quest/ui/QuestsModal/QuestsModal";
import { DailyRewardsModal } from "@/entities/daily-reward/ui/daily-rewards-modal";
import { useBackgroundMusic } from "@/shared/hooks/useBackgroundMusic";
import { MUSIC } from "@/assets/music/music";
import { useEffect } from "react";
import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { AdModal } from "../AdModal/AdModal";
import { TogleMusicButton } from "../TogleMusicButton/TogleMusicButton";
import { Analytics, GameGoal } from "@/shared/lib/analytics";
import { PlotModal } from "@/entities/plot/ui/PlotModal/PlotModal";
import { useDailyRewardsStore } from "@/entities/daily-reward/model/daily-reward.store";
import classNames from "classnames";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";
import { Info } from "lucide-react";

export default function MenuUI() {
  const [clicked, clickDone] = useGameStateStore(useShallow(state => [
    state.clicked,
    state.clickDone
  ]))
  const music = useBackgroundMusic(MUSIC.menu, { loop: true, volume: 0.5 })

  const [visitedPages, visitPage] = usePlayerStatsStore(useShallow(state => [state.visitedPages, state.visitPage]));

  const isShopVisited = visitedPages.shop === true;

  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game/start");
  };

  const crystalAspectRatio = 722 / 601;
  const swordAspectRatio = 249 / 322;
  const heroesAspectRatio = 400 / 322;
  const equipmentAspectRatio = 400 / 422;
  const survivalAspectRatio = 300 / 242;

  const shopAspectRatio = 100 / 131;
  const questsAspectRatio = 1;

  const completedQuests = useQuestsStore(useShallow(state => state.completedQuests))

  const isSomeQuestDidntClaimed = QUESTS.some(quest => quest.getProgress() === 1 && !completedQuests.includes(quest.id))

  const [chapterNumber, stageNumber] = usePlayerStore(
    useShallow((state) => [state.chapterNumber, state.stageNumber]),
  );

  const isOpenedModal = useDailyRewardsStore(useShallow(state => state.isOpenedModal));

  useEffect(() => {
    if (clicked) {
      console.log("Playing music...");
      music.play();
    }
    return () => {
      music.stop();
    }
  }, [clicked])

  return (
    <div className="absolute inset-0"
      onClick={e => {
        if (e.target === e.currentTarget) {
          clickDone();
        }
      }}
    >
      <Balances />
      <div
        className={`${classes["magic-glow"]}`}
        style={{
          width: 500,
          height: 500 / crystalAspectRatio,
          right: 190,
          bottom: 300,
        }}
      />
      <div
        className={`
                absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100
                `}
        style={{
          backgroundImage: `url(${crystal})`,
          backgroundSize: "contain",
          width: 400,
          height: 400 / crystalAspectRatio,
          right: 190,
          bottom: 220,
        }}
        onClick={() => {
          Analytics.send(GameGoal.ClickGachaMenu)
          navigate("/summon")
        }}
      >
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-40">
          Призыв
        </span>
      </div>
      <div
        className={
          classNames(
            "absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100",
            stageNumber === 1 && chapterNumber === 1 && classes['start-game-scaling']
          )
        }
        style={{
          backgroundImage: `url(${sword})`,
          backgroundSize: "contain",
          width: 400,
          height: 400 / swordAspectRatio,
          left: 760,
          bottom: 70,
        }}
        onClick={() => handleStartGame()}
      >
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-60">
          В бой
        </span>
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-4">{`Этап ${chapterNumber}-${stageNumber}`}</span>
      </div>
      <div
        className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
        style={{
          backgroundImage: `url(${heroes})`,
          backgroundSize: "contain",
          width: 600,
          height: 600 / heroesAspectRatio,
          left: 150,
          bottom: 430,
        }}
        onClick={() => {
          Analytics.send(GameGoal.ClickHeroesInventory)
          navigate("/my-characters");
        }}
      >
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-80">
          Герои
        </span>
      </div>
      <div
        className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
        style={{
          backgroundImage: `url(${equipment})`,
          backgroundSize: "contain",
          width: 140,
          height: 140 / equipmentAspectRatio,
          right: 350,
          top: 140,
        }}
        onClick={() => navigate("/my-equipment")}
      >
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-35">
          Снаряжение
        </span>
      </div>
      <div
        className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
        style={{
          backgroundImage: `url(${quests})`,
          backgroundSize: "contain",
          width: 155,
          height: 155 / questsAspectRatio,
          right: 600,
          top: 140,
        }}
        onClick={() => openQuestsModal()}
      >
        {
          isSomeQuestDidntClaimed && (
            <div className="absolute right-2 top-2 flex items-center justify-center w-10 h-10 bg-red-500 rounded-full text-white text-2xl">
              !
            </div>
          )
        }
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-35">
          Задания
        </span>
      </div>
      <div
        className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
        style={{
          backgroundImage: `url(${shop})`,
          backgroundSize: "contain",
          width: 100,
          height: 100 / shopAspectRatio,
          right: 100,
          top: 120,
        }}
        onClick={() => {
          visitPage("shop");
          Analytics.send(GameGoal.OpenShopScreen)
          navigate("/shop");
        }}
      >
        {
          Boolean(!isShopVisited && stageNumber > 1) && (
            <div className="bg-red-500 p-2 absolute -top-4 -left-8 rounded-full">
              <Info width={50} height={50} color="white" />
            </div>
          )
        }
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-48">
          Магазин
        </span>
      </div>
      <div
        className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
        style={{
          backgroundImage: `url(${survival})`,
          backgroundSize: "contain",
          width: 350,
          height: 350 / survivalAspectRatio,
          left: 200,
          bottom: 70,
        }}
        onClick={() => {
          Analytics.send(GameGoal.ClickStartBattleSurvival)
          navigate("/game/survival/start/1");
        }}
      >
        <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-48">
          Выживание
        </span>
      </div>
      <TogleMusicButton />
      <QuestsModal />
      <DailyRewardsModal />
      {!isOpenedModal && <PlotModal />}
      <AdModal />
    </div>
  );
}
