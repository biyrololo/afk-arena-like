import { Character } from "@/shared/types/character";
import { ShopPriceType, type IShopItem } from "./shop.model";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { AllEquipment, type CreateEquipmentProps } from "@/entities/character/lib/equipmentList";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { Icon } from "@/shared/ui/Icon/Icon";

export const isEnoughResourcesForShopItem = (price: IShopItem['price'], priceType: IShopItem['priceType'], balances: PlayerBalances) => {
    return balances[priceType] >= price;
}

const EquipmentItem = (props: { equipment: CreateEquipmentProps}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center px-4">
            <EquipmentCard equipment={props.equipment as Character.Equipment} />
            <span className="text-white text-xl font-bold text-center text-balance">{props.equipment.name}</span>
        </div>
    )
}

const createEquipmentItem = (
    equipment: CreateEquipmentProps, 
    price: number, 
    priceType: ShopPriceType,
    rarity?: Character.Rarity
): IShopItem => {
    return {
        item: <EquipmentItem equipment={equipment} />,
        price,
        priceType,
        onBuy: () => { 
            usePlayerStore.getState().spend(priceType, price);
            usePlayerCharactersStore.getState().addEquipment(
                createEquipment(equipment)
            );
        },
        rarity: rarity || Character.Rarity.COMMON,
        
    }
}

const createBalanceItem = (
    value: number,
    valueType: keyof PlayerBalances,
    price: number,
    priceType: ShopPriceType,
    rarity?: Character.Rarity
): IShopItem => {
    return {
        item: <div className="flex justify-center items-center gap-4">
            <div
            className="relative p-4"
            >
                <div className="absolute rounded-full bg-black/30 inset-0 top-16 -bottom-4 blur-md"/>
                <Icon icon={valueType} size={100} />
            </div>
            <span className="text-white text-4xl font-bold text-center text-balance">x{value}</span>
        </div>,
        price: price,
        priceType: priceType,
        onBuy: () => { 
            usePlayerStore.getState().spend(priceType, price);
            usePlayerStore.getState().addBalance(valueType, value);
        },
        rarity: rarity || Character.Rarity.COMMON,
    }
}

export const shopItems: IShopItem[] = [
    createEquipmentItem(AllEquipment.EQUIPMENT.gold.chest, 100, ShopPriceType.Gems, Character.Rarity.RARE),
    createBalanceItem(10, 'summons', 100, ShopPriceType.Gems, Character.Rarity.EPIC),
]