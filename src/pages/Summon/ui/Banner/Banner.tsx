import type { Banner } from "@/entities/summon/lib/summon.model";
import type { FC } from "react";

import { motion } from "framer-motion";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { getTimeUntilNextRotation } from "@/entities/summon/lib/summon";
import { declOfNum } from "@/shared/lib/helpers";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";

export const SummonBanner: FC<Banner> = (props) => {
  const { days } = getTimeUntilNextRotation();
  return (
    <motion.section
      initial={{ opacity: 0, top: "-50%" }}
      exit={{ opacity: 0, top: "-50%" }}
      animate={{ opacity: 1, top: "50%" }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4/5 h-2/3 bg-cover bg-center border-2 border-white rounded-lg z-50"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      {
        (props.featuredCharachers || props.featuredEquipment) && (
          <>
            <div
              className="absolute top-4 left-4 w-full"
            >
              <p className="text-orange-300 text-6xl text-shadow-[0_0_30px_rgba(0,0,0,0.9)] relative z-50">Шансы повышены</p>
              <div className="flex justify-center gap-4 mt-6 w-full">
                {
                  props.featuredCharachers?.map(c => (
                    <HeroMiniCard
                      key={c.key}
                      character={c}
                      size="160px"
                    />
                  ))
                }
                {
                  props.featuredEquipment?.map(c => (
                    <EquipmentCard
                      key={`${c.key}-${c.slot}`}
                      equipment={{ ...c, id: `${c.key}-${c.slot}` }}
                      size={160}
                    />
                  ))
                }
              </div>
            </div>
            <p className="text-white absolute top-4 right-4 text-shadow-[0_0_30px_rgba(0,0,0,0.9)] text-4xl font-bold bg-zinc-600/80 p-4 rounded-xl">Осталось {days} {declOfNum(days, ["день", "дня", "дней"])}</p>
          </>
        )
      }
      <div className="absolute bottom-8 left-8 text-white text-shadow-[0_0_30px_rgba(0,0,0,0.9)] text-8xl font-bold">
        {props.name}
      </div>
    </motion.section>
  );
};
