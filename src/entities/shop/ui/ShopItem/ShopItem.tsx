import type { CSSProperties, FC } from "react";
import type { IShopItem } from "../../model/shop.model";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Button } from "@/shared/ui/Button/Button";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";

import styles from "./ShopItem.module.css";
import { useAnimation, motion } from "framer-motion";

interface Props {
    item: IShopItem;
    affordable: boolean;
    buy: () => void;
}

export const ShopItem: FC<Props> = ({
    item,
    affordable,
    buy,
}) => {
    const controls = useAnimation();

    const handleBuy = async () => {
        buy();
        await controls.start({
            y: [0, -20, 0],
            transition: { duration: 0.4 }
        });

    };


    return (
        <div
        className={`
            border-4
            rounded-2xl p-6
            transform transition-all duration-300
            hover:shadow-2xl
            backdrop-blur-2xl
            flex flex-col
            ${styles["shop-item"]}
            ${affordable ? "hover:border-yellow-400" : "opacity-70"}
        `}
        style={{
            '--border-color': getRarityColor(item.rarity),
            '--border-color-hover': `${getRarityColor(item.rarity)}AA`,
            '--background-color': `${getRarityColor(item.rarity)}22`,
            '--background-color-hover': `${getRarityColor(item.rarity)}44`,
        } as CSSProperties}
        >
            <motion.div 
            animate={controls}
            className="my-4 w-full grow flex items-center justify-center">
                {item.item}
            </motion.div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2"
            style={{
                borderColor: getRarityColor(item.rarity),
            }}
            >
                <div className="flex gap-3">
                    <div
                    className="flex items-center gap-1"
                    >
                        <Icon icon={item.priceType} size={64} />
                        <div className="text-white text-3xl font-bold">
                            {item.price}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => handleBuy()}
                    disabled={!affordable}
                    className={`
                        px-4 py-2 text-xl font-bold
                        ${
                        affordable
                            ? "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                            : "bg-gray-600 cursor-not-allowed"
                        }
                    `}
                    >
                    Купить
                </Button>
            </div>
            
        </div>
    )
}