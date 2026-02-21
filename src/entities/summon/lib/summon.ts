import { AllEquipment } from "@/entities/character/lib/equipmentList";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore, { mockCharacters } from "@/shared/store/PlayerCharactersStore"
import { Character } from "@/shared/types/character";
import { calculateCharacterPower, calculateEquipmentPower } from "@/shared/types/develop";
import { v4 } from "uuid";

export enum DropType {
    CHARACTER = 'character',
    EQUIPMENT = 'equipment'
}

export type DropItem = {
    type: DropType.CHARACTER;
    item: Character.Character;
    weight: number;
    ascension?: number;
} | {
    type: DropType.EQUIPMENT;
    item: Character.Equipment;
    weight: number;
}


const ALL_DROP: DropItem[] = [
    ...mockCharacters.map(c => ({
        type: DropType.CHARACTER,
        item: c,
        weight: calculateCharacterPower(c)
    })),
    ...Object.values(AllEquipment.EQUIPMENT)
    .map(e => Object.values(e))
    .flat()
    .map(e => ({
        type: DropType.EQUIPMENT,
        item: e,
        weight: calculateEquipmentPower(e) * 1.2
    }))
]

const EQUIPMENT_DROP = Object.values(AllEquipment.EQUIPMENT)
    .map(e => Object.values(e))
    .flat()
    .filter((e: Character.Equipment) => e.rarity !== Character.Rarity.COMMON)
    .map(e => ({
        type: DropType.EQUIPMENT,
        item: e,
        weight: calculateEquipmentPower(e)
    }))

const prepareDrop = (drops: DropItem[]) => {
    const sum = drops.reduce((acc, cur) => acc + 1 / (cur.weight || 1), 0);
    drops.forEach(drop => drop.weight /= sum);
}

prepareDrop(ALL_DROP);
prepareDrop(EQUIPMENT_DROP);

const DROPS_BY_ID = {
    "all": ALL_DROP,
    "equipment": EQUIPMENT_DROP
}

const summonOnce = (drops: DropItem[]) => {
    const result = drops[Math.floor(Math.random() * drops.length)]
    return structuredClone(result)
}

export const summon = (amount: 1 | 10, id: string) => {
    const drops = DROPS_BY_ID[id as keyof typeof DROPS_BY_ID];
    if(!drops) {
        throw new Error("Invalid drop id");
    }
    let balances = usePlayerStore.getState().balances;

    if(balances.summons < amount) return []

    usePlayerStore.getState().setBalances({
        ...balances,
        summons: balances.summons - amount
    })

    const result = []
    for (let i = 0; i < amount; i++) {
        const r = summonOnce(drops)
        if (r.type === DropType.CHARACTER) {
            r.item.power = calculateCharacterPower(r.item)
            r.item.id = v4();
        } else if (r.type === DropType.EQUIPMENT) {
            r.item.id = v4();
            r.item.equippedCharacterId = undefined;
        }
        result.push(r)
    }

    const newCharacters = result.filter(r => r.type === DropType.CHARACTER).map(r => r.item);

    const currentCharacters = usePlayerCharactersStore
        .getState()
        .characters;
    
    let totalGemsBonus = 0;

    result.forEach(r => {
        if(r.type === DropType.CHARACTER) {
            const newCharacter = r.item;
            const c = currentCharacters.find(ch => ch.key === newCharacter.key)
            if(c) {
                r.ascension = c.progression.ascension + 1;
                if(c.progression.ascension < 5) {
                    c.progression.ascension++;
                } else {
                    totalGemsBonus += 20;
                }
            }
        }
    })

    usePlayerCharactersStore
    .getState()
    .setCharacters(
        currentCharacters.concat(newCharacters.filter(c => !currentCharacters.some(ch => ch.key === c.key)))
    )

    balances = usePlayerStore.getState().balances;

    usePlayerStore.getState().setBalances({
        ...balances,
        gems: balances.gems + totalGemsBonus
    })

    usePlayerCharactersStore
    .getState()
    .setEquipment(
        usePlayerCharactersStore
        .getState()
        .equipment.concat(result.filter(r => r.type === DropType.EQUIPMENT).map(r => r.item))
    )

    return result
} 