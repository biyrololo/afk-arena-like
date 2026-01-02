import { useNavigate } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";

export function MyCharacters() {
    const navitate = useNavigate();
    const { characters } = usePlayerCharactersStore();

    const handleBack = () => {
        navitate(-1);
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
                    <section className="grid grid-cols-4 gap-y-4">
                        {
                            characters.map((character, index) => {
                                return (
                                    <button 
                                    key={index}
                                    className="size-[100px] bg-zinc-600 bg-cover cursor-pointer"
                                    style={{
                                        backgroundImage: `url(/assets/${character.key}Mini.png)`,
                                    }}
                                    onClick={() => {
                                        navitate(`/my-characters/${character.id}`)
                                    }}
                                    >
                                        
                                    </button>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}