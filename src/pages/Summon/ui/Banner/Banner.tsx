import type { Banner } from "@/entities/summon/lib/summon.model";
import type { FC } from "react";

import { motion } from "framer-motion";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";

export const SummonBanner: FC<Banner> = (props) => {
  return (
    <motion.section
      initial={{ opacity: 0, top: "-50%" }}
      exit={{ opacity: 0, top: "-50%" }}
      animate={{ opacity: 1, top: "50%" }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4/5 h-2/3 bg-cover bg-center border-2 border-white rounded-lg"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      {
        props.featuredCharachers && (
          <div
          className="absolute top-4 left-4"
          >
            <p className="text-orange-300 text-6xl text-shadow-[0_0_30px_rgba(0,0,0,0.9)] relative z-50">Шансы повышены</p>
            <div className="flex gap-4 mt-10">
              {
                props.featuredCharachers.map(c => (
                  <HeroMiniCard
                  key={c.key}
                  character={c}
                  />
                ))
              }
            </div>
          </div>
        )
      }
      <div className="absolute bottom-8 left-8 text-white text-shadow-[0_0_30px_rgba(0,0,0,0.9)] text-8xl font-bold">
        {props.name}
      </div>
    </motion.section>
  );
};
