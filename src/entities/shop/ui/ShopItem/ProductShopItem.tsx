import { useState, type CSSProperties, type FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";

import styles from "./ShopItem.module.css";
import { useAnimation, motion } from "framer-motion";
import type { Product } from "ysdk";
import { Character } from "@/shared/types/character";

interface Props {
    product: Product;
    affordable: boolean;
    buy: () => void;
    rarity?: Character.Rarity
}

export const ProductShopItem: FC<Props> = ({
    product,
    affordable,
    buy,
    rarity = Character.Rarity.EPIC
}) => {
    const controls = useAnimation();
    const [bought, setBought] = useState(false);

    const isAlreadyBought = false;

    const handleBuy = async () => {
        buy();
        setBought(true);
        setTimeout(() => {
            setBought(false);
        }, 1000);
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
                '--border-color': getRarityColor(rarity),
                '--border-color-hover': `${getRarityColor(rarity)}AA`,
                '--background-color': `${getRarityColor(rarity)}22`,
                '--background-color-hover': `${getRarityColor(rarity)}44`,
            } as CSSProperties}
        >
            <motion.div
                animate={controls}
                className={
                    `my-4 w-full grow flex items-center justify-center
                ${isAlreadyBought ? 'opacity-50' : ''}
                `
                }>
                <img src={product.imageURI} className="size-[100px]" alt={product.title} />
                <div className="text-white text-2xl font-bold text-center text-balance">{product.title}</div>
            </motion.div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2"
                style={{
                    borderColor: getRarityColor(rarity),
                }}
            >
                <div className="flex gap-3">
                    <div
                        className="flex items-center gap-1"
                    >
                        <img src={product.getPriceCurrencyImage('small')} className="size-[50px]" alt={product.priceCurrencyCode} />
                        <div className={`text-white ${product.price.toString().length > 3 ? 'text-2xl' : 'text-3xl'} font-bold`}>
                            {product.price}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        if (!isAlreadyBought)
                            handleBuy()
                    }}
                    disabled={!affordable}
                    className={`
                    px-4 py-2 text-xl font-bold
                    ${affordable ?
                            bought || isAlreadyBought ? "bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800" :
                                "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                            : "bg-gray-600 cursor-not-allowed"
                        }
                    ${isAlreadyBought ? 'opacity-50' : ''
                        }
                `}
                >
                    {
                        bought || isAlreadyBought ? "Куплено" : "Купить"
                    }
                </Button>
            </div>

        </div>
    )
}