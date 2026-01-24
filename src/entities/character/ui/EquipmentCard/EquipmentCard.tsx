import type { Icons } from "@/shared/icons";
import type { Character } from "@/shared/types/character";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "../../lib/getRarityColor";

export interface IEquipmentCardProps {
    equipment?: Character.Equipment;
    onClick?: () => void;
    size?: number;
    iconSize?: number;
    withLevel?: boolean;
}

export const EquipmentCard = ({ equipment, onClick, size = 120, iconSize = 80, withLevel }: IEquipmentCardProps) => {
    if(iconSize > size) iconSize = size - 20;
    return (
        <div
        className={`
        relative
        bg-black/50
        border-6
        rounded
        cursor-pointer
        flex items-center justify-center
        border-stone-500
        ${onClick ? 'transition-colors' : ''}
        `}
        style={{ 
            width: size, 
            height: size,
            backgroundColor: equipment ? getRarityColor(equipment.rarity) + '77' : '',
            borderColor: equipment ? getRarityColor(equipment.rarity) : '',
        }}
        onClick={onClick}
        >
            {
                equipment && (
                    <Icon icon={`${equipment.key}_${equipment.slot}` as keyof typeof Icons} size={iconSize} />
                )
            }
            {
                withLevel && equipment && (
                    <div className="text-white absolute top-0 left-1">
                        Ур. {equipment.level}
                    </div>
                )
            }
        </div>
    )
};
