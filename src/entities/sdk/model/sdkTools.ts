import type { PlayerBalances } from "@/entities/player/model/player.model";
import { usePlayerStore } from "@/entities/player/model/player.store"
import { usePlotStore } from "@/entities/plot/lib/plot.store";
import { useQuestsStore } from "@/entities/quest/model/quest.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore"
import type { Serializable } from "ysdk";

export const dumpData = (): Record<string, Serializable> => {
    const {
        characters,
        equipment
    } = usePlayerCharactersStore.getState()

    const {
        usedPromocodes
    } = usePlayerStore.getState();

    const {
        completedScenes
    } = usePlotStore.getState();

    const {
        completedQuests
    } = useQuestsStore.getState()

    return {
        characters: JSON.stringify(characters),
        equipment: JSON.stringify(equipment),
        usedPromocodes: JSON.stringify(usedPromocodes),
        completedScenes: JSON.stringify(completedScenes),
        completedQuests: JSON.stringify(completedQuests)
    }
}

export const loadData = (data: Record<string, Serializable | undefined>) => {
    const {
        setCharacters,
        setEquipment,
    } = usePlayerCharactersStore.getState()

    const {
        setUsedPromocodes,
    } = usePlayerStore.getState()

    const {
        setCompletedScenes,
    } = usePlotStore.getState()

    const {
        setCompletedQuests
    } = useQuestsStore.getState()

    if(data.characters && typeof data.characters === 'string') {
        setCharacters(JSON.parse(data.characters))
    }
    if(data.equipment && typeof data.equipment === 'string') {
        setEquipment(JSON.parse(data.equipment))
    }
    if(data.usedPromocodes && typeof data.usedPromocodes === 'string') {
        setUsedPromocodes(JSON.parse(data.usedPromocodes))
    }
    if(data.completedScenes && typeof data.completedScenes === 'string') {
        setCompletedScenes(JSON.parse(data.completedScenes))
    }
    if(data.completedQuests && typeof data.completedQuests === 'string') {
        setCompletedQuests(JSON.parse(data.completedQuests))
    }
}

export const dumpStats = (): Record<string, number> => {
    const {
        stageNumber,
        chapterNumber,
        balances
    } = usePlayerStore.getState()

    return {
        stageNumber,
        chapterNumber,
        gems: balances.gems,
        gold: balances.gold,
        summons: balances.summons
    }
}

export const loadStats = (data: Record<string, number | undefined>) => {
    const {
        setStageNumber,
        setChapterNumber,
        setBalances
    } = usePlayerStore.getState()

    if(data.stageNumber) {
        setStageNumber(data.stageNumber)
    }

    if(data.chapterNumber) {
        setChapterNumber(data.chapterNumber)
    }

    const balances: PlayerBalances = {
        gems: 0,
        gold: 0,
        summons: 0
    }

    if(data.gems) {
        balances.gems = data.gems
    }

    if(data.gold) {
        balances.gold = data.gold
    }

    if(data.summons) {
        balances.summons = data.summons
    }

    setBalances(balances)
}
