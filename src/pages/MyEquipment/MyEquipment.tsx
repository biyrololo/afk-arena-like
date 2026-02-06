import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { Balances } from "@/widgets/Balances/Balances";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { useMemo, type FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { EquipmentFullCard } from "@/entities/character/ui/EquipmentCard/EquipmentFullCard";
import { assets } from "@/shared/assets";
import { calculateEquipmentPower } from "@/shared/types/develop";

const PER_PAGE = 3 * 3;

export const MyEquipmentPage: FC = () => {
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

  return (
    <ResponsiveUI>
      <div
        className={`
                w-full h-full relative
                bg-[url('/assets/backgrounds/tavern.png')]
                bg-cover
            `}
      >
        <Balances />
      </div>
      <div className="absolute inset-0 py-4 flex px-2">
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
        <div className="w-[1800px] mx-auto mt-24 flex flex-col gap-12 items-center">
          <section className="grid grid-cols-3 gap-4 w-full">
            {paginatedEquipment.map((eq) => {
              let equippedCharacter = characters.find(
                (c) => c.id === eq.equippedCharacterId,
              );
              return (
                <EquipmentFullCard
                  key={eq.id}
                  equipment={eq}
                  withEquipedCharacter={
                    equippedCharacter
                      ? assets[
                          `${equippedCharacter.key}Mini` as keyof typeof assets
                        ]
                      : undefined
                  }
                  onClick={() => navitate(`/my-equipment/${eq.id}`)}
                />
              );
            })}
          </section>
          <div className="flex gap-4 justify-between w-full px-20 mt-auto">
            <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
              {"<"}
            </Button>
            <span className="text-2xl font-bold text-white">
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
