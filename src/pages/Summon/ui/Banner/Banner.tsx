import type { Banner } from "@/entities/summon/lib/summon.model";
import type { FC } from "react";

import { motion } from "framer-motion";

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
      <div className="absolute bottom-8 left-8 text-white text-shadow-[0_0_30px_rgba(0,0,0,0.9)] text-6xl font-bold">
        {props.name}
      </div>
    </motion.section>
  );
};
