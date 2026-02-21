import { useNavigate, useParams } from "react-router-dom";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Balances } from "@/widgets/Balances/Balances";
import { type FC } from "react";

import cn from "classnames";
import { EquipmentFullCard } from "@/entities/character/ui/EquipmentCard/EquipmentFullCard";
import { Button } from "@/shared/ui/Button/Button";
import { EQUIPMENT_UPGRADE_COSTS, isEnoughResources, upgradeEquipment } from "@/shared/types/develop";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { Icon } from "@/shared/ui/Icon/Icon";
import { assets } from "@/shared/assets";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { Avatars } from "@/shared/avatars";

export const MyEquipmentItemPage: FC = () => {
    const { id } = useParams();

    const navitate = useNavigate();
    const { equipment, characters } = usePlayerCharactersStore();
    
    const handleBack = () => {
        navitate(-1);
    }

    const currentEquipment = equipment.find(e => e.id === id);

    const resources = EQUIPMENT_UPGRADE_COSTS[(currentEquipment?.level || 0) + 1];
    
    const balances = usePlayerStore(useShallow((state) => state.balances));

    const canUpgrade = isEnoughResources(resources, balances);

    const char = characters.find(c => c.id === currentEquipment?.equippedCharacterId);
    const avatar = char ? Avatars[char.key as keyof typeof Avatars] : undefined;

    if(!currentEquipment) {
        navitate(-1);
        return null;
    }

    const handleUpgradeClick = () => {
        upgradeEquipment(currentEquipment!.id);
    };

    return (
        <ResponsiveUI>
            <div
            className={`
                w-full h-full relative
                bg-[url('/assets/backgrounds/tavern.png')]
                bg-cover
            `}>
                <Balances />
                <button 
                    className="
                        relative
                        top-4 left-4
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
                <div className="w-[1600px] mx-auto mt-24 flex flex-col gap-12 items-center">
                    <div className={cn(`
                        bg-gradient-to-br from-gray-900 to-gray-800 
                        border-4 border-amber-900/50
                        rounded-2xl
                        p-8
                        w-9/10
                        mx-4
                        relative
                        shadow-2xl
                    `)}>
                        {/* Decorative corner elements */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-amber-700 rounded-tl-lg"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-amber-700 rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-amber-700 rounded-bl-lg"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-amber-700 rounded-br-lg"></div>
                        
                        <h2 className="text-4xl font-bold text-amber-300 text-center mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-b-2 border-amber-900/30 pb-4">
                            ПРОСМОТР ЭКИПИРОВКИ
                        </h2>
                        
                        <div className="mb-8 bg-gray-800/50 rounded-xl p-6 border border-amber-900/20">
                            <div className="flex flex-col items-center gap-4">
                                {
                                    char && (
                                        <div className="text-2xl cursor-pointer text-white mb-4 text-center flex items-center gap-4"
                                        onClick={() => navitate(`/my-characters/${char.id}`)}
                                        >
                                            Экипировано на <span style={{ color: getRarityColor(char.rarity) }}>{char.name}</span>
                                            <img src={avatar} alt={char.name} className="w-12 h-12 rounded-full" />
                                        </div>
                                    )
                                }
                                <EquipmentFullCard equipment={currentEquipment} withStats />
                                <div className="flex gap-4 justify-end w-full">
                                    <Button 
                                        onClick={() => handleUpgradeClick()}
                                        className="bg-purple-700 hover:bg-purple-600 text-xl px-6 py-3"
                                        disabled={!canUpgrade || !currentEquipment}
                                    >
                                        УЛУЧШИТЬ
                                        {
                                            currentEquipment && (
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
                                            )
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveUI>
    )
}