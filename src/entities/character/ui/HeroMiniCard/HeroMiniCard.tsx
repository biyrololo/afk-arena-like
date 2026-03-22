import { Character } from "@/shared/types/character";
import type { CSSProperties, FC } from "react";
import { getRarityColor } from "../../lib/getRarityColor";
import { Avatars } from "@/shared/avatars";

import styles from "./HeroMiniCard.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";

export const HeroMiniCard: FC<{
  character: Character.Character;
  onClick?: () => void;
  style?: CSSProperties;
  size?: string;
  withoutAnimation?: boolean;
}> = ({ character, onClick, style, size = "200px", withoutAnimation = false }) => {
  return (
    <div
      className={`
        size-[${size}] rounded-2xl z-20 relative
        ${character.rarity === Character.Rarity.LEGENDARY && !withoutAnimation ? styles["fire-card"] : ""}
        ${character.rarity === Character.Rarity.EPIC && !withoutAnimation ? styles["epic-wrapper"] : ""}
        ${character.rarity === Character.Rarity.RARE && !withoutAnimation ? styles["rare-wrapper"] : ""}
        `}
      style={{
        width: size,
        height: size,
      }}
    >
      <button
        tabIndex={-1}
        className={`
                size-[${size}] relative bg-zinc-600 bg-cover cursor-pointer rounded-2xl
                z-30
            `}
        style={{
          backgroundImage: `url(${Avatars[character.key as keyof typeof Avatars]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: `8px solid ${getRarityColor(character.rarity)}`,
          width: size,
          height: size,
          ...(style || {}),
        }}
        onClick={onClick}
      >
        <span className="absolute top-0 left-0 text-white text-lg font-bold backdrop-blur-2xl p-1 pr-2 rounded-md">
          Ур. {character.progression.level}
        </span>
        <span
          className=
          "absolute flex gap-2 bottom-1 left-1 text-white text-lg font-bold"
        >
          <div className="rounded-full overflow-hidden size-[40px] relative border-2 border-black">
            <Icon icon={`faction_${character.faction}`} className="absolute !w-[60px] !h-[60px] max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="rounded-full overflow-hidden size-[40px] relative border-2 border-black">
            <Icon icon={`role_${character.role}`} />
          </div>
        </span>
        <div className="absolute right-0 top-0">
          {
            Array.from({ length: character.progression.ascension })
              .map((_, index) => (
                <Icon key={index} icon="star" size={30} />
              ))
          }
        </div>
      </button>
    </div>
  );
};
