import { getRarityColor } from "@/entities/character/lib/getRarityColor";
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
            className="flex absolute top-1/2 left-1/2 gap-4 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 rounded-lg bg-black/60 border-2 border-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                boxShadow: `0 0 20px ${getRarityColor(result.rarity)}`,
            }}
            >
                <img className="h-full rounded" src={Avatars[result.key as keyof typeof Avatars]} alt={result.name} />
                <div className="flex flex-col">
                    <p className={`
                        text-white text-center font-bold
                        mt-4
                        text-4xl
                    `}
                    style={{color: getRarityColor(result.rarity)}}
                    >{result.name}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}