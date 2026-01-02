import type { Character } from "@/shared/types/character";

export interface CharacterCardProps {
    character: Character;
    onClick?: () => void;
}