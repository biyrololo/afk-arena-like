import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore, { mockCharacters } from "@/shared/store/PlayerCharactersStore"
import { v4 } from "uuid";

const summonOnce = () => {
    const hero = mockCharacters[Math.floor(Math.random() * mockCharacters.length)]
    return structuredClone(hero)
}

export const summon = (amount: 1 | 10) => {
    const balances = usePlayerStore.getState().balances;

    if(balances.summons < amount) return []

    usePlayerStore.getState().setBalances({
        ...balances,
        summons: balances.summons - amount
    })

    const result = []
    for (let i = 0; i < amount; i++) {
        const r = summonOnce()
        r.id = v4();
        result.push(r)
    }

    result.sort((a, b) => a.power - b.power)

    usePlayerCharactersStore
    .getState()
    .setCharacters(
        usePlayerCharactersStore
        .getState()
        .characters.concat(result)
    )

    return result
} 