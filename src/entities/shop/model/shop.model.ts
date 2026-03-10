import type { Character } from "@/shared/types/character";
import type { JSX } from "react";

export enum ShopPriceType {
    Gold = "gold",
    Gems = "gems",
    Ad = "ad",
}

export interface IShopItem {
    item: JSX.Element | string;
    price: number;
    priceType: ShopPriceType;
    onBuy: () => void;
    rarity: Character.Rarity;
    alreadyBought?: () => boolean;
}