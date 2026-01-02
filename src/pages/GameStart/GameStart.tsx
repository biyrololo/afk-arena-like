import { useMemo, useState } from "react"

import type { PlayerCharacter } from "@/shared/types/PlayerCharacter"
import { useNavigate } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";

export default function GameStart() {
    const navitate = useNavigate();

    const [selectedCharacters, setSelectedCharacters] = useState<Array<PlayerCharacter | null>>([
        null,null,null,null
    ]);
    const { characters } = usePlayerCharactersStore();

    const handleBack = () => {
        navitate(-1);
    }

    const handleStart = () => {
        setSelectedCharacters([null,null,null,null]);
        navitate('/game', {
            replace: true,
            state: {
                characters: selectedCharacters
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

    return (
        <div
        className={`
            w-[1400px] h-[800px] relative
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
                <div className="w-[500px] mx-auto flex flex-col gap-12">
                    <section className="grid grid-cols-4">
                        {
                            selectedCharacters.map((character, index) => {
                                return (
                                    <button 
                                    key={index}
                                    className="size-[100px] bg-zinc-600 bg-cover cursor-pointer"
                                    style={{
                                        backgroundImage: character ? `url(/assets/${character.key}Mini.png)` : '',
                                    }}
                                    onClick={() => character && toogleCharacter(character)}
                                    >
                                        
                                    </button>
                                )
                            })
                        }
                    </section>
                    <section className="grid grid-cols-4 gap-y-4">
                        {
                            characters.map((character, index) => {
                                return (
                                    <button 
                                    key={index}
                                    className="size-[100px] bg-zinc-600 bg-cover cursor-pointer"
                                    style={{
                                        backgroundImage: `url(/assets/${character.key}Mini.png)`,
                                        opacity: selectedCharacters.includes(character) ? 0.5 : 1
                                    }}
                                    disabled={selectedCharacters.includes(character)}
                                    onClick={() => toogleCharacter(character)}
                                    >
                                        
                                    </button>
                                )
                            })
                        }
                    </section>
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
    )
}