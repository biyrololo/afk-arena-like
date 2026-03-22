import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Button } from "@/shared/ui/Button/Button";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";

import shop from "@/assets/backgrounds/shop.webp";
import { Balances } from "@/widgets/Balances/Balances";
import { isEnoughResourcesForShopItem, getShopItems } from "@/entities/shop/model/shop.store";
import { ShopItem } from "@/entities/shop/ui/ShopItem/ShopItem";
import { ShopPriceType, type IShopItem } from "@/entities/shop/model/shop.model";
import { PromocodeModal } from "@/entities/shop/ui/PromocodeModal/PromocodeModal";
import { AnimatePresence } from "framer-motion";
import { useBackgroundMusic } from "@/shared/hooks/useBackgroundMusic";
import { MUSIC } from "@/assets/music/music";
import { useSoundEffects } from "@/shared/hooks/useSoundEffects";
import { SOUNDS } from "@/assets/sound/sounds";
// import { type Product as SDKProduct } from "ysdk";
type SDKProduct = any;
import { SDK } from "@/entities/sdk/model/sdk";
import { ProductShopItem } from "@/entities/shop/ui/ShopItem/ProductShopItem";
import { consumePurchase } from "@/entities/sdk/model/sdkConsumePurchases";
import { useGameStateStore } from "@/entities/game/model/game-state.store";

const PER_PAGE = 6;

export default function ShopPage() {
  const sounds = useSoundEffects(SOUNDS);
  const [products, setProducts] = useState<SDKProduct[]>([]);

  useEffect(() => {
    SDK
      .getInstance()
      .getCatalog()
      .then((products) => {
        if (products) {
          setProducts(products);
        }
      })
      .catch((error) => {
        console.error("Error fetching catalog in Shop.tsx:", error);
      });
  }, [])

  const music = useBackgroundMusic(MUSIC.menu, { loop: true, volume: 0.2 });
  useEffect(() => {
    music.play();
    return () => {
      music.stop();
    };
  }, [music.play]);

  const navigate = useNavigate();
  const balances = usePlayerStore(useShallow((state) => state.balances));

  const [isPromocodeModalOpen, setIsPromocodeModalOpen] = useState(false);

  const [params, setParams] = useSearchParams();

  const page = parseInt(params.get("page") ?? "0") ?? 0;

  const shopItems = getShopItems();

  const allShopItems = useMemo(() => {
    return [...products, ...shopItems];
  }, [shopItems, products]);

  const paginatedShopItems = useMemo(() => {
    return allShopItems.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  }, [page, allShopItems]);

  const isNextDisabled = useMemo(() => {
    return page * PER_PAGE + PER_PAGE >= allShopItems.length;
  }, [allShopItems, page, PER_PAGE]);

  const isPreviousDisabled = useMemo(() => {
    return page === 0;
  }, [page]);

  const handleNext = () => {
    setParams({
      ...params,
      page: (page + 1).toString(),
    });
  };

  const handlePrevious = () => {
    setParams({
      ...params,
      page: (page - 1).toString(),
    });
  };


  const handleBack = () => {
    navigate("/");
  };

  const handleBuy = (item: IShopItem) => {
    if (item.priceType !== ShopPriceType.Ad) {
      sounds.playSound('sci_fi_confirm', 0.8)
    }
    item.onBuy();
  };

  const handleBuyProduct = async (product: SDKProduct) => {
    try {
      useGameStateStore.getState().setPaused(true);
      useGameStateStore.getState().setIsCurrentScreenPaused(true);
      const res = await SDK.getInstance().purchase(product.id);
      if (res) {
        await consumePurchase(res.productID, res.purchaseToken);
      }
    } catch (error) {
      console.error(`Error buying product ${product.title} :`, error);
    } finally {
      useGameStateStore.getState().setPaused(false);
      useGameStateStore.getState().setIsCurrentScreenPaused(false);
    }
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
            tabIndex={-1}
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
            tabIndex={-1}
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
              {paginatedShopItems.map((item, index) => {
                if ('imageURI' in item) {
                  return (
                    <ProductShopItem
                      product={item}
                      affordable
                      buy={() => handleBuyProduct(item)}
                    />
                  )
                }
                const affordable = isEnoughResourcesForShopItem(item.price, item.priceType, balances);

                return (
                  <ShopItem affordable={affordable} key={index} item={item} buy={() => handleBuy(item)} />
                )
              })}
            </div>
            <div className="flex gap-4 justify-between w-full px-20 mt-auto">
              <Button onClick={handlePrevious} disabled={isPreviousDisabled}>
                {"<"}
              </Button>
              <span className="text-2xl font-bold text-white">
                {page + 1} / {Math.ceil(allShopItems.length / PER_PAGE)}
              </span>
              <Button onClick={handleNext} disabled={isNextDisabled}>
                {">"}
              </Button>
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
