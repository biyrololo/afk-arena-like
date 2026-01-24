import { Character } from "@/shared/types/character";

export const getRarityColor = (rarity: Character.Rarity) => {
    switch (rarity) {
        case Character.Rarity.COMMON:
            return '#4A90E2'; // blue
        case Character.Rarity.UNCOMMON:
            return '#7ED321'; // green
        case Character.Rarity.RARE:
            return '#50C8FF'; // light blue / cyan-blue
        case Character.Rarity.EPIC:
            return '#F5A623'; // yellow-orange (золотистый)
        case Character.Rarity.LEGENDARY:
            return '#FF6B35'; // orange
        default:
            return '#FFFFFF'; // white
    }
};