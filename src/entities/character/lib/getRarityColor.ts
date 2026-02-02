import { Character } from "@/shared/types/character";

export const getRarityColor = (rarity: Character.Rarity) => {
    switch (rarity) {
        case Character.Rarity.COMMON:
            return '#57779C'; // blue
        case Character.Rarity.UNCOMMON:
            return '#7ED321'; // green
        case Character.Rarity.RARE:
            return '#EDAD2D'; // light blue / cyan-blue
        case Character.Rarity.EPIC:
            return '#9425D9'; // yellow-orange (золотистый)
        case Character.Rarity.LEGENDARY:
            return '#FF2222'; // red
        default:
            return '#FFFFFF'; // white
    }
};