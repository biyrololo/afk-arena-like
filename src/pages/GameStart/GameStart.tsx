import { useEffect, useMemo, useState } from "react";

import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { Button } from "@/shared/ui/Button/Button";
import {
  usePlayerStore,
  type SquadList,
} from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { findStage } from "@/entities/chapter/lib/chapters";

import background from "@/assets/backgrounds/gamestart.webp";
import { calculateCharacterPower, calculateStatsWithEquipment } from "@/shared/types/develop";
import { AnimatePresence, motion } from "framer-motion";

const PER_PAGE = 4 * 3;

export default function GameStart() {
  const navitate = useNavigate();

  const [params, setParams] = useSearchParams();

  const page = parseInt(params.get("page") ?? "0") ?? 0;

  const [selectedCharacters, setSelectedCharacters] = useState<
    Array<PlayerCharacter | null>
  >([null, null, null, null]);
  const { characters } = usePlayerCharactersStore();

  const [chapterNumber, stageNumber, lastSquad, setLastSquad] = usePlayerStore(
    useShallow((state) => [
      state.chapterNumber,
      state.stageNumber,
      state.lastSquad,
      state.setLastSquad,
    ]),
  );

  useEffect(() => {
    setSelectedCharacters(
      lastSquad.map((id) => {
        if (!id) return null;
        return characters.find((character) => character.id === id) ?? null;
      }),
    );
  }, [lastSquad, setSelectedCharacters]);

  const enemiesPower = useMemo(() => {
    const stage = findStage(chapterNumber, stageNumber);
    if (!stage) return 0;
    return stage.enemies
      .filter((e) => e !== undefined)
      .map((e) => calculateStatsWithEquipment(e).power)
      .reduce((acc, power) => acc + power, 0);
  }, [chapterNumber, stageNumber]);

  const paginatedCharacters = useMemo(() => {
    return [...characters]
      .sort((a, b) => calculateStatsWithEquipment(b).power - calculateStatsWithEquipment(a).power)
      .slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  }, [characters, page, PER_PAGE]);

  const isNextDisabled = useMemo(() => {
    return page * PER_PAGE + PER_PAGE >= characters.length;
  }, [characters, page, PER_PAGE]);

  const isPreviousDisabled = useMemo(() => {
    return page === 0;
  }, [page]);

  const handleNext = () => {
    setParams({
      ...params,
      page: (page + 1).toString(),
    });
  };

  const handlePrevious = () => {
    setParams({
      ...params,
      page: (page - 1).toString(),
    });
  };

  const handleBack = () => {
    navitate("/");
  };

  const handleStart = () => {
    setLastSquad(
      selectedCharacters.map((character) => character?.id ?? null) as SquadList,
    );
    setSelectedCharacters([null, null, null, null]);
    navitate("/game", {
      replace: true,
      state: {
        characters: selectedCharacters,
        chapter: chapterNumber,
        stage: stageNumber,
      },
    });
  };

  const isStartDisabled = useMemo(() => {
    return (
      selectedCharacters.filter((character) => character !== null).length === 0
    );
  }, [selectedCharacters]);

  const toogleCharacter = (character: PlayerCharacter) => {
    const index = selectedCharacters.findIndex((c) => c?.key === character.key);
    if (index !== -1) {
      const newSelectedCharacters = [...selectedCharacters];
      newSelectedCharacters[index] = null;
      setSelectedCharacters(newSelectedCharacters);
    } else {
      const nullIndex = selectedCharacters.indexOf(null);
      if (nullIndex === -1) return;
      const newSelectedCharacters = [...selectedCharacters];
      newSelectedCharacters[nullIndex] = character;
      setSelectedCharacters(newSelectedCharacters);
    }
  };

  const totalPower = useMemo(() => {
    return selectedCharacters.reduce((acc, character) => {
      return acc + (character ? calculateStatsWithEquipment(character).power : 0);
    }, 0);
  }, [selectedCharacters]);

  return (
    <ResponsiveUI>
      <div
        className={`
                w-full h-full relative
                bg-cover
                bg-center
            `}
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 py-4 flex">
          <button
            className="
                          absolute left-4
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
          <div className="w-[1000px] mx-auto flex flex-col gap-4">
            <div className="flex flex-col gap-4 items-center">
              <p className="text-white text-5xl">
                Этап {chapterNumber}-{stageNumber}
              </p>
              <div className="flex gap-4 justify-between w-full px-20 relative z-200">
                <p className="text-white text-2xl">
                  Мощь отряда:{" "}
                  <span
                    className={`font-bold text-3xl ${totalPower < enemiesPower ? "text-red-500" : totalPower > enemiesPower ? "text-green-500 text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]" : ""}`}
                  >
                    {totalPower}
                  </span>
                </p>
                <p className="text-white text-2xl">
                  Мощь врагов:{" "}
                  <span className={`font-bold text-3xl`}>{enemiesPower}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center h-full">
              <section className="grid gap-4 grid-cols-4 bg-black/50 p-2 rounded-xl relative z-100">
                {selectedCharacters.map((character, index) => (
                  <div key={index} className="size-[200px] relative bg-stone-600/80">
                    <AnimatePresence>
                      {
                        character && (
                          <motion.div
                          key={character.id}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          >
                            <HeroMiniCard
                              character={character}
                              onClick={() => toogleCharacter(character)}
                            />
                          </motion.div>

                        )
                      }
                    </AnimatePresence>
                  </div>
                ))}
              </section>
              <AnimatePresence mode="wait">
                <motion.section className="grid grid-cols-4 gap-x-4 gap-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                key={page}
                >
                  {paginatedCharacters.map((character, index) => {
                    return (
                      <HeroMiniCard
                        character={character}
                        key={character.id}
                        style={{
                          opacity: selectedCharacters.some(
                            (c) => c?.key === character.key,
                          )
                            ? 0.5
                            : 1,
                        }}
                        onClick={() => toogleCharacter(character)}
                      />
                    );
                  })}
                </motion.section>
              </AnimatePresence>
              <div className="flex gap-4 justify-between w-full px-20 mt-auto">
                <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
                  {"<"}
                </Button>
                <p className="text-white text-2xl flex items-center">
                  {page + 1} / {Math.ceil(characters.length / PER_PAGE)}
                </p>
                <Button onClick={handleNext} disabled={isNextDisabled}>
                  {">"}
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="text-3xl absolute top-4 right-4 text-white cursor-pointer"
            style={{
              opacity: isStartDisabled ? 0.5 : 1,
            }}
            disabled={isStartDisabled}
            onClick={handleStart}
          >
            Начать
          </Button>
          <p className="text-white text-3xl absolute top-31 left-4 w-[450px] text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)]">
            Это классический режим игры, в котором вы продвигаетесь по сюжету, боритесь с врагами и получаете опыт и ресурсы.
          </p>
        </div>
      </div>
    </ResponsiveUI>
  );
}
