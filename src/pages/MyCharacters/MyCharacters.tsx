import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { Balances } from "@/widgets/Balances/Balances";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { useMemo } from "react";
import { Button } from "@/shared/ui/Button/Button";

import bg from '@/assets/backgrounds/characters.webp';

const PER_PAGE = 4 * 4;

export function MyCharacters() {
    const [params, setParams] = useSearchParams();

    const page = parseInt(params.get("page") ?? "0") ?? 0;

    const navitate = useNavigate();
    const { characters } = usePlayerCharactersStore();

    const paginatedCharacters = useMemo(() => {
        return characters.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
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
                    <div className="w-[1000px] mx-auto mt-24 flex flex-col gap-12 items-center">
                        <section className="grid grid-cols-4 gap-4">
                            {
                                paginatedCharacters.map((character, index) => {
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
                        <div className="flex gap-4 justify-between w-full px-20 mt-auto">
                            <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
                                {'<'}
                            </Button>
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