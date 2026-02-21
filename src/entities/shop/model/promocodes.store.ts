import { usePlayerStore } from "@/entities/player/model/player.store";
import type { IPromocode } from "./promocodes.model";
import { SHA256 } from 'crypto-js'

const ALL_PROMOCODES: IPromocode[] = [
    {
        expiresAt: "2026-02-20",
        action: () => { 
            const addBalance = usePlayerStore.getState().addBalance;
            addBalance('gems', 100);
            return 'Получено 100 кристаллов'
        },
        codeHash: SHA256("test").toString()
    },
    {
        expiresAt: "2025-02-20",
        action: () => { 
            const addBalance = usePlayerStore.getState().addBalance;
            addBalance('gems', 100);
            return 'Получено 100 кристаллов'
        },
        codeHash: SHA256("expired").toString()
    },
]

export const testPromocode = (code: string) => {
    const hash = SHA256(code).toString();
    return ALL_PROMOCODES.find(promocode => promocode.codeHash === hash);
}