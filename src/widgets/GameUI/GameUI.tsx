import { useEffect, useState } from "react";

import { EventBus } from "@/utils/eventBus";
import classes from "./GameUI.module.css";
import cn from "classnames";
import { Avatars } from "@/shared/avatars";

interface Hero {
  texture: string;
  energy: number;
  maxEnergy: number;
  hp: number;
  maxHp: number;
}

const MAX_ENERGY = 50;

export default function GameUI() {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    EventBus.on(
      "allyEnergyChange",
      (data: { index: number; energy: number }) => {
        setHeroes((prev) => {
          const newHeroes = [...prev];
          newHeroes[data.index].energy = data.energy;
          return newHeroes;
        });
      },
    );

    return () => {
      EventBus.removeListener("allyEnergyChange");
    };
  }, []);

  useEffect(() => {
    EventBus.on("allyUpdateHP", (data: { index: number; hp: number }) => {
      setHeroes((prev) => {
        const newHeroes = [...prev];
        newHeroes[data.index].hp = data.hp;
        return newHeroes;
      });
    });

    return () => {
      EventBus.removeListener("allyUpdateHP");
    };
  });

  useEffect(() => {
    EventBus.on("createdAllies", (data: Hero[]) => {
      console.log(data);
      setHeroes(data);
    });

    return () => {
      EventBus.removeListener("createdAllies");
    };
  }, []);

  const handleClick = (index: number) => {
    if (
      heroes[index].hp > 0 &&
      heroes[index].energy >= heroes[index].maxEnergy
    ) {
      EventBus.emit("useAllySpecialAttack", index);
    }
  };

  return (
    <div
      className={`
            text-white absolute bottom-0 h-[250px] bg-zinc-700/80 w-full
            flex
            items-center
            gap-10
            p-10
        `}
    >
      {heroes.map((h, i) => (
        <button
          key={i}
          className={cn(
            `
                        w-50 h-50
                        bg-cover
                        relative
                        `,
            {
              [classes["burning-border"]]: h.energy >= h.maxEnergy && h.hp > 0,
            },
          )}
          style={{
            backgroundImage: `url(${Avatars[h.texture as keyof typeof Avatars]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor:
              h.energy < h.maxEnergy || h.hp <= 0 ? "not-allowed" : "pointer",
            ...(h.energy >= h.maxEnergy &&
              h.hp > 0 && {
                scale: 1.1,
              }),
            ...(h.hp <= 0 && {
              opacity: 0.5,
              filter: "grayscale(100%)",
            }),
          }}
          onClick={() => handleClick(i)}
          disabled={h.energy < h.maxEnergy || h.hp <= 0}
        >
          <div
            className={`absolute
                            w-full
                            top-0
                            bg-zinc-700/60
                            transition-all
                            duration-500
                        `}
            style={{
              height: `${h.hp > 0 ? (1 - h.energy / h.maxEnergy) * 100 : 0}%`,
            }}
          />
          <div
            className={`
                            absolute
                            left-0
                            bottom-0
                            right-0
                            bg-zinc-800
                            h-3
                        `}
          >
            <div
              className={`
                                absolute
                                left-0
                                bottom-0
                                h-full
                                bg-red-500
                            `}
              style={{
                width: `${(h.hp / h.maxHp) * 100}%`,
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
