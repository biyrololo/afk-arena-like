import type { Banner } from "@/entities/summon/lib/summon.model";
import type { FC } from "react";

export const SummonBanner: FC<Banner> = (props) => {
    return (
        <section
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4/5 h-2/3 bg-cover bg-center border-2 border-white rounded-lg"
            style={{ backgroundImage: `url(${props.image})` }}
        >
            <div className="absolute top-4 left-4 text-white text-shadow-[0_0_10px_rgba(0,0,0,0.5)] text-2xl font-bold">
                {props.name}
            </div>
        </section>
    )
};