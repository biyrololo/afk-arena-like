import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { getRarityName } from "@/entities/character/lib/getRarityName";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { type DropItem, DropType } from "@/entities/summon/lib/summon";
import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

export const SummonResult: FC<{
    result: DropItem
}> = ({ result }) => {
    return (
        <AnimatePresence>
            <motion.div
            key={result.item.id}
            className="flex flex-col items-center backdrop-blur-xs gap-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 pt-14 rounded-lg bg-black/60 border-2 border-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            >
                {
                    result.type === DropType.CHARACTER ? (
                        <>
                            <HeroMiniCard character={result.item} />
                            <div className="flex flex-col relative z-100">
                                <span className="text-white text-center font-bold text-5xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.item.rarity) }}>{result.item.name}</span>
                                <span className="text-white text-center font-bold text-3xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.item.rarity) }}>{getRarityName(result.item.rarity)}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <EquipmentCard equipment={result.item} />
                            <div className="flex flex-col relative z-100">
                                <span className="text-white text-center font-bold text-5xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.item.rarity) }}>{result.item.name}</span>
                                <span className="text-white text-center font-bold text-3xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.item.rarity) }}>{getRarityName(result.item.rarity)}</span>
                            </div>
                        </>
                    )
                }
            </motion.div>
        </AnimatePresence>
    )
}