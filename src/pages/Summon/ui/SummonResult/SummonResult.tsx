import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { getRarityName } from "@/entities/character/lib/getRarityName";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { Avatars } from "@/shared/avatars";
import type { Character } from "@/shared/types/character";
import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

export const SummonResult: FC<{
    result: Character.Character
}> = ({ result }) => {
    return (
        <AnimatePresence>
            <motion.div
            key={result.id}
            className="flex flex-col items-center gap-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 pt-14 rounded-lg bg-black/60 border-2 border-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            >
                <HeroMiniCard character={result} />
                <div className="flex flex-col relative z-100">
                    <span className="text-white text-center font-bold text-5xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.rarity) }}>{result.name}</span>
                    <span className="text-white text-center font-bold text-3xl text-shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ color: getRarityColor(result.rarity) }}>{getRarityName(result.rarity)}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}