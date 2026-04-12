import { usePlayerStore } from "@/entities/player/model/player.store";
import { SDK } from "./sdk"
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { createEquipment } from "@/entities/character/lib/allEquipment";
import { Weapons } from "@/entities/character/lib/equipmentList";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";
import { METAL_BLADEKEEPER_CHARACTER } from "@/entities/character/lib/allCharacters";
import { cloneCharacter } from "@/shared/types/character";

export const consumeAllPurchases = async () => {
    try {
        const purchases = await SDK.getInstance()
            .getPurchases()
        if (purchases) {
            for (const purchase of purchases) {
                await consumePurchase(purchase.productID, purchase.purchaseToken);
            }
        }
    } catch (error) {
        console.error("Error consuming purchases:", error);
    }
};

export const consumePurchase = (productID: string, purchaseToken: string) => {
    let consumable = false;
    switch (productID) {
        case "gems_small": { // 100 кристаллов
            usePlayerStore.getState().addBalance('gems', 100)
            consumable = true;
            break;
        }
        case "gems_unsmall": { // 600 кристаллов
            usePlayerStore.getState().addBalance('gems', 600)
            consumable = true;
            break;
        }
        case "gems_big": { // 2000 кристаллов
            usePlayerStore.getState().addBalance('gems', 2000)
            consumable = true;
            break;
        }
        case "gems_huge": { // 4000 кристаллов
            usePlayerStore.getState().addBalance('gems', 4000)
            consumable = true;
            break;
        }
        case "starter_pack": { // 2000 кристаллов, Элара и меч героя
            usePlayerStore.getState().addBalance('gems', 2000)
            usePlayerCharactersStore.getState().addEquipment(createEquipment(
                Weapons.WEAPONS.hero
            ))
            consumable = true;
            usePlayerStatsStore.getState().addBoughtProduct(productID);
            const characters = usePlayerCharactersStore.getState().characters;

            const c = characters.find(char => char.key === METAL_BLADEKEEPER_CHARACTER.key);
            if (c) {
                if (c.progression.ascension < 5) {
                    c.progression.ascension += 1;
                } else {
                    usePlayerStore.getState().addBalance('gems', 500)
                }
            } else {
                usePlayerCharactersStore.getState().addCharacter(cloneCharacter(METAL_BLADEKEEPER_CHARACTER));
            }
            break;
        }
        default:
            console.warn(`Unknown purchase productID: ${productID}`);
            break;
    }
    if (consumable) {
        return SDK.getInstance()
            .consumePurchase(purchaseToken)
    }
}