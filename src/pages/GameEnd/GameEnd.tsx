import type { IStageReward } from "@/entities/chapter/lib/chapter.model";
import { findStage, nextStage } from "@/entities/chapter/lib/chapters";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Icon } from "@/shared/ui/Icon/Icon";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { useEffect, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const GameEnd: FC = () => {
    const { state } = useLocation();

    const { setEquipment } = usePlayerCharactersStore();

    const [balances, setBalances, setChapterNumber, setStageNumber] = usePlayerStore(useShallow(state => [
        state.balances,
        state.setBalances,
        state.setChapterNumber,
        state.setStageNumber
    ]))

    const navigate = useNavigate();

    const [reward, setReward] = useState<IStageReward | undefined>(undefined);

    useEffect(() => {
        console.log('state', state);
        if(!state) return;
        if(!state.chapter || !state.stage) return;
        if(!state.win) return;
        const { chapter, stage } = state;

        const curStage = findStage(chapter, stage);
        console.log('curStage', curStage);
        setReward(curStage?.rewards);

        setBalances({
            gold: balances.gold + (curStage?.rewards?.balances.gold || 0),
            gems: balances.gems + (curStage?.rewards?.balances.gems || 0),
            summons: balances.summons + (curStage?.rewards?.balances.summons || 0)
        })

        if(curStage?.rewards?.equipment) {
            setEquipment(
                [...usePlayerCharactersStore
                .getState()
                .equipment,
                ...curStage?.rewards.equipment]
            )
        }

        const next = nextStage(chapter, stage); 

        if(next) {
            setChapterNumber(next[0]);
            setStageNumber(next[1]);
        } else {
            setChapterNumber(-1);
            setStageNumber(-1);
        }

    }, [state, setReward, setChapterNumber, setStageNumber, setEquipment])

    if(!state || !('win' in state)) {
        navigate('/');
        return null;
    }

    const goToMenu = () => {
        navigate('/');
    };

    if(state.win) {
        return (
            <ResponsiveUI>
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/80 via-indigo-900/60 to-black/90 p-8 relative overflow-hidden">
                    {/* Victory particles background */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: '3s'
                                }}
                            />
                        ))}
                    </div>

                    {/* Victory crown icon */}
                    <div className="text-9xl mb-4 text-yellow-400 animate-bounce drop-shadow-[0_0_20px_rgba(255,220,0,0.8)]">
                        👑
                    </div>

                    <h1 className="text-7xl font-bold text-yellow-300 mb-6 text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">
                        ПОБЕДА!
                    </h1>

                    <p className="text-3xl text-green-300 mb-12 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Вы одержали великолепную победу!
                    </p>
                    <p className="text-3xl text-green-300 mb-6 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Награды:
                    </p>
                    <div className="flex flex-col gap-4 items-end">
                        {
                            Boolean(reward?.balances.gold) && (
                                <div className="flex items-center gap-2 text-white text-3xl">
                                    {reward?.balances.gold} <Icon icon="gold" />
                                </div>
                            )
                        }
                        {
                            Boolean(reward?.balances.gems) && (
                                <div className="flex items-center gap-2 text-white text-3xl">
                                    {reward?.balances.gems} <Icon icon="gems" />
                                </div>
                            )
                        }
                        {
                            Boolean(reward?.balances.summons) && (
                                <div className="flex items-center gap-2 text-white text-3xl">
                                    {reward?.balances.summons} <Icon icon="summons" />
                                </div>
                            )
                        }
                    </div>
                    {
                        reward?.equipment && (
                            <div
                            className="grid grid-cols-4 gap-4 mt-6"
                            >
                                {
                                    reward.equipment.map(eq => (
                                        <EquipmentCard key={eq.id} equipment={eq} />
                                    ))
                                }
                            </div>
                        )
                    }

                    <div 
                        className="px-12 mt-6 py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-4xl font-bold rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:from-green-500 hover:to-emerald-600 active:scale-95 border-4 border-green-400 shadow-2xl hover:shadow-green-500/50"
                        onClick={goToMenu}
                    >
                        <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            В МЕНЮ
                        </span>
                    </div>
                </div>
            </ResponsiveUI>
        )
    }

    return (
        <ResponsiveUI>
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-red-900/80 via-gray-900/70 to-black/90 p-8 relative overflow-hidden">
                {/* Defeat smoke particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 bg-gray-500 rounded-full opacity-60"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Broken sword icon */}
                <div className="text-9xl mb-8 text-red-400 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] opacity-80">
                    ⚔️
                </div>

                <h1 className="text-7xl font-bold text-red-300 mb-6 text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    ПОРАЖЕНИЕ
                </h1>

                <p className="text-3xl text-orange-300 mb-12 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Битва была жестокой, но не окончательной. Каждое поражение - это урок на пути к величию.
                </p>

                <div 
                    className="px-12 py-6 bg-gradient-to-r from-red-700 to-orange-800 text-white text-4xl font-bold rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:from-red-600 hover:to-orange-700 active:scale-95 border-4 border-red-500 shadow-2xl hover:shadow-red-500/50"
                    onClick={goToMenu}
                >
                    <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        В МЕНЮ
                    </span>
                </div>
            </div>
        </ResponsiveUI>
    )
}