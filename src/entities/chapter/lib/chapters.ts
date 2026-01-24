import type { IChapter } from "./chapter.model";

import background1 from '@/assets/backgrounds/game_background_1.png'
import background3 from '@/assets/backgrounds/game_background_3.png'
import { cloneCharacter, CRYSTAL_KING, FIRE_KING_CHARACTER, FROST_GUARDIAN } from "@/entities/character/lib/allCharacters";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { Character } from "@/shared/types/character";

export const CHAPTERS: IChapter[] = [
    {
        name: 'Глава 1',
        chapterNumber: 1,
        stages: [
            {
                chapterNumber: 1,
                stageNumber: 1,
                background: background1,
                enemies: [
                    // cloneCharacter(FROST_GUARDIAN),
                    // cloneCharacter(FIRE_KING_CHARACTER),
                    cloneCharacter(CRYSTAL_KING)
                ],
                rewards: {
                    balances: {
                        gold: 100,
                        gems: 10,
                        summons: 1
                    },
                    equipment: [
                        createEquipment({
                            slot: Character.EquipmentSlot.HELMET,
                            stats: {
                                maxHp: 50,
                                attack: 50,
                                speed: 50,
                                defense: 50,
                                critChance: 50,
                                critDamage: 50,
                                accuracy: 50,
                                dodge: 50,
                                lifesteal: 50,
                            },
                            name: 'Helmet of the Ancients',
                            description: 'A helmet forged by the Ancients.',
                            key: 'gold',
                            rarity: Character.Rarity.EPIC,
                            level: 1
                        }),
                        createEquipment({
                            slot: Character.EquipmentSlot.HELMET,
                            stats: {
                                maxHp: 150,
                                attack: 250,
                                speed: 50,
                                defense: 50,
                                critChance: 50,
                                critDamage: 50,
                                accuracy: 50,
                                dodge: 50,
                                lifesteal: 50,
                            },
                            name: 'Helmet of the Ancients',
                            description: 'A helmet forged by the Ancients.',
                            key: 'orange',
                            rarity: Character.Rarity.LEGENDARY,
                            level: 1
                        }),
                    ]
                }
            },
            {
                chapterNumber: 1,
                stageNumber: 2,
                background: background3,
                enemies: [
                    cloneCharacter(FIRE_KING_CHARACTER),
                    cloneCharacter(CRYSTAL_KING)
                ],
                rewards: {
                    balances: {
                        gold: 1000,
                        gems: 10,
                        summons: 1
                    },
                    equipment: [
                        createEquipment({
                            slot: Character.EquipmentSlot.BOOTS,
                            stats: {
                                maxHp: 150,
                                attack: 250,
                                speed: 50,
                                defense: 50,
                                critChance: 50,
                                critDamage: 50,
                                accuracy: 50,
                                dodge: 50,
                                lifesteal: 50,
                            },
                            name: 'Helmet of the Ancients',
                            description: 'A helmet forged by the Ancients.',
                            key: 'orange',
                            rarity: Character.Rarity.LEGENDARY,
                            level: 1
                        }),
                    ]
                }
            }
        ]
    }
]

export const findStage = (chapterNumber: number, stageNumber: number) => {
    return CHAPTERS.find(chapter => chapter.chapterNumber === chapterNumber)?.stages.find(stage => stage.stageNumber === stageNumber);
}

export const findChapter = (chapterNumber: number) => {
    return CHAPTERS.find(chapter => chapter.chapterNumber === chapterNumber);
}

export const nextStage = (chapterNumber: number, stageNumber: number) => {
    if(findStage(chapterNumber, stageNumber + 1)) {
        return [chapterNumber, stageNumber + 1];
    }
    if(findChapter(chapterNumber + 1)) {
        return [chapterNumber + 1, 1];
    }
    return null;
}
