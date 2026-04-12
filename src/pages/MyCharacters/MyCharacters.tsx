import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Balances } from "@/widgets/Balances/Balances";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { useMemo } from "react";
import { Button } from "@/shared/ui/Button/Button";

import bg from '@/assets/backgrounds/characters.webp';
import { calculateStatsWithEquipment } from "@/shared/types/develop";
import { AnimatePresence, motion } from "framer-motion";
import { Music } from "./Music";
import { ArrowLeft } from "lucide-react";

const PER_PAGE = 4 * 4;

export function MyCharacters() {
    const [params, setParams] = useSearchParams();

    const page = parseInt(params.get("page") ?? "0") ?? 0;

    const navitate = useNavigate();
    const { characters } = usePlayerCharactersStore();

    const paginatedCharacters = useMemo(() => {
        return [...characters].sort((a, b) => calculateStatsWithEquipment(b).power - calculateStatsWithEquipment(a).power).slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
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
            page: (page + 1).toString()
        });
    }

    const handlePrevious = () => {
        setParams({
            ...params,
            page: (page - 1).toString()
        });
    }

    const handleBack = () => {
        navitate('/');
    }

    return (
        <ResponsiveUI>
            <Music />
            <div
                className={`
                w-full h-full relative
                bg-center bg-cover bg-no-repeat
            `}
                style={{
                    backgroundImage: `url(${bg})`
                }}
            >
                <Balances />
                <div className="absolute inset-0 py-4 flex px-2">
                    <button
                        tabIndex={-1}
                        className="
                            absolute left-4
                            px-6 py-6
                            bg-gradient-to-r from-amber-700 to-amber-900
                            text-white text-4xl font-bold
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
                    <div className="w-[1000px] mx-auto mt-24 flex flex-col gap-12 items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                    delay: 0.0001 // Тот самый хак
                                }}
                                style={{
                                    willChange: "transform, opacity",
                                    transform: "translateZ(0)", // Форсируем создание единого слоя
                                    // contain: "paint",           // Говорим браузеру не смотреть внутрь при отрисовке
                                }}
                            >

                                <section className="grid grid-cols-4 gap-x-4 gap-y-2"
                                >
                                    {
                                        paginatedCharacters.map((character) => {
                                            return (
                                                <HeroMiniCard
                                                    character={character}
                                                    key={character.id}
                                                    onClick={() => {
                                                        navitate(`/my-characters/${character.id}`)
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </section>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex gap-4 justify-between w-full px-20 mt-auto">
                            <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
                                {'<'}
                            </Button>
                            <p className="text-white text-2xl flex items-center">
                                {page + 1} / {Math.ceil(characters.length / PER_PAGE)}
                            </p>
                            <Button onClick={handleNext} disabled={isNextDisabled}>
                                {'>'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveUI>
    )
}