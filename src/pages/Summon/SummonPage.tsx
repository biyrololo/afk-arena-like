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

export const SummonPage: FC = () => {
  const sounds = useSoundEffects(SOUNDS);
  const music = useBackgroundMusic(MUSIC.summon, { loop: true, volume: 0.2 });
  const navigate = useNavigate();

  const [isContentModalOpened, setIsContentModalOpened] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  const [summonResult, setSummonResult] = useState<
    DropItem[] | null
  >(null);

  const handleSummon = (amount: 1 | 10) => {
    sounds.playSound('sci_fi_confirm', 0.6)
    setSummonResult(summon(amount, AllBanners[currentBanner].id));
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
        {summonResult ? (
          <>
            <SummonResult result={summonResult[0]} />
            <button
              tabIndex={-1}
              className="absolute bottom-10 right-10 text-white text-6xl font-bold py-8 px-10 rounded bg-black/60 hover:bg-black/80 cursor-pointer"
              onClick={nextSummon}
            >
              Дальше
            </button>
          </>
        ) : (
          <>
            <button
              tabIndex={-1}
              className="
                                  absolute left-4 top-4
                                  px-6 py-3
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
              <span className="text-3xl">←</span>
              Назад
            </button>
            <button
              tabIndex={-1}
              className="absolute top-1/2 left-10 text-white font-bold text-5xl bg-black/60 hover:bg-black/80 cursor-pointer py-10 px-10 rounded"
              onClick={() =>
                setCurrentBanner(
                  (prevBanner) =>
                    (prevBanner - 1 + AllBanners.length) % AllBanners.length,
                )
              }
            >
              {"<"}
            </button>
            <button
              tabIndex={-1}
              className="absolute top-1/2 right-10 text-white font-bold text-5xl bg-black/60 hover:bg-black/80 cursor-pointer py-10 px-10 rounded"
              onClick={() =>
                setCurrentBanner(
                  (prevBanner) => (prevBanner + 1) % AllBanners.length,
                )
              }
            >
              {">"}
            </button>
            <AnimatePresence>
              <SummonBanner
                {...AllBanners[currentBanner]}
                key={AllBanners[currentBanner].id}
              />
            </AnimatePresence>
            <SummonBalances />
            <Button onClick={() => setIsContentModalOpened(true)} className="absolute bottom-10 py-6 bg-red-500 hover:not-disabled:bg-red-700 text-white font-bold text-2xl rounded left-60">
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
