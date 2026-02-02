import { Character } from "@/shared/types/character";

export function getDamageColor(damageType: Character.DamageType): string {
    switch (damageType) {
        case Character.DamageType.PHYSICAL:
            return '#dbdbdb'; // White
        case Character.DamageType.MAGIC:
            return '#29caf2'; // light blue
        case Character.DamageType.FIRE:
            return '#ed3d1a'; // Red
        default:
            return '#ffffff';
    }
}
