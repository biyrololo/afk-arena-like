import { usePlayerStore } from "@/entities/player/model/player.store";
import { SDK } from "./sdk"

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
        default:
            console.warn(`Unknown purchase productID: ${productID}`);
            break;
    }
    if (consumable) {
        return SDK.getInstance()
            .consumePurchase(purchaseToken)
    }
}