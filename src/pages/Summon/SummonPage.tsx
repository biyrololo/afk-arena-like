import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { useState, type FC } from "react";
import { Actions } from "./ui/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { Balances } from "@/widgets/Balances/Balances";
import { AllBanners } from "@/entities/summon/lib/summon.store";
import { SummonBanner } from "./ui/Banner/Banner";
import { Character } from "@/shared/types/character";
import { SummonResult } from "./ui/SummonResult/SummonResult";
import { summon } from "@/entities/summon/lib/summon";

import bg from '@/assets/backgrounds/summon.webp';


export const SummonPage: FC = () => {
    const navigate = useNavigate();

    const [currentBanner, setCurrentBanner] = useState(0);

    const handleBack = () => {
        navigate(-1);
    };

    const [summonResult, setSummonResult] = useState<Character.Character[] | null>(null);

    const handleSummon = (amount: 1 | 10) => {
        setSummonResult(summon(amount));
    };

    const nextSummon = () => {
        setSummonResult(prev => {
            if(!prev || prev.length <= 1) return null;
            return prev.slice(1)
        });
    };

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
                {
                    summonResult ? (
                        <>
                            <SummonResult result={summonResult[0]} />
                            <button
                            className="absolute bottom-10 right-10 text-white text-5xl font-bold py-2 px-4 rounded bg-black/60 hover:bg-black/80 cursor-pointer"
                            onClick={nextSummon}
                            >
                                Дальше
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleBack} className="absolute top-4 left-4 text-white text-5xl font-bold py-2 px-4 rounded">
                                Назад
                            </button>
                            <button
                            className="absolute top-1/2 left-10 text-white font-bold text-5xl bg-black/60 hover:bg-black/80 cursor-pointer py-10 px-10 rounded"
                            onClick={() => setCurrentBanner((prevBanner) => (prevBanner - 1 + AllBanners.length) % AllBanners.length)}
                            >
                                {'<'}
                            </button>
                            <button
                            className="absolute top-1/2 right-10 text-white font-bold text-5xl bg-black/60 hover:bg-black/80 cursor-pointer py-10 px-10 rounded"
                            onClick={() => setCurrentBanner((prevBanner) => (prevBanner + 1) % AllBanners.length)}
                            >
                                {'>'}
                            </button>
                            <SummonBanner {...AllBanners[currentBanner]} />
                            <Balances />
                            <Actions summon={handleSummon} />
                        </>
                    )
                }
            </div>
        </ResponsiveUI>
    )
};
