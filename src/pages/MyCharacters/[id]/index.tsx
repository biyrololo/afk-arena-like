import { getCharacterEquipment } from "@/entities/character/lib/allCharacters";
import { equipItem, getEquipmentBySlot, unequipItem } from "@/entities/character/lib/allEquipment";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { EquipmentSelectModal } from "@/entities/character/ui/EquipmentSelectModal/EquipmentSelectModal";
import { usePlayerStore } from "@/entities/player/model/player.store";
import CharacterViewScene from "@/scenes/CharacterViewScene";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";
import { calculateLevelUpStats, calculateStatsWithEquipment, isEnoughResources, levelUp, RESOURES_FOR_LEVEL } from "@/shared/types/develop";
import { Icon } from "@/shared/ui/Icon/Icon";
import PhaserGame from "@/shared/ui/PhaserGame";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { EventBus } from "@/utils/eventBus";
import { Balances } from "@/widgets/Balances/Balances";
import { useEffect, useMemo, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useShallow } from "zustand/react/shallow";

export const MyCharacterPage: FC = () => {
    const { id } = useParams();

    const banalces = usePlayerStore(useShallow(state => state.balances))

    const navigate = useNavigate();

    const [isReady, setIsReady] = useState(false);

    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState<Character.EquipmentSlot | undefined>(undefined);

    const characters = usePlayerCharactersStore(
        useShallow(
            state => state.characters
        )
    )

    const current = useMemo(() => {
        if(!id) return null;

        return characters.find(c => c.id === id)
    }, [id, characters])

    useEffect(() => {
        console.log('current', current)
        
        const setCharacter = () => {
            console.log('set current', current)
            EventBus.emit('CharacterViewScene:setCharacter',
                current
            )
        if(!current) return;
        }
        EventBus.on('CharacterViewScene:ready', setCharacter);

        return () => {
            EventBus.off('CharacterViewScene:ready', setCharacter)
        }
    }, [current])

    const goBack = () => {
        navigate(-1)
    }

    const handlePlayAnimation = (animation: string) => {
        EventBus.emit('CharacterViewScene:playAnimation', animation)
    }

    const handleClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target !== e.currentTarget) return;
        e.stopPropagation();
        e.preventDefault();
        handlePlayAnimation('attack1')
    }

    const resources = RESOURES_FOR_LEVEL[(current?.progression.level || 0) + 1];
    const newStats = current ? calculateLevelUpStats(current) : null;

    const totalStats = current ? calculateStatsWithEquipment(current) : null;

    const totalNewStats = newStats ? calculateStatsWithEquipment(newStats) : null;

    const isHover = isEnoughResources(resources, banalces);

    usePlayerCharactersStore(useShallow(s => s.equipment))

    const equipment = getCharacterEquipment(current?.id || '');

    const handleLevelUp = () => {
        if(!current) return;
        handlePlayAnimation('special');
        levelUp(current.id);
        console.log('levelUp', current.id);
    }

    if(!totalStats) {
        // navigate('/')
        return null;
    }

    return (
        <>
            <PhaserGame scenes={[CharacterViewScene]} />
            <ResponsiveUI>
                <div className="absolute top-0 left-0 w-full h-full" onClick={handleClickBg}>
                    <Balances/>
                    <div className={`
                    absolute w-1/3 left-0 top-0 bottom-0 bg-gray-900/30
                    flex flex-col
                    p-2
                    `}>
                        <p 
                        className={`
                            capitalize text-4xl drop-shadow-[0_1.2px_2.4px_rgba(0,0,0,0.2)]
                            p-4
                            rounded-2xl
                            w-full
                            bg-gray-900/80
                            border-amber-900 border-4
                            flex
                            items-center
                            justify-center
                            `}
                        style={{ color: getRarityColor(totalStats.rarity) }}
                        >
                            {totalStats.name}
                        </p>
                        <div className="px-10 mt-4">
                            <p 
                            className={`
                                capitalize text-4xl drop-shadow-[0_1.2px_2.4px_rgba(0,0,0,0.2)]
                                p-2
                                rounded-2xl
                                flex
                                w-full
                                bg-gray-900/80
                                border-amber-900 border-4
                                text-white
                                px-20
                                `}
                            >
                                Ур. {totalStats.progression.level} 
                                {
                                    isHover && newStats && (
                                        <span className="inline-block ml-auto text-green-600">{'>'} Ур. {newStats.progression.level}</span>
                                    )
                                }
                            </p>
                        </div>
                        <div
                        className={`
                            mt-4
                            w-full
                            bg-gray-900/80
                            border-amber-900 border-4
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            px-4
                        `}
                        >
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">МОЩЬ</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalStats && totalNewStats && totalStats.power !== totalNewStats.power && <span className="block mr-6 text-green-600">{totalNewStats.power} {'<'}</span>}
                                    {totalStats?.power}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">ОЗ</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats && totalStats.baseStats.maxHp !== totalNewStats.baseStats.maxHp && <span className="block mr-6 text-green-600">{totalNewStats.baseStats.maxHp} {'<'}</span>}
                                    {totalStats.baseStats.maxHp}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">АТК</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.baseStats.attack !== totalNewStats.baseStats.attack && <span className="block mr-6 text-green-600">{totalNewStats.baseStats.attack} {'<'}</span>}
                                    {totalStats.baseStats.attack}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">Скорость</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.baseStats.speed !== totalNewStats.baseStats.speed && <span className="block mr-6 text-green-600">{totalNewStats.baseStats.speed} {'<'}</span>}
                                    {totalStats.baseStats.speed}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2">
                                <span className="text-4xl text-white">Защита</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.baseStats.defense !== totalNewStats.baseStats.defense && <span className="block mr-6 text-green-600">{totalNewStats.baseStats.defense} {'<'}</span>}
                                    {totalStats.baseStats.defense}
                                </span>
                            </div>
                        </div>
                        <div
                        className={`
                            mt-4
                            w-full
                            bg-gray-900/80
                            border-amber-900 border-4
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            px-4
                        `}
                        >
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">Крит шанс</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.advancedStats?.critChance !== totalNewStats.advancedStats?.critChance && <span className="block mr-6 text-green-600">{(totalNewStats.advancedStats?.critChance || 0.50) * 100}% {'<'}</span>}
                                    {Math.floor((totalStats.advancedStats?.critChance || 0.50) * 100)}%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">Крит урон</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.advancedStats?.critDamage !== totalNewStats.advancedStats?.critDamage && <span className="block mr-6 text-green-600">{(totalNewStats.advancedStats?.critDamage || 1.50) * 100}% {'<'}</span>}
                                    {Math.floor((totalStats.advancedStats?.critDamage || 1.50) * 100)}%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-2 pt-4 pb-2 border-b-2 border-amber-900">
                                <span className="text-4xl text-white">Уклонение</span>
                                <span className="text-3xl text-white text-right flex justify-end">
                                    {isHover && totalNewStats && totalStats.advancedStats?.dodge !== totalNewStats.advancedStats?.dodge && <span className="block mr-6 text-green-600">{(totalNewStats.advancedStats?.dodge || 0.01) * 100}% {'<'}</span>}
                                    {(totalStats.advancedStats?.dodge || 0.01) * 100}%
                                </span>
                            </div>
                        </div>
                        <span
                        className="mt-auto text-2xl text-white p-4 bg-gray-900/80 rounded-xl cursor-pointer"
                        onClick={goBack}
                        >
                            Назад
                        </span>
                    </div>
                    <div className="absolute left-[33.33%] right-0 bottom-0 h-1/3 bg-gray-900/30 flex flex-col items-center justify-center p-8 gap-2">
                        <div className="text-4xl text-white font-bold">
                            Снаряжение
                        </div>
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            <EquipmentCard fallback="true_hero_sword_weapon" equipment={equipment.weapon} onClick={() => setIsEquipmentModalOpen(Character.EquipmentSlot.WEAPON)} />
                            <EquipmentCard fallback="orange_helmet" equipment={equipment.helmet} onClick={() => setIsEquipmentModalOpen(Character.EquipmentSlot.HELMET)} />
                            <EquipmentCard fallback="orange_chest" equipment={equipment.chest} onClick={() => setIsEquipmentModalOpen(Character.EquipmentSlot.CHEST)} />
                            <EquipmentCard fallback="orange_boots" equipment={equipment.boots} onClick={() => setIsEquipmentModalOpen(Character.EquipmentSlot.BOOTS)} />
                            <EquipmentCard fallback="emerald_necklace_accessory" equipment={equipment.accessory} onClick={() => setIsEquipmentModalOpen(Character.EquipmentSlot.ACCESSORY)} />
                        </div>
                        <button 
                            className={`
                                relative
                                px-12 py-6
                                text-4xl font-bold
                                ${
                                    isHover ?
                                    `
                                    bg-gradient-to-r from-amber-500 to-amber-700 text-yellow-100 
                                    border-amber-400 hover:from-amber-500 hover:to-amber-700 cursor-pointer
                                    hover:scale-105
                                    active:scale-95
                                    group
                                    ` : 
                                    `
                                    cursor-not-allowed
                                    bg-stone-500
                                    text-yellow-100
                                    border-4 border-stone-400
                                    rounded-2xl
                                    shadow-lg
                                    transform transition-all duration-300
                                    overflow-hidden
                                    `
                                }
                                border-4
                                rounded-2xl
                                shadow-lg
                                transform transition-all duration-300
                                overflow-hidden
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleLevelUp();
                            }}
                            disabled={!isHover}
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-2xl blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                            
                            {/* Animated sparkles */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                                        style={{
                                            left: `${15 + (i * 15)}%`,
                                            top: `${20 + (i % 2) * 40}%`,
                                            animationDelay: `${i * 0.2}s`,
                                            animationDuration: '2s'
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Button text with glow */}
                            <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wider flex gap-10"
                            
                            >
                                УЛУЧШИТЬ
                                <div className="flex justify-center gap-8 relative">
                                    {Object.entries(resources.balances).map(([resource, amount]) => {
                                        return (
                                            <div key={resource} className="flex items-center gap-2">
                                                {amount}
                                                <Icon icon={resource as any} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            {/* Shine effect */}
                            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </div>
                </div>
                {
                    isEquipmentModalOpen && (
                        <EquipmentSelectModal
                        currentEquipment={equipment[isEquipmentModalOpen]}
                        onSelect={(e) => {
                            if(e) {
                                equipItem(current!.id, e.id);
                            } else if(equipment[isEquipmentModalOpen]?.id) {
                                unequipItem(equipment[isEquipmentModalOpen].id);
                            }
                        }}
                        list={getEquipmentBySlot(isEquipmentModalOpen).filter((e) => e.id !== equipment[isEquipmentModalOpen]?.id)}
                        slot={isEquipmentModalOpen}
                        close={() => setIsEquipmentModalOpen(undefined)}
                        />
                    )
                }
            </ResponsiveUI>
        </>
    )
}