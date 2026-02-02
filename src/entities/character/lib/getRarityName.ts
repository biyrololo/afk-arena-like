import { Character } from "@/shared/types/character";

export const getRarityName = (rarity: Character.Rarity) => {
    switch (rarity) {
        case Character.Rarity.COMMON:
            return 'Обычный'; // blue
        case Character.Rarity.UNCOMMON:
            return 'Необычный'; // green
        case Character.Rarity.RARE:
            return 'Редкий'; // light blue / cyan-blue
        case Character.Rarity.EPIC:
            return 'Эпический'; // yellow-orange (золотистый)
        case Character.Rarity.LEGENDARY:
            return 'Легендарный'; // red
        default:
            return 'белый';
    }
};