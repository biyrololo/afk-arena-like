import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { type DropItem, DropType } from "@/entities/summon/lib/summon";
import { motion } from "framer-motion";
import type { FC } from "react";
import { Character } from "@/shared/types/character";

type Props = {
    results: DropItem[];
};

const ORDER = [Character.Rarity.LEGENDARY, Character.Rarity.EPIC, Character.Rarity.RARE, Character.Rarity.UNCOMMON, Character.Rarity.COMMON];

export const SummonResultsGrid: FC<Props> = ({ results }) => {
    const sortedResults = [...results].sort(
        (a, b) => ORDER.indexOf(a.item.rarity) - ORDER.indexOf(b.item.rarity)
    );

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
        >
            <motion.div
                className="grid grid-cols-5 gap-4 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.08,
                        },
                    },
                }}
            >
                {sortedResults.map((result, index) => {
                    const rarityColor = getRarityColor(
                        result.item.rarity
                    );

                    return (
                        <motion.div
                            key={`${result.item.id}-${index}`}
                            className="relative rounded-xl p-2 bg-black/50 border border-white/10 overflow-hidden"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 20,
                                },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                },
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                            whileHover={{
                                scale: 1.04,
                            }}
                        >
                            {/* glow */}
                            <motion.div
                                className="absolute inset-0 opacity-30 blur-2xl"
                                style={{
                                    backgroundColor: rarityColor,
                                }}
                                animate={{
                                    opacity: [0.15, 0.3, 0.15],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            />

                            <div className="relative z-10 scale-90">
                                {result.type === DropType.CHARACTER ? (
                                    <HeroMiniCard
                                        withoutAnimation
                                        character={{
                                            ...result.item,
                                            progression: {
                                                ...result.item.progression,
                                                ascension: 0
                                            },
                                        }}
                                    />
                                ) : (
                                    <EquipmentCard
                                        withoutAnimation
                                        size={200}
                                        iconSize={100}
                                        equipment={result.item}
                                    />
                                )}
                            </div>

                            {/* rarity border flash */}
                            <motion.div
                                className="absolute inset-0 rounded-xl pointer-events-none"
                                style={{
                                    boxShadow: `0 0 20px ${rarityColor}`,
                                }}
                                animate={{
                                    opacity: [0.4, 0.8, 0.4],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                }}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};