import { useMemo, useState } from "react"

import type { PlayerCharacter } from "@/shared/types/PlayerCharacter"
import { useNavigate, useSearchParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { Button } from "@/shared/ui/Button/Button";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { findStage } from "@/entities/chapter/lib/chapters";

const PER_PAGE = 4 * 3;

export default function GameStart() {
    const navitate = useNavigate();

    const [params, setParams] = useSearchParams();

    const page = parseInt(params.get("page") ?? "0") ?? 0;

    const [selectedCharacters, setSelectedCharacters] = useState<Array<PlayerCharacter | null>>([
        null,null,null,null
    ]);
    const { characters } = usePlayerCharactersStore();

    const [chapterNumber, stageNumber] = usePlayerStore(useShallow(state => [
        state.chapterNumber,
        state.stageNumber
    ]))


    const enemiesPower = useMemo(() => {
        const stage = findStage(chapterNumber, stageNumber);
        if(!stage) return 0;
        return stage.enemies.reduce((acc, enemy) => acc + enemy.power, 0);
    }, [chapterNumber, stageNumber]);

    const paginatedCharacters = useMemo(() => {
        return characters.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
    }, [characters, page]);

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

    const handleStart = () => {
        setSelectedCharacters([null,null,null,null]);
        navitate('/game', {
            replace: true,
            state: {
                characters: selectedCharacters,
                chapter: chapterNumber,
                stage: stageNumber
            }
        })
    }

    const isStartDisabled = useMemo(() => {
        return selectedCharacters.filter((character) => character !== null).length === 0
    }, [selectedCharacters])

    const toogleCharacter = (character: PlayerCharacter) => {
        const index = selectedCharacters.indexOf(character);
        if (index !== -1) {
            const newSelectedCharacters = [...selectedCharacters];
            newSelectedCharacters[index] = null;
            setSelectedCharacters(newSelectedCharacters);
        } else {
            const nullIndex = selectedCharacters.indexOf(null);
            if(nullIndex === -1) return;
            const newSelectedCharacters = [...selectedCharacters];
            newSelectedCharacters[nullIndex] = character;
            setSelectedCharacters(newSelectedCharacters);
        }
    }

    const totalPower = useMemo(() => {
        return selectedCharacters.reduce((acc, character) => {
            return acc + (character?.power || 0);
        }, 0);
    }, [selectedCharacters]);

    return (
        <ResponsiveUI>
            <div
            className={`
                w-full h-full relative
                bg-[url('/assets/backgrounds/tavern.png')]
                bg-cover
            `}
            >
                <div className="absolute inset-0 py-4 flex">
                    <button 
                    className="text-3xl absolute top-4 left-4 text-white cursor-pointer"
                    onClick={handleBack}
                    >
                        Назад
                    </button>
                    <div className="w-[1000px] mx-auto flex flex-col gap-4">
                        <div className="flex flex-col gap-4 items-center">
                            <p className="text-white text-5xl">Этап {chapterNumber}-{stageNumber}</p>
                            <div className="flex gap-4 justify-between w-full px-20">
                                <p className="text-white text-2xl">Мощь отряда: {totalPower}</p>
                                <p className="text-white text-2xl">Мощь врагов: {enemiesPower}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-center h-full">
                            <section className="grid gap-4 grid-cols-4 bg-black/50 p-2 rounded-xl">
                                {
                                    selectedCharacters.map((character, index) => {
                                        if(character) {
                                            return (
                                                <HeroMiniCard 
                                                character={character} 
                                                key={index} 
                                                onClick={() => toogleCharacter(character)}
                                                />
                                            )
                                        }
                                        return (
                                            <button 
                                            key={index}
                                            className="size-[200px] bg-zinc-600 bg-cover cursor-pointer"
                                            >                                                
                                            </button>
                                        )
                                    })
                                }
                            </section>
                            <section className="grid grid-cols-4 gap-4">
                                {
                                    paginatedCharacters.map((character, index) => {
                                        return (
                                            <HeroMiniCard
                                            character={character}
                                            key={character.id}
                                            style={{
                                                opacity: selectedCharacters.includes(character) ? 0.5 : 1,
                                            }}
                                            onClick={() => toogleCharacter(character)}
                                            />
                                        )
                                    })
                                }
                            </section>
                            <div className="flex gap-4 justify-between w-full px-20 mt-auto">
                                <Button
                                onClick={handlePrevious}
                                disabled={isPreviousDisabled}
                                >
                                    {'<'}
                                </Button>
                                <Button
                                onClick={handleNext}
                                disabled={isNextDisabled}
                                >
                                    {'>'}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <button 
                    className="text-3xl absolute top-4 right-4 text-white cursor-pointer"
                    style={{
                        opacity: isStartDisabled ? 0.5 : 1
                    }}
                    disabled={isStartDisabled}
                    onClick={handleStart}
                    >
                        Начать
                    </button>
                </div>
            </div>
        </ResponsiveUI>
    )
}