import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Button } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";

import shop from "@/assets/backgrounds/shop.webp";
import { Balances } from "@/widgets/Balances/Balances";
import { isEnoughResourcesForShopItem, shopItems } from "@/entities/shop/model/shop.store";
import { ShopItem } from "@/entities/shop/ui/ShopItem/ShopItem";
import type { IShopItem } from "@/entities/shop/model/shop.model";
import { PromocodeModal } from "@/entities/shop/ui/PromocodeModal/PromocodeModal";
import { AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const navigate = useNavigate();
  const balances = usePlayerStore(useShallow((state) => state.balances));

  const [isPromocodeModalOpen, setIsPromocodeModalOpen] = useState(false);


  const handleBack = () => {
    navigate("/");
  };

  const handleBuy = (item: IShopItem) => {
    item.onBuy();
  };

  return (
    <ResponsiveUI>
      <div
        className={`
          w-full h-full relative
          bg-cover
          bg-center
        `}
        style={{ backgroundImage: `url(${shop})` }}
      >
        <Balances />
        <div className="absolute inset-0 py-4 flex">
          {/* Back Button */}
          <button
            className="
                  absolute left-4
                  px-6 py-3
                  bg-gradient-to-r from-amber-700 to-amber-900
                  text-white text-2xl font-bold
                  rounded-xl
                  border-2 border-amber-500
                  shadow-lg
                  transform transition-all duration-300
                  hover:scale-105 hover:from-amber-600 hover:to-amber-800
                  active:scale-95
                  self-start
                  flex items-center gap-2
              "
            onClick={handleBack}
          >
            <span className="text-3xl">←</span>
            Назад
          </button>
          <button
            className="
                  absolute right-4
                  top-24
                  px-6 py-3
                  bg-gradient-to-r from-amber-700 to-amber-900
                  text-white text-4xl font-bold
                  rounded-xl
                  border-2 border-amber-500
                  shadow-lg
                  transform transition-all duration-300
                  hover:from-amber-600 hover:to-amber-800
                  self-start
                  flex items-center gap-2
                  z-20
              "
            onClick={() => setIsPromocodeModalOpen(true)}
          >
            Ввести промокод
          </button>

          {/* Header */}
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-6xl mt-20 font-bold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
                МАГАЗИН
              </h1>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-3 gap-6 px-4">
              {shopItems.map((item, index) => {
                const affordable = isEnoughResourcesForShopItem(item.price, item.priceType, balances);

                return (
                  <ShopItem affordable={affordable} key={index} item={item} buy={() => handleBuy(item)} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="sync">
        <PromocodeModal isOpened={isPromocodeModalOpen} close={() => setIsPromocodeModalOpen(false)} />
      </AnimatePresence>
    </ResponsiveUI>
  );
}
