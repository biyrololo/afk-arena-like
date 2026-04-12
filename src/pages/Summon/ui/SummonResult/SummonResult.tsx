import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { getRarityName } from "@/entities/character/lib/getRarityName";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { type DropItem, DropType } from "@/entities/summon/lib/summon";
import { Icon } from "@/shared/ui/Icon/Icon";
import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

export const SummonResult: FC<{
    result: DropItem;
}> = ({ result }) => {
    const rarityColor = getRarityColor(result.item.rarity);
    const isDuplicate = Boolean(result.ascension);

    return (
        <AnimatePresence>
            <motion.div
                key={result.item.id}
                className="absolute inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* Flash */}
                <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: rarityColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: 0.55,
                        times: [0, 0.25, 1],
                        ease: "easeOut",
                    }}
                />

                {/* Aura */}
                <motion.div
                    className="absolute w-[500px] h-[600px] rounded-full blur-3xl"
                    style={{ backgroundColor: rarityColor }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.15, 1],
                        opacity: [0, 0.7, 0.45],
                    }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />

                {/* Main card container */}
                <motion.div
                    className="relative flex flex-col items-center gap-10 w-1/2 min-h-[600px] pt-14 rounded-2xl bg-black/50 border-2 border-white/30 backdrop-blur-xl overflow-hidden"
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                        y: 80,
                        rotateX: 35,
                        filter: "blur(20px)",
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: 40,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* floating shine */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `radial-gradient(circle at center, ${rarityColor} 0%, transparent 70%)`,
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Character / equipment floating */}
                    <motion.div
                        className="relative z-10"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {result.type === DropType.CHARACTER ? (
                            <HeroMiniCard
                                size="300px"
                                character={{
                                    ...result.item,
                                    progression: {
                                        ...result.item.progression,
                                        ascension: Math.min(
                                            result.ascension ?? 0,
                                            5
                                        ),
                                    },
                                }}
                            />
                        ) : (
                            <EquipmentCard equipment={result.item} size={220} iconSize={160} />
                        )}
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="flex flex-col relative z-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.45,
                            duration: 0.5,
                        }}
                    >
                        <motion.span
                            className="text-center font-bold text-5xl"
                            style={{
                                color: rarityColor,
                                textShadow: `0 0 18px ${rarityColor}`,
                            }}
                            animate={{
                                textShadow: [
                                    `0 0 10px ${rarityColor}`,
                                    `0 0 25px ${rarityColor}`,
                                    `0 0 10px ${rarityColor}`,
                                ],
                            }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                            }}
                        >
                            {result.item.name}
                        </motion.span>

                        <motion.span
                            className="text-center font-bold text-3xl"
                            style={{
                                color: rarityColor,
                                textShadow: `0 0 12px ${rarityColor}`,
                            }}
                            animate={{
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 1.4,
                                repeat: Infinity,
                            }}
                        >
                            {getRarityName(result.item.rarity)}
                        </motion.span>

                        {isDuplicate && (
                            <motion.p
                                className="text-white text-center font-bold text-5xl mt-4"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.8,
                                    duration: 0.45,
                                    type: "spring",
                                }}
                            >
                                Дубликат!
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Duplicate reward reveal */}
                    {isDuplicate && (
                        <motion.div
                            className="absolute inset-0 backdrop-blur-xl bg-black/40 flex items-center justify-center z-30"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{
                                duration: 3.5,
                                ease: "easeOut",
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.4, rotate: -15 }}
                                animate={{
                                    scale: [0.4, 1.2, 1],
                                    rotate: [0, 6, 0],
                                }}
                                transition={{
                                    duration: 0.8,
                                    type: "spring",
                                }}
                            >
                                {result.ascension &&
                                    result.ascension <= 5 ? (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.08, 1],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <Icon icon="star" size={200} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="flex gap-4 items-center justify-center text-white text-8xl"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                        }}
                                    >
                                        500 <Icon icon="gems" size={100} />
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};