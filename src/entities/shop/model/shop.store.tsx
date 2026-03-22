import { Character } from "@/shared/types/character";
import { ShopPriceType, type IShopItem } from "./shop.model";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { AllEquipment, Weapons, type CreateEquipmentProps } from "@/entities/character/lib/equipmentList";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { Icon } from "@/shared/ui/Icon/Icon";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { FANTASY_WARRIOR_CHARACTER } from "@/entities/character/lib/allCharacters";
import { useGameStateStore } from "@/entities/game/model/game-state.store";
import { SDK } from "@/entities/sdk/model/sdk";

export const isEnoughResourcesForShopItem = (price: IShopItem['price'], priceType: IShopItem['priceType'], balances: PlayerBalances) => {
    if (priceType === ShopPriceType.Ad) return true;
    return balances[priceType] >= price;
}

const EquipmentItem = (props: { equipment: CreateEquipmentProps }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center px-4">
            <EquipmentCard equipment={props.equipment as Character.Equipment} />
            <span className="text-white text-xl font-bold text-center text-balance">{props.equipment.name}</span>
        </div>
    )
}

const CharacterItem = (props: { character: Character.Character }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center px-4">
            <HeroMiniCard character={props.character} size="150px" />
            <span className="text-white text-xl font-bold text-center text-balance relative z-50">{props.character.name}</span>
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
            usePlayerStore.getState().spend(priceType as keyof PlayerBalances, price);
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
                <div className="absolute rounded-full bg-black/30 inset-0 top-16 -bottom-4 blur-md" />
                <Icon icon={valueType} size={100} />
            </div>
            <span className="text-white text-4xl font-bold text-center text-balance">x{value}</span>
        </div>,
        price: price,
        priceType: priceType,
        onBuy: () => {
            if (priceType === ShopPriceType.Ad) {
                useGameStateStore.getState().setPaused(true);
                useGameStateStore.getState().setIsCurrentScreenPaused(true);
                SDK.getInstance()
                    .showRewardedVideo({
                        onClose: () => {
                            useGameStateStore.getState().setPaused(false);
                            useGameStateStore.getState().setIsCurrentScreenPaused(false);
                            SDK.getInstance().gameStart();
                        },
                        onRewarded: () => {
                            usePlayerStore.getState().addBalance(valueType, value);
                            useGameStateStore.getState().setPaused(false);
                            useGameStateStore.getState().setIsCurrentScreenPaused(false);
                            SDK.getInstance().gameStart();
                        },
                    })
            } else {
                usePlayerStore.getState().spend(priceType, price);
                usePlayerStore.getState().addBalance(valueType, value);
            }
        },
        rarity: rarity || Character.Rarity.COMMON,
    }
}

const createCharacterItem = (
    character: Character.Character,
    price: number,
    priceType: ShopPriceType,
    rarity?: Character.Rarity
): IShopItem => {
    return {
        item: <CharacterItem character={character} />,
        price: price,
        priceType: priceType,
        onBuy: () => {
            usePlayerStore.getState().spend(priceType as keyof PlayerBalances, price);
            usePlayerCharactersStore.getState().addCharacter(structuredClone(character));
        },
        rarity: rarity || Character.Rarity.COMMON,
        alreadyBought: () => usePlayerCharactersStore.getState().characters.some(c => c.key === character.key),
    }
}

const FEATURED_ROTATION_START = new Date("2025-01-01").getTime();
const WEEK = 7 * 24 * 60 * 60 * 1000;

const getRandomItems = () => {
    const now = Date.now();
    const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);

    const items = [
        [
            createCharacterItem(FANTASY_WARRIOR_CHARACTER, 19999, ShopPriceType.Gems, Character.Rarity.EPIC),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel_green.helmet, 999, ShopPriceType.Gems, Character.Rarity.EPIC),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel_orange.chest, 999, ShopPriceType.Gems, Character.Rarity.EPIC),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel_green.boots, 999, ShopPriceType.Gems, Character.Rarity.EPIC),
            createEquipmentItem(Weapons.WEAPONS.ancient_heavy, 999, ShopPriceType.Gems, Character.Rarity.EPIC),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel.helmet, 99_000, ShopPriceType.Gold, Character.Rarity.RARE),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel_browngreen.chest, 99_000, ShopPriceType.Gold, Character.Rarity.RARE),
            createEquipmentItem(AllEquipment.EQUIPMENT.steel_brown.boots, 99_000, ShopPriceType.Gold, Character.Rarity.RARE),
            createEquipmentItem(Weapons.WEAPONS.consecration, 99_000, ShopPriceType.Gold, Character.Rarity.RARE),
            createEquipmentItem(AllEquipment.EQUIPMENT.light.helmet, 19_000, ShopPriceType.Gold, Character.Rarity.UNCOMMON),
            createEquipmentItem(AllEquipment.EQUIPMENT.orange.chest, 19_000, ShopPriceType.Gold, Character.Rarity.UNCOMMON),
            createEquipmentItem(AllEquipment.EQUIPMENT.green.boots, 19_000, ShopPriceType.Gold, Character.Rarity.UNCOMMON),
            createEquipmentItem(Weapons.WEAPONS.solid_purple, 19_000, ShopPriceType.Gold, Character.Rarity.UNCOMMON),
            createEquipmentItem(AllEquipment.EQUIPMENT.browngreen.helmet, 2000, ShopPriceType.Gold, Character.Rarity.COMMON),
            createEquipmentItem(AllEquipment.EQUIPMENT.browngreen.chest, 2000, ShopPriceType.Gold, Character.Rarity.COMMON),
            createEquipmentItem(AllEquipment.EQUIPMENT.browngreen.boots, 2000, ShopPriceType.Gold, Character.Rarity.COMMON),
            createEquipmentItem(Weapons.WEAPONS.bone, 2000, ShopPriceType.Gold, Character.Rarity.COMMON),
        ]
    ]

    return items[weekIndex % items.length];
}

export const getShopItems = (): IShopItem[] => [
    createBalanceItem(1, 'summonsSpecial', 200, ShopPriceType.Gems, Character.Rarity.EPIC),
    createBalanceItem(30, 'gems', 0, ShopPriceType.Ad, Character.Rarity.LEGENDARY),
    createBalanceItem(1, 'summons', 200, ShopPriceType.Gems, Character.Rarity.EPIC),
    createBalanceItem(10000, 'gold', 200, ShopPriceType.Gems, Character.Rarity.RARE),
    createBalanceItem(100_000, 'gold', 1000, ShopPriceType.Gems, Character.Rarity.LEGENDARY),
    ...getRandomItems(),
    createBalanceItem(10, 'summonsSpecial', 200 * 9, ShopPriceType.Gems, Character.Rarity.EPIC),
    createBalanceItem(10, 'summons', 200 * 9, ShopPriceType.Gems, Character.Rarity.EPIC),
]