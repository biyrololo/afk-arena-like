import type { Icons } from "@/shared/icons";
import { Character } from "@/shared/types/character";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "../../lib/getRarityColor";

import styles from "./EquipmentCard.module.css";

export interface IEquipmentCardProps {
    equipment?: Character.Equipment;
    fallback?: keyof typeof Icons;
    onClick?: () => void;
    size?: number;
    iconSize?: number;
    withLevel?: boolean;
}

export const EquipmentCard = ({ equipment, onClick, size = 120, iconSize = 80, withLevel, fallback }: IEquipmentCardProps) => {
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
        ${equipment?.rarity === Character.Rarity.LEGENDARY ? styles["fire-card"] : ""}
        ${equipment?.rarity === Character.Rarity.EPIC ? styles["epic-wrapper"] : ""}
        ${equipment?.rarity === Character.Rarity.RARE ? styles["rare-wrapper"] : ""}
        `}
        style={{ 
            width: size, 
            height: size,
            backgroundColor: equipment ? getRarityColor(equipment.rarity) + '77' : '',
            borderColor: equipment ? getRarityColor(equipment.rarity) : '',
            aspectRatio: '1/1',
        }}
        onClick={onClick}
        >
            {
                equipment ? (
                    <Icon icon={`${equipment.key}_${equipment.slot}` as keyof typeof Icons} size={iconSize} />
                ) : fallback ? (
                    <Icon dark icon={fallback as keyof typeof Icons} size={iconSize} />
                ) : null
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
