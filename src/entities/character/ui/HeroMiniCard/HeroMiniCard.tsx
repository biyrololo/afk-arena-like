import { Character } from "@/shared/types/character";
import type { CSSProperties, FC } from "react";
import { getRarityColor } from "../../lib/getRarityColor";
import { Avatars } from "@/shared/avatars";

import styles from './HeroMiniCard.module.css'

export const HeroMiniCard: FC<{character: Character.Character; onClick?: () => void; style?: CSSProperties}> = ({ character, onClick, style }) => {
    return (
        <div className={`
        size-[200px] rounded-2xl z-20 relative 
        ${ character.rarity === Character.Rarity.LEGENDARY ? styles['fire-card'] : ''}
        ${ character.rarity === Character.Rarity.EPIC ? styles['epic-wrapper'] : ''}
        ${ character.rarity === Character.Rarity.RARE ? styles['rare-wrapper'] : ''}
        `}>
            <button 
            className={`
                size-[200px] relative bg-zinc-600 bg-cover cursor-pointer rounded-2xl
            `}
            style={{
                backgroundImage: `url(${Avatars[character.key as keyof typeof Avatars]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: `8px solid ${getRarityColor(character.rarity)}`,
                ...(style || {})
            }}
            onClick={onClick}
            >
                <span className="absolute top-0 left-0 text-white text-lg font-bold backdrop-blur-2xl p-1 pr-2 rounded-md">Ур. {character.progression.level}</span>
            </button>
        </div>
    )
};
