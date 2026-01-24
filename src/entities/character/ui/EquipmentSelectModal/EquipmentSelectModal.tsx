import type { Character } from "@/shared/types/character";
import { useEffect, useState, type FC } from "react";
import { EquipmentCard } from "../EquipmentCard/EquipmentCard";
import { Button } from "@/shared/ui/Button/Button";
import cn from "classnames";
import { EquipmentFullCard } from "../EquipmentCard/EquipmentFullCard";
import { EQUIPMENT_UPGRADE_COSTS, isEnoughResources, upgradeEquipment } from "@/shared/types/develop";
import { Icon } from "@/shared/ui/Icon/Icon";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";

export interface IEquipmentSelectModalProps {
    currentEquipment?: Character.Equipment;
    list: Character.Equipment[];
    slot: Character.EquipmentSlot;
    onSelect: (equipment?: Character.Equipment) => void;
    close: () => void;
}

const PER_PAGE = 5;

export const EquipmentSelectModal: FC<IEquipmentSelectModalProps> = ({
    currentEquipment,
    slot,
    list,
    onSelect,
    close,
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [list, setPage]);

    const paginatedList = list.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

    const isPrevDisabled = page === 0;
    const isNextDisabled = page >= Math.ceil(list.length / PER_PAGE) - 1;

    const resources = EQUIPMENT_UPGRADE_COSTS[(currentEquipment?.level || 0) + 1];

    const balances = usePlayerStore(useShallow((state) => state.balances));

    const canUpgrade = isEnoughResources(resources, balances);

    const handleNextClick = () => {
        if (isNextDisabled) return;
        setPage((prevPage) => prevPage + 1);
    };
    const handlePrevClick = () => {
        if (isPrevDisabled) return;
        setPage((prevPage) => prevPage - 1);
    };

    const handleUpgradeClick = () => {
        upgradeEquipment(currentEquipment!.id);
    };

    return (
        <div
        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
        style={{
            pointerEvents: 'all'
        }}
        onClick={e => {
            if(e.target === e.currentTarget)
                close();
        }
        }
        >
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
                <Button onClick={close} className="absolute top-4 right-4 z-50">
                    {'X'}
                </Button>
                
                <h2 className="text-4xl font-bold text-amber-300 text-center mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-b-2 border-amber-900/30 pb-4">
                    ВЫБОР ЭКИПИРОВКИ
                </h2>
                
                <div className="mb-8 bg-gray-800/50 rounded-xl p-6 border border-amber-900/20">
                    <h3 className="text-2xl text-amber-200 mb-4 text-center">ТЕКУЩАЯ ЭКИПИРОВКА</h3>
                    <div className="flex flex-col items-center gap-4">
                        <EquipmentFullCard equipment={currentEquipment} withStats
                        onClick={() => navigate(`/my-equipment/${currentEquipment?.id}`)}
                        />
                        <div className="flex gap-4 justify-between w-full">
                            <Button 
                                onClick={() => onSelect(undefined)}
                                className="bg-red-700 hover:bg-red-600 text-xl px-6 py-3"
                                disabled={!currentEquipment}
                            >
                                Снять
                            </Button>
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
                
                <div className="mb-8 bg-gray-800/50 rounded-xl p-6 border border-amber-900/20">
                    <h3 className="text-2xl text-amber-200 mb-4 text-center">ДОСТУПНАЯ ЭКИПИРОВКА</h3>
                    <div className="grid grid-cols-3 gap-6 min-h-[200px]">
                        {paginatedList.map((equipment) => (
                            <div key={equipment.id} className="flex flex-col items-center">
                                <EquipmentFullCard
                                    equipment={equipment}
                                    size={100}
                                    iconSize={60}
                                    className="w-full rounded-b-none rounded-t-2xl"
                                    onClick={() => navigate(`/my-equipment/${equipment.id}`)}
                                />
                                <Button 
                                    onClick={() => onSelect(equipment)}
                                    className="bg-green-700 hover:bg-green-600 justify-center text-3xl px-4 py-2 w-full rounded-t-none rounded-b-2xl"
                                >
                                    Выбрать
                                </Button>
                            </div>
                        ))}
                        {paginatedList.length === 0 && (
                            <div className="col-span-full text-center py-8 text-gray-400 text-xl">
                                Нет доступной экипировки для этого слота
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <Button 
                        onClick={handlePrevClick} 
                        disabled={isPrevDisabled}
                        className={cn(
                            "text-2xl px-6 py-3",
                            isPrevDisabled 
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                                : "bg-blue-700 hover:bg-blue-600"
                        )}
                    >
                        ← НАЗАД
                    </Button>
                    
                    <div className="text-amber-200 text-lg">
                        Страница {page + 1} из {Math.ceil(list.length / PER_PAGE) || 1}
                    </div>
                    
                    <Button 
                        onClick={handleNextClick} 
                        disabled={isNextDisabled}
                        className={cn(
                            "text-2xl px-6 py-3",
                            isNextDisabled 
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                                : "bg-blue-700 hover:bg-blue-600"
                        )}
                    >
                        ВПЕРЁД →
                    </Button>
                </div>
            </div>
        </div>
    )
};