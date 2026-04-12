import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { useEffect, useState, type FC } from "react";
import { Actions } from "./ui/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { AllBanners } from "@/entities/summon/lib/summon.store";
import { SummonBanner } from "./ui/Banner/Banner";
import { SummonResult } from "./ui/SummonResult/SummonResult";
import { summon, type DropItem } from "@/entities/summon/lib/summon";

import bg from "@/assets/backgrounds/summon.webp";
import { AnimatePresence } from "framer-motion";
import { useBackgroundMusic } from "@/shared/hooks/useBackgroundMusic";
import { MUSIC } from "@/assets/music/music";
import { useSoundEffects } from "@/shared/hooks/useSoundEffects";
import { SOUNDS } from "@/assets/sound/sounds";
import { SummonBalances } from "@/widgets/Balances/SummonBalances";
import { Button } from "@/shared/ui/Button/Button";
import { ContentModal } from "./ui/ContentModal/ContentModal";
import { Analytics, GameGoal } from "@/shared/lib/analytics";
import { ArrowLeft, Book, ChevronLeft, ChevronRight } from "lucide-react";
import { BannersRow } from "./ui/BannersRow/BannersRow";
import { SummonResultsGrid } from "./ui/SummonResultsGrid/SummonResultsGrid";

export const SummonPage: FC = () => {
  const sounds = useSoundEffects(SOUNDS);
  const music = useBackgroundMusic(MUSIC.summon, { loop: true, volume: 0.2 });
  const navigate = useNavigate();

  const [isContentModalOpened, setIsContentModalOpened] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(0);

  const handleBack = () => {
    navigate('/');
  };

  const [summonResult, setSummonResult] = useState<
    DropItem[] | null
  >(null);

  const [allSummonResults, setAllSummonResults] = useState<DropItem[] | null>(null);

  const handleSummon = (amount: 1 | 10) => {
    const FEATURED_ROTATION_START = new Date("2025-01-01").getTime();
    const WEEK = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);
    Analytics.send(GameGoal.FirstGachaSpin, {
      amount,
      bannerId: AllBanners[currentBanner].id,
      curentBannerRotation: weekIndex
    });
    sounds.playSound('sci_fi_confirm', 0.6)
    const result = summon(amount, AllBanners[currentBanner].id);
    Analytics.send(GameGoal.GachaResultRarity, { result_rarities: JSON.stringify(result.map((item) => item.item.rarity)) });
    setSummonResult(result);
    if (amount > 1)
      setAllSummonResults(result);
  };

  const nextSummon = () => {
    setSummonResult((prev) => {
      if (!prev || prev.length <= 1) return null;
      return prev.slice(1);
    });
  };

  useEffect(() => {
    music.play();

    return () => {
      music.stop();
    };
  }, [music.play]);

  return (
    <ResponsiveUI>
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {(summonResult || allSummonResults) ? (
          <>
            {
              summonResult ?
                <SummonResult result={summonResult[0]} /> :
                <SummonResultsGrid results={allSummonResults!} />
            }
            <button
              tabIndex={-1}
              className="absolute bottom-10 right-10 text-white text-6xl font-bold py-8 px-10 rounded bg-purple-800/60 hover:bg-purple-800/80 cursor-pointer z-50"
              onClick={() => {
                if (summonResult) {
                  nextSummon();
                } else {
                  setAllSummonResults(null);
                }
              }}
            >
              Дальше
            </button>
            {
              allSummonResults && summonResult && (
                <button
                  tabIndex={-1}
                  className="absolute bottom-10 right-110 text-white text-6xl font-bold py-8 px-10 rounded bg-purple-800/60 hover:bg-purple-800/80 cursor-pointer z-50"
                  onClick={() => {
                    setSummonResult(null);
                  }}
                >
                  Пропустить
                </button>
              )
            }
          </>
        ) : (
          <>
            <button
              tabIndex={-1}
              className="
                                  absolute left-4 top-4
                                  px-5 py-6
                                  bg-gradient-to-r from-amber-700 to-amber-900
                                  text-white text-2xl font-bold
                                  rounded-xl
                                  border-2 border-amber-500
                                  shadow-lg
                                  transform transition-all duration-300
                                  hover:scale-105 hover:from-amber-600 hover:to-amber-800
                                  active:scale-95
                                  self-start
                                  flex items-center gap-2
                              "
              onClick={handleBack}
            >
              <ArrowLeft strokeWidth={3} width={30} height={30} />
              Назад
            </button>
            <button
              tabIndex={-1}
              className="absolute top-1/2 left-10 text-white font-bold text-5xl bg-black/60 hover:bg-stone-400/60 duration-100 cursor-pointer py-10 px-5 rounded-2xl border-2 border-white/50"
              onClick={() =>
                setCurrentBanner(
                  (prevBanner) =>
                    (prevBanner - 1 + AllBanners.length) % AllBanners.length,
                )
              }
            >
              <ChevronLeft className="text-white" width={80} height={80} />
            </button>
            <button
              tabIndex={-1}
              className="absolute top-1/2 right-10 text-white font-bold text-5xl bg-black/60 hover:bg-stone-400/60 duration-100 cursor-pointer py-10 px-5 rounded-2xl border-2 border-white/50"
              onClick={() =>
                setCurrentBanner(
                  (prevBanner) => (prevBanner + 1) % AllBanners.length,
                )
              }
            >
              <ChevronRight className="text-white" width={80} height={80} />
            </button>
            <BannersRow
              banners={AllBanners}
              activeBanner={AllBanners[currentBanner].id}
              onBannerClick={b => setCurrentBanner(AllBanners.findIndex(i => i.id === b))}
            />
            <AnimatePresence>
              <SummonBanner
                {...AllBanners[currentBanner]}
                key={AllBanners[currentBanner].id}
              />
            </AnimatePresence>
            <SummonBalances />
            <Button onClick={() => setIsContentModalOpened(true)} className="absolute bottom-10 py-6 bg-red-500 hover:not-disabled:bg-red-700 text-white font-bold text-2xl rounded left-60 flex gap-2 items-center">
              <Book />
              Содержимое
            </Button>
            <Actions summon={handleSummon} valute={AllBanners[currentBanner]?.valute} bannerId={AllBanners[currentBanner]?.id} />
            <AnimatePresence>
              <ContentModal key={1} isOpened={isContentModalOpened} close={() => setIsContentModalOpened(false)} bannerId={AllBanners[currentBanner]?.id} />
            </AnimatePresence>
          </>
        )}
      </div>
    </ResponsiveUI>
  );
};
