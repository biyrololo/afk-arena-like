import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { Button } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";

import shop from "@/assets/backgrounds/shop.webp";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: Record<string, number>;
  type: "character" | "equipment" | "consumable";
  rarity: "common" | "rare" | "epic" | "legendary";
  image?: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "char_knight",
    name: "Рыцарь",
    description: "Баланс между защитой и атакой",
    price: { gold: 500 },
    type: "character",
    rarity: "common",
  },
  {
    id: "char_mage",
    name: "Маг",
    description: "Высокий урон, низкая защита",
    price: { gold: 750 },
    type: "character",
    rarity: "rare",
  },
  {
    id: "equip_sword_legendary",
    name: "Легендарный меч",
    description: "+50 к атаке",
    price: { gold: 1000 },
    type: "equipment",
    rarity: "legendary",
  },
  {
    id: "equip_shield_epic",
    name: "Эпический щит",
    description: "+30 к защите",
    price: { gold: 800 },
    type: "equipment",
    rarity: "epic",
  },
  {
    id: "potion_hp",
    name: "Зелье здоровья",
    description: "Восстанавливает 100 ОЗ",
    price: { gold: 50 },
    type: "consumable",
    rarity: "common",
  },
  {
    id: "potion_power",
    name: "Зелье силы",
    description: "+20 к атаке на 3 боя",
    price: { gold: 150 },
    type: "consumable",
    rarity: "rare",
  },
];

const RARITY_COLORS = {
  common: "text-gray-300 border-gray-500",
  rare: "text-blue-300 border-blue-500",
  epic: "text-purple-300 border-purple-500",
  legendary: "text-yellow-300 border-yellow-500",
};

const RARITY_BG = {
  common: "bg-gray-900/80",
  rare: "bg-blue-900/30",
  epic: "bg-purple-900/30",
  legendary: "bg-yellow-900/20",
};

export default function ShopPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ShopItem["type"]
  >("all");

  const balances = usePlayerStore(useShallow((state) => state.balances));

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return SHOP_ITEMS;
    return SHOP_ITEMS.filter((item) => item.type === selectedCategory);
  }, [selectedCategory]);

  const handlePurchase = (item: ShopItem) => {
    // TODO: Implement purchase logic
    console.log("Purchasing:", item.name);
  };

  const canAfford = (price: Record<string, number>): boolean => {
    return Object.entries(price).every(
      ([resource, amount]) =>
        (balances[resource as keyof typeof balances] || 0) >= amount,
    );
  };

  const getRarityBorder = (rarity: ShopItem["rarity"]) => {
    return RARITY_COLORS[rarity].split(" ")[1]; // Return border color class
  };

  const handleBack = () => {
    navigate("/");
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

          {/* Header */}
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
                МАГАЗИН
              </h1>
              <div className="flex justify-center gap-8 text-2xl text-white">
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
                  <Icon icon="gold" />
                  <span>{balances.gold || 0}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
                  <Icon icon="gems" />
                  <span>{balances.gems || 0}</span>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center gap-4">
              {(["all", "character", "equipment", "consumable"] as const).map(
                (category) => (
                  <button
                    key={category}
                    className={`
                    px-6 py-3 text-xl font-bold rounded-xl border-2 transition-all duration-200
                    backdrop-blur-2xl
                    ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white border-amber-400 scale-105"
                        : "bg-gray-800/60 text-gray-300 border-gray-600 hover:bg-gray-700/60"
                    }
                  `}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" && "Все"}
                    {category === "character" && "Герои"}
                    {category === "equipment" && "Снаряжение"}
                    {category === "consumable" && "Расходники"}
                  </button>
                ),
              )}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {filteredItems.map((item) => {
                const affordable = canAfford(item.price);
                const rarityClasses = RARITY_COLORS[item.rarity];
                const bgClass = RARITY_BG[item.rarity];

                return (
                  <div
                    key={item.id}
                    className={`
                      ${bgClass}
                      border-4 ${getRarityBorder(item.rarity)}
                      rounded-2xl p-6
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-2xl
                      backdrop-blur-2xl
                      ${affordable ? "hover:border-yellow-400" : "opacity-70"}
                    `}
                  >
                    {/* Item Header */}
                    <div className="mb-4">
                      <h3
                        className={`text-2xl font-bold ${rarityClasses.split(" ")[0]} mb-2`}
                      >
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Item Type Badge */}
                    <div className="mb-4">
                      <span
                        className={`
                        inline-block px-3 py-1 text-xs font-bold rounded-full
                        ${item.type === "character" ? "bg-blue-500/30 text-blue-300" : ""}
                        ${item.type === "equipment" ? "bg-purple-500/30 text-purple-300" : ""}
                        ${item.type === "consumable" ? "bg-green-500/30 text-green-300" : ""}
                      `}
                      >
                        {item.type === "character" && "Герой"}
                        {item.type === "equipment" && "Снаряжение"}
                        {item.type === "consumable" && "Расходник"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                      <div className="flex gap-3">
                        {Object.entries(item.price).map(
                          ([resource, amount]) => (
                            <div
                              key={resource}
                              className="flex items-center gap-1"
                            >
                              <Icon icon={resource as any} size={24} />
                              <span className="text-white font-bold">
                                {amount}
                              </span>
                            </div>
                          ),
                        )}
                      </div>

                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={!affordable}
                        className={`
                          px-4 py-2 text-lg font-bold
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
                );
              })}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl text-gray-500 mb-4">📭</div>
                <p className="text-2xl text-gray-400">
                  Нет товаров в этой категории
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ResponsiveUI>
  );
}
