import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Balances } from "@/widgets/Balances/Balances";
import { useEffect, useMemo, useState, type FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { calculateEquipmentPower, GEMS_FOR_SELL_BY_RARITY, sellEquipment } from "@/shared/types/develop";
import { Avatars } from "@/shared/avatars";
import { AnimatePresence, motion } from "framer-motion";
import { useBackgroundMusic } from "@/shared/hooks/useBackgroundMusic";
import { MUSIC } from "@/assets/music/music";
import tavern from "@/assets/backgrounds/tavern.webp";
import { Icon } from "@/shared/ui/Icon/Icon";
import { EquipmentShortCard } from "@/entities/character/ui/EquipmentCard/EquipmentShortCard";
import { Check, Trash } from "lucide-react";

const PER_PAGE = 10 * 5;

export const MyEquipmentPage: FC = () => {
  const music = useBackgroundMusic(MUSIC.menu, { loop: true, volume: 0.2 });
  const [params, setParams] = useSearchParams();

  const page = parseInt(params.get("page") ?? "0") ?? 0;

  const navitate = useNavigate();
  const { equipment, characters } = usePlayerCharactersStore();

  const sortedEquipment = useMemo(() => {
    return [...equipment].sort(
      (a, b) => calculateEquipmentPower(b) - calculateEquipmentPower(a),
    );
  }, [equipment]);

  const paginatedEquipment = useMemo(() => {
    return sortedEquipment.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  }, [sortedEquipment, page, PER_PAGE]);

  const isNextDisabled = useMemo(() => {
    return page * PER_PAGE + PER_PAGE >= sortedEquipment.length;
  }, [sortedEquipment, page, PER_PAGE]);

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

  useEffect(() => {
    music.play();
    return () => {
      music.stop();
    };
  }, [music.play]);

  useEffect(() => {
    if (paginatedEquipment.length === 0 && equipment.length > 0) {
      setParams({
        ...params,
        page: "0",
      });
    }
  }, [paginatedEquipment, equipment])

  const [isSelectMode, setIsSelectMode] = useState(false);

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const toggleEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter((i) => i !== id));
    } else {
      setSelectedEquipment([...selectedEquipment, id]);
    }
  }

  const sellPrice = useMemo(() => {
    return selectedEquipment.reduce((acc, id) => {
      const item = equipment.find((e) => e.id === id);
      if (item) {
        return {
          gems: acc.gems + GEMS_FOR_SELL_BY_RARITY[item.rarity],
          gold: acc.gold + Math.floor(calculateEquipmentPower(item) * 20 * (100 + GEMS_FOR_SELL_BY_RARITY[item.rarity]) / 100),
          summons: 0,
          summonsSpecial: 0
        };
      }
      return acc;
    }, { gems: 0, gold: 0, summons: 0, summonsSpecial: 0 });
  }, [selectedEquipment, equipment])

  const sellSelected = () => {
    selectedEquipment.forEach(sellEquipment);
    setSelectedEquipment([]);
  };

  return (
    <ResponsiveUI>
      <div
        className={`
                w-full h-full relative
                bg-cover
            `}
        style={{
          backgroundImage: `url(${tavern})`,
        }}
      >
        <Balances />
      </div>
      <div className="absolute inset-0 py-4 flex px-2 backdrop-blur-sm">
        <button
          tabIndex={-1}
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
        <div className="w-[1700px] mx-auto mt-24 flex flex-col gap-4 items-center">
          <AnimatePresence mode="wait">
            <motion.section
              className="grid grid-cols-10 gap-x-8 gap-y-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={page}
            >
              {
                paginatedEquipment.length === 0 && (
                  <div className="col-span-10 flex items-center justify-center text-white/70 text-5xl mt-30">
                    Пусто
                  </div>
                )
              }
              {paginatedEquipment.map((eq) => {
                let equippedCharacter = characters.find(
                  (c) => c.id === eq.equippedCharacterId,
                );
                const selected = selectedEquipment.includes(eq.id);
                return (
                  <EquipmentShortCard
                    key={eq.id}
                    equipment={eq}
                    withEquipedCharacter={
                      equippedCharacter
                        ? Avatars[equippedCharacter.key as keyof typeof Avatars]
                        : undefined
                    }
                    withoutAnimation
                    onClick={() => {
                      if (isSelectMode) {
                        toggleEquipment(eq.id);
                      } else {
                        navitate(`/my-equipment/${eq.id}`);
                      }
                    }}
                    className={selected ? 'border-green-500 bg-green-800/50' : undefined}
                  />
                );
              })}
            </motion.section>
          </AnimatePresence>
          <div className="grid grid-cols-2 w-full mt-auto gap-32">
            <Button onClick={() => {
              if (isSelectMode) {
                setIsSelectMode(false);
                setSelectedEquipment([]);
              } else {
                setIsSelectMode(true);
              }
            }}
              className={`justify-center ${isSelectMode && 'bg-green-700 hover:bg-green-600!'}`}
            >
              <Check width={30} height={30} />
              {
                isSelectMode ? `Выделено: ${selectedEquipment.length}` : 'Выделение'
              }
            </Button>
            <Button onClick={sellSelected}
              disabled={selectedEquipment.length === 0}
              className="bg-red-700 hover:bg-red-600! text-xl justify-center min-h-[80px]"
            >
              <Trash width={40} height={40} />
              {
                isSelectMode && selectedEquipment.length ? (
                  <>
                    Продать выделенное за
                    {
                      Object.entries(sellPrice).filter(([_, amount]) => amount > 0)
                        .map(([resource, amount]) => (
                          <div key={resource} className="flex items-center gap-2">
                            {amount}
                            <Icon icon={resource as any} />
                          </div>
                        ))
                    }
                  </>
                ) : 'Продать выделенное'
              }
            </Button>
          </div>
          <div className="flex gap-32 justify-center w-full mx-auto px-20 mt-4 items-center">
            <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
              {"<"}
            </Button>
            <span className="text-2xl font-bold text-white w-[150px] text-center">
              {page + 1} / {Math.ceil(sortedEquipment.length / PER_PAGE)}
            </span>
            <Button onClick={handleNext} disabled={isNextDisabled}>
              {">"}
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveUI>
  );
};
