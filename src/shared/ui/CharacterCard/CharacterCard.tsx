import type { FC } from "react";
import type { CharacterCardProps } from "./CharacterCard.props";
import { Image } from "../Image/Image";

import styles from './CharacterCard.module.css'

export const CharacterCard: FC<CharacterCardProps> = ({
    character,
    onClick
}) => {
    const { key, name, ...rest } = character;
    return (
        <div className={styles.card}
        onClick={onClick}
        >
            <Image
            src={`assets/${key}Mini.png`}
            className={styles.img}
            />
            <span className={styles.name}>
                {name}
            </span>
            <div className={styles.info}>
                {Object.entries(rest).map(([key, value]) => (
                    <div key={key}>
                        {key}: {value}
                    </div>
                ))}
            </div>
        </div>
    )
}