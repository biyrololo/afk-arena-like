import { useDailyRewardsStore } from "@/entities/daily-reward/model/daily-reward.store";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { usePlayerStore } from "@/entities/player/model/player.store"
import { usePlotStore } from "@/entities/plot/lib/plot.store";
import { useQuestsStore } from "@/entities/quest/model/quest.store";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore"
import type { Serializable } from "ysdk";

import * as CHARACTERS from "@/entities/character/lib/allCharacters";

import type { Character } from "@/shared/types/character";
import { findEquipmentBaseByKey } from "@/entities/character/lib/equipmentList";

const findCharacterByKey = (key: string) => {
    return Object.values(CHARACTERS).filter(v => 'power' in v).find(character => character.key === key);
}
interface CompactCharacterRecord {
    i: string; // id
    k: string; // key
    l: number; // level
    v: number; // stars
    b: number; // ascension
    m: number; // maxHp
    a: number; // attack
    d: number; // defense
    s: number; // speed
    c: number; // critChance
    w: number; // critDamage
    o: number; // dodge
    y: number; // lifesteal
    r: number; // accuracy
    u: number; // energyRegen
    p: number; // cooldownAttack
}

const characterToCompactCharacter = (character: Character.Character): CompactCharacterRecord => {
    return {
        i: character.id,
        k: character.key,
        l: character.progression.level,
        v: character.progression.stars,
        b: character.progression.ascension,
        m: character.baseStats.maxHp,
        a: character.baseStats.attack,
        d: character.baseStats.defense,
        s: character.baseStats.speed,
        c: character.advancedStats.critChance,
        w: character.advancedStats.critDamage,
        o: character.advancedStats.dodge,
        y: character.advancedStats.lifesteal,
        r: character.advancedStats.accuracy,
        u: character.advancedStats.energyRegen,
        p: character.advancedStats.cooldownAttack,
    }
}

const compactCharacterToCharacter = (character: CompactCharacterRecord | Character.Character): Character.Character => {
    if ('progression' in character) return character;

    const base = findCharacterByKey(character.k);

    if (!base) {
        console.error('Character base not found', character.k);
        throw new Error('Character base not found');
    }

    return {
        ...base,
        id: character.i,
        progression: {
            ...base.progression,
            level: character.l,
            stars: character.v,
            ascension: character.b,
        },
        baseStats: {
            ...base.baseStats,
            maxHp: character.m,
            attack: character.a,
            defense: character.d,
            speed: character.s,
        },
        advancedStats: {
            ...base.advancedStats,
            critChance: character.c,
            critDamage: character.w,
            dodge: character.o,
            lifesteal: character.y,
            accuracy: character.r,
            energyRegen: character.u,
            cooldownAttack: character.p,
        }
    }
}

interface CompactEquipmentRecord {
    i: string; // id
    k: string; // key
    e?: string; // equippedCharacterId
    l: number; // level
    m?: number; // maxHp
    a?: number; // attack
    d?: number; // defense
    s?: number; // speed
    c?: number; // critChance
    w?: number; // critDamage
    o?: number; // dodge
    y?: number; // lifesteal
    r?: number; // accuracy
    u?: number; // energyRegen
    p?: number; // cooldownAttack
}

const equipmentToCompactEquipment = (equipment: Character.Equipment): CompactEquipmentRecord => {
    return {
        i: equipment.id,
        k: equipment.key,
        e: equipment.equippedCharacterId,
        l: equipment.level,
        m: equipment.stats?.maxHp ?? undefined,
        a: equipment.stats?.attack ?? undefined,
        d: equipment.stats?.defense ?? undefined,
        s: equipment.stats?.speed ?? undefined,
        c: equipment.stats?.critChance ?? undefined,
        w: equipment.stats?.critDamage ?? undefined,
        o: equipment.stats?.dodge ?? undefined,
        y: equipment.stats?.lifesteal ?? undefined,
        r: equipment.stats?.accuracy ?? undefined,
        u: equipment.stats?.energyRegen ?? undefined,
        p: equipment.stats?.cooldownAttack ?? undefined,
    }
}

const compactEquipmentToEquipment = (equipment: CompactEquipmentRecord | Character.Equipment): Character.Equipment => {
    if ('level' in equipment) return equipment;

    const base = findEquipmentBaseByKey(equipment.k);
    if (!base) {
        console.error('Equipment base not found', equipment.k);
        throw new Error('Equipment base not found');
    }

    return {
        ...base,
        id: equipment.i,
        equippedCharacterId: equipment.e,
        level: equipment.l,
        stats: {
            ...base.stats,
            maxHp: equipment.m,
            attack: equipment.a,
            defense: equipment.d,
            speed: equipment.s,
            critChance: equipment.c,
            critDamage: equipment.w,
            dodge: equipment.o,
            lifesteal: equipment.y,
            accuracy: equipment.r,
            energyRegen: equipment.u,
            cooldownAttack: equipment.p,
        }
    }
}

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

    const {
        currentDay,
        lastClaimedAt
    } = useDailyRewardsStore.getState()

    const {
        killedEnemies,
        maxSurvivialDepthPerChapter,
        visitedPages,
        boughtProducts
    } = usePlayerStatsStore.getState();

    const compactState = {
        usedPromocodes,
        completedScenes,
        completedQuests,
        currentDay,
        lastClaimedAt,
        killedEnemies,
        maxSurvivialDepthPerChapter,
        visitedPages,
        boughtProducts,
        equipment: equipment.map(equipmentToCompactEquipment),
        characters: characters.map(characterToCompactCharacter),
        version: 2
    }

    return compactState as any;
}

export const loadData = (data: Record<string, unknown>) => {
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

    const {
        setLastClaimedAt,
        setCurrentDay
    } = useDailyRewardsStore.getState()

    const {
        setKilledEnemies,
        setMaxSurvivialDepthPerChapter,
        setVisitedPages,
        setBoughtProducts,
    } = usePlayerStatsStore.getState()

    if (data.version === 2) {
        if ('characters' in data && Array.isArray(data.characters)) {
            setCharacters(data.characters.map(compactCharacterToCharacter))
        }
        if ('equipment' in data && Array.isArray(data.equipment)) {
            setEquipment(data.equipment.map(compactEquipmentToEquipment))
        }
        if ('usedPromocodes' in data && Array.isArray(data.usedPromocodes)) {
            setUsedPromocodes(data.usedPromocodes)
        }
        if ('completedScenes' in data && Array.isArray(data.completedScenes)) {
            setCompletedScenes(data.completedScenes)
        }
        if ('completedQuests' in data && Array.isArray(data.completedQuests)) {
            setCompletedQuests(data.completedQuests)
        }

        if (data.currentDay && typeof data.currentDay === 'number') {
            setCurrentDay(data.currentDay)
        }

        if (data.lastClaimedAt && typeof data.lastClaimedAt === 'string') {
            setLastClaimedAt(data.lastClaimedAt)
        } else {
            setLastClaimedAt(new Date(Date.now() - 86400000).toISOString());
        }

        if (data.killedEnemies) {
            setKilledEnemies(data.killedEnemies as Record<string, number>)
        }
        if (data.maxSurvivialDepthPerChapter) {
            setMaxSurvivialDepthPerChapter(data.maxSurvivialDepthPerChapter as Record<string, number>)
        }
        if (data.visitedPages) {
            setVisitedPages(data.visitedPages as Record<string, boolean>)
        }

        if (data.boughtProducts && Array.isArray(data.boughtProducts)) {
            setBoughtProducts(data.boughtProducts as string[])
        }

    } else {
        if (data.characters && typeof data.characters === 'string') {
            setCharacters(JSON.parse(data.characters))
        }
        if (data.equipment && typeof data.equipment === 'string') {
            setEquipment(JSON.parse(data.equipment))
        }
        if (data.usedPromocodes && typeof data.usedPromocodes === 'string') {
            setUsedPromocodes(JSON.parse(data.usedPromocodes))
        }
        if (data.completedScenes && typeof data.completedScenes === 'string') {
            setCompletedScenes(JSON.parse(data.completedScenes))
        }
        if (data.completedQuests && typeof data.completedQuests === 'string') {
            setCompletedQuests(JSON.parse(data.completedQuests))
        }

        if (data.currentDay && typeof data.currentDay === 'number') {
            setCurrentDay(data.currentDay)
        }

        if (data.lastClaimedAt && typeof data.lastClaimedAt === 'string') {
            setLastClaimedAt(data.lastClaimedAt)
        } else {
            setLastClaimedAt(new Date(Date.now() - 86400000).toISOString());
        }

        if (data.killedEnemies && typeof data.killedEnemies === 'string') {
            setKilledEnemies(JSON.parse(data.killedEnemies))
        }
        if (data.maxSurvivialDepthPerChapter && typeof data.maxSurvivialDepthPerChapter === 'string') {
            setMaxSurvivialDepthPerChapter(JSON.parse(data.maxSurvivialDepthPerChapter))
        }
        if (data.visitedPages && typeof data.visitedPages === 'string') {
            setVisitedPages(JSON.parse(data.visitedPages))
        }

        if (data.boughtProducts && typeof data.boughtProducts === 'string') {
            setBoughtProducts(JSON.parse(data.boughtProducts))
        }
    }
}

export const dumpStats = (): Record<string, number> => {
    const {
        stageNumber,
        chapterNumber,
        balances,
        towerFloor
    } = usePlayerStore.getState()

    return {
        stageNumber,
        chapterNumber,
        towerFloor,
        gems: balances.gems,
        gold: balances.gold,
        summons: balances.summons,
        summonsSpecial: balances.summonsSpecial
    }
}

export const loadStats = (data: Record<string, number | undefined>) => {
    const {
        setStageNumber,
        setChapterNumber,
        setBalances,
        setTowerFloor,
    } = usePlayerStore.getState()

    if (typeof data.stageNumber === 'number') {
        setStageNumber(data.stageNumber)
    }

    if (typeof data.chapterNumber === 'number') {
        setChapterNumber(data.chapterNumber)
    }

    const balances: PlayerBalances = {
        gems: 0,
        gold: 0,
        summons: 0,
        summonsSpecial: 0
    }

    if (typeof data.gems === 'number') {
        balances.gems = data.gems
    }

    if (typeof data.gold === 'number') {
        balances.gold = data.gold
    }

    if (typeof data.summons === 'number') {
        balances.summons = data.summons
    }

    if (typeof data.summonsSpecial === 'number') {
        balances.summonsSpecial = data.summonsSpecial
    }

    if (typeof data.towerFloor === 'number') {
        setTowerFloor(data.towerFloor)
    }
    setBalances(balances)
}
