import type { Icons } from "@/shared/icons";
import type { Character } from "@/shared/types/character";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "../../lib/getRarityColor";
import { EquipmentCard } from "./EquipmentCard";
import { calculateEquipmentPower } from "@/shared/types/develop";

export interface IEquipmentFullCardProps {
    equipment?: Character.Equipment;
    onClick?: () => void;
    size?: number;
    iconSize?: number;
    withStats?: boolean;
    className?: string;
    withEquipedCharacter?: string
}

export const EquipmentFullCard = ({ equipment, onClick, size = 120, iconSize = 80, withStats, className, withEquipedCharacter }: IEquipmentFullCardProps) => {
    const power = equipment ? calculateEquipmentPower(equipment) : 0;
    
    return (
        <div className={`bg-gray-600/50 rounded-xl p-6 border cursor-pointer border-amber-800/20 relative ${className}`}
        onClick={onClick}
        >
            <div className="flex gap-8 items-center justify-between">
                <EquipmentCard withLevel equipment={equipment} size={size} iconSize={iconSize} />
                {
                    equipment && (
                        <div style={{ flexGrow: 1 }}>
                            <p className="text-white font-bold text-4xl mb-4"
                            style={{ color: getRarityColor(equipment?.rarity) }}
                            >{equipment?.name}</p>
                            <p className="text-white font-bold text-4xl mb-4">МОЩЬ: <span className="text-amber-400">{power}</span></p>
                        </div>
                    )
                }
                { equipment && withStats && (
                    <div className="grid grid-cols-3 border-l-2 border-amber-200/20 h-full pl-4" style={{ flexGrow: 2 }}>
                    <div className="flex flex-col gap-2 text-white text-2xl justify-evenly text-left">
                        <div><span className="text-xl mr-2">ОЗ:</span> <b>{equipment?.stats.maxHp}</b></div>
                        <div><span className="text-xl mr-2">АТК:</span> <b>{equipment?.stats.attack}</b></div>
                    </div>
                    <div className="flex flex-col gap-2 text-white text-2xl justify-evenly text-left">
                        <div><span className="text-xl mr-2">Защита:</span> <b>{equipment?.stats.defense}</b></div>
                        <div><span className="text-xl mr-2">Скорость:</span> <b>{equipment?.stats.speed}</b></div>
                    </div>
                    <div className="flex flex-col gap-2 text-white text-2xl justify-evenly text-left">
                        <div><span className="text-xl mr-2">Крит шанс:</span> <b>{(equipment?.stats.critChance || 0) * 100}%</b></div>
                        <div><span className="text-xl mr-2">Крит урон:</span> <b>{(equipment?.stats.critDamage || 0) * 100}%</b></div>
                    </div>
                </div>
                ) }
            </div>
            {
                withEquipedCharacter && (
                    <img src={withEquipedCharacter} alt="Equiped Character" className="absolute bottom-0 right-0 size-[70px]"
                    style={{
                        borderTopLeftRadius: "10px"
                    }}
                    />
                )
            }
        </div>
    )
};
