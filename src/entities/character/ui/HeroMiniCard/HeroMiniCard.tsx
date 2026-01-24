import type { Character } from "@/shared/types/character";
import type { CSSProperties, FC } from "react";
import { getRarityColor } from "../../lib/getRarityColor";

export const HeroMiniCard: FC<{character: Character.Character; onClick?: () => void; style?: CSSProperties}> = ({ character, onClick, style }) => {
    return (
        <button 
        className="size-[200px] relative bg-zinc-600 bg-cover cursor-pointer rounded-2xl"
        style={{
            backgroundImage: `url(/assets/${character.key}Mini.png)`,
            border: `4px solid ${getRarityColor(character.rarity)}`,
            ...(style || {})
        }}
        onClick={onClick}
        >
            <span className="absolute top-1 left-3 text-white text-lg font-bold">Ур. {character.progression.level}</span>
        </button>
    )
};
