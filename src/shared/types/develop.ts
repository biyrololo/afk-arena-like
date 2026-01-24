import { Character } from "@/shared/types/character";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "../store/PlayerCharactersStore";
import { getCharacterEquipment } from "@/entities/character/lib/allCharacters";

export const RESOURES_FOR_LEVEL: {balances: PlayerBalances}[] = [
    {balances: {gold: 100, gems: 10, summons: 0}},
    {balances: {gold: 200, gems: 20, summons: 0}},
    {balances: {gold: 300, gems: 30, summons: 0}},
    {balances: {gold: 400, gems: 40, summons: 0}},
    {balances: {gold: 500, gems: 50, summons: 0}},
]

export const EQUIPMENT_UPGRADE_COSTS: {balances: PlayerBalances}[] = [
    {balances: {gold: 50, gems: 5, summons: 0}},    // Level 1 → 2
    {balances: {gold: 100, gems: 10, summons: 0}},  // Level 2 → 3
    {balances: {gold: 150, gems: 15, summons: 0}},  // Level 3 → 4
    {balances: {gold: 200, gems: 20, summons: 0}},  // Level 4 → 5
    {balances: {gold: 250, gems: 25, summons: 0}},  // Level 5 → 6
    {balances: {gold: 300, gems: 30, summons: 0}},  // Level 6 → 7
    {balances: {gold: 350, gems: 35, summons: 0}},  // Level 7 → 8
    {balances: {gold: 400, gems: 40, summons: 0}},  // Level 8 → 9
    {balances: {gold: 450, gems: 45, summons: 0}},  // Level 9 → 10
    {balances: {gold: 500, gems: 50, summons: 0}},  // Level 10 → 11
    {balances: {gold: 550, gems: 55, summons: 0}},  // Level 11 → 12
    {balances: {gold: 600, gems: 60, summons: 0}},  // Level 12 → 13
    {balances: {gold: 650, gems: 65, summons: 0}},  // Level 13 → 14
    {balances: {gold: 700, gems: 70, summons: 0}},  // Level 14 → 15
    {balances: {gold: 750, gems: 75, summons: 0}},  // Level 15 → 16
    {balances: {gold: 800, gems: 80, summons: 0}},  // Level 16 → 17
    {balances: {gold: 850, gems: 85, summons: 0}},  // Level 17 → 18
    {balances: {gold: 900, gems: 90, summons: 0}},  // Level 18 → 19
    {balances: {gold: 950, gems: 95, summons: 0}},  // Level 19 → 20
]

const increaseWithFloor = (value: number, x: number) => Math.floor(value * x);

export function calculateCharacterPower(
    character: Character.Character
): number {
    const { baseStats, advancedStats, progression, role } = character;

    // 1. Base stats score
    let baseScore =
        baseStats.maxHp * 0.2 +
        baseStats.attack * 1.5 +
        baseStats.defense * 1.2 +
        baseStats.speed * 1.0;

    // 2. Role modifiers
    const roleModifiers: Record<Character.Role, number> = {
        [Character.Role.TANK]: 1.1,
        [Character.Role.DPS]: 1.15,
        [Character.Role.SUPPORT]: 1.05
    };

    baseScore *= roleModifiers[role];

    // 3. Advanced stats multiplier
    let advancedMultiplier = 1;

    if (advancedStats) {
        advancedMultiplier +=
            advancedStats.critChance * 0.003 +
            advancedStats.critDamage * 0.002 +
            advancedStats.dodge * 0.002 +
            advancedStats.lifesteal * 0.002 +
            advancedStats.accuracy * 0.001;
    }

    // 4. Progression multiplier
    const progressionMultiplier =
        1 +
        progression.level * 0.02 +
        progression.stars * 0.1 +
        progression.ascension * 0.15;

    const power =
        baseScore *
        advancedMultiplier *
        progressionMultiplier;

    return Math.floor(power);
}

export function calculateEquipmentPower(equipment: Character.Equipment): number {
    const { stats, rarity, level } = equipment;
    
    // 1. Base stats score (similar to character calculation)
    let baseScore = 0;
    
    if (stats.maxHp) baseScore += stats.maxHp * 0.2;
    if (stats.attack) baseScore += stats.attack * 1.5;
    if (stats.defense) baseScore += stats.defense * 1.2;
    if (stats.speed) baseScore += stats.speed * 1.0;
    
    // 2. Advanced stats contribution
    let advancedScore = 0;
    
    if (stats.critChance) advancedScore += stats.critChance * 30;     // 0.01 = 1% crit chance = 30 power
    if (stats.critDamage) advancedScore += stats.critDamage * 20;     // 0.01 = 1% crit damage = 20 power
    if (stats.dodge) advancedScore += stats.dodge * 20;              // 0.01 = 1% dodge = 20 power
    if (stats.lifesteal) advancedScore += stats.lifesteal * 20;       // 0.01 = 1% lifesteal = 20 power
    if (stats.accuracy) advancedScore += stats.accuracy * 10;         // 0.01 = 1% accuracy = 10 power
    
    // 3. Rarity multipliers (similar progression concept)
    const rarityMultipliers: Record<Character.Rarity, number> = {
        [Character.Rarity.COMMON]: 1.0,
        [Character.Rarity.UNCOMMON]: 1.2,
        [Character.Rarity.RARE]: 1.5,
        [Character.Rarity.EPIC]: 2.0,
        [Character.Rarity.LEGENDARY]: 3.0
    };
    
    // 4. Level multiplier (equipment level scaling)
    const levelMultiplier = 1 + (level * 0.05); // 5% increase per level
    
    const power = (baseScore + advancedScore) * 
                  rarityMultipliers[rarity] * 
                  levelMultiplier;
    
    return Math.floor(power);
}

export const levelUp = (id: string) => {
    const characterQuery = usePlayerCharactersStore.getState().characters.find(c => c.id === id);
    if(!characterQuery) return;
    const character = structuredClone(characterQuery);
    const playerResources = usePlayerStore.getState().balances;
    const resources = RESOURES_FOR_LEVEL[character.progression.level + 1];

    if(!isEnoughResources(resources, playerResources)) return;

    playerResources.gold -= resources.balances.gold;
    playerResources.gems -= resources.balances.gems;
    playerResources.summons -= resources.balances.summons;

    usePlayerStore.getState().setBalances(playerResources);

    character.progression.level++;

    character.baseStats.attack = increaseWithFloor(character.baseStats.attack, 1.05);
    character.baseStats.defense = increaseWithFloor(character.baseStats.defense, 1.05);
    character.baseStats.maxHp = increaseWithFloor(character.baseStats.maxHp, 1.05);

    if(character.progression.level % 5 === 0) {
        if(character.advancedStats?.dodge) {
            character.advancedStats.dodge+=0.05;
        }
        if(character.advancedStats?.critChance) {
            character.advancedStats.critChance+=0.02;
        }
        if(character.advancedStats?.critDamage) {
            character.advancedStats.critDamage+=0.05;
        }
    }

    usePlayerCharactersStore
    .getState()
    .setCharacters(
        usePlayerCharactersStore
        .getState()
        .characters.map(c => c.id === id ? character : c)
    )
}

export const calculateLevelUpStats = (character: Character.Character): Readonly<Character.Character> => {
    const lvl = character.progression.level;
    const nextLvl = lvl + 1;

    const copy = structuredClone(character);
    copy.progression.level = nextLvl;

    copy.baseStats.attack = increaseWithFloor(copy.baseStats.attack, 1.05);
    copy.baseStats.defense = increaseWithFloor(copy.baseStats.defense, 1.05);
    copy.baseStats.maxHp = increaseWithFloor(copy.baseStats.maxHp, 1.05);

    if(nextLvl % 5 === 0) {
        if(copy.advancedStats?.dodge) {
            copy.advancedStats.dodge+=0.05;
        }
        if(copy.advancedStats?.critChance) {
            copy.advancedStats.critChance+=0.02;
        }
        if(copy.advancedStats?.critChance) {
            copy.advancedStats.critChance+=0.05;
        }
    }

    copy.power = calculateCharacterPower(copy);

    return copy;
}

export const isEnoughResources = (need: typeof RESOURES_FOR_LEVEL[number] | typeof EQUIPMENT_UPGRADE_COSTS[number], resources: PlayerBalances) => {
    return resources.gems >= need.balances.gems && resources.gold >= need.balances.gold && resources.summons >= need.balances.summons;
}

export const upgradeEquipment = (equipmentId: string) => {
    const equipmentQuery = usePlayerCharactersStore.getState().equipment.find(e => e.id === equipmentId);
    if(!equipmentQuery) return;
    
    const equipment = structuredClone(equipmentQuery);
    const playerResources = usePlayerStore.getState().balances;
    
    // Check if equipment can be upgraded (max level might be 10 or based on rarity)
    const maxLevel = getMaxEquipmentLevel(equipment.rarity);
    if(equipment.level >= maxLevel) return;
    
    const upgradeCost = EQUIPMENT_UPGRADE_COSTS[equipment.level];
    if(!upgradeCost || !isEnoughResources(upgradeCost, playerResources)) return;
    
    // Deduct resources
    playerResources.gold -= upgradeCost.balances.gold;
    playerResources.gems -= upgradeCost.balances.gems;
    playerResources.summons -= upgradeCost.balances.summons;
    usePlayerStore.getState().setBalances({...playerResources});
    
    // Upgrade equipment
    equipment.level++;
    
    // Increase stats (similar to character level up but for equipment)
    Object.keys(equipment.stats).forEach(statKey => {
        const statValue = equipment.stats[statKey as keyof typeof equipment.stats];
        if(typeof statValue === 'number') {
            equipment.stats[statKey as keyof typeof equipment.stats] = increaseWithFloor(statValue, 1.03); // 3% increase per level
        }
    });
    
    // Update equipment in store
    usePlayerCharactersStore.getState().setEquipment(
        usePlayerCharactersStore.getState().equipment.map(e => 
            e.id === equipmentId ? equipment : e
        )
    );
}

export const calculateEquipmentUpgradeStats = (equipment: Character.Equipment): Readonly<Character.Equipment> => {
    const nextLevel = equipment.level + 1;
    const maxLevel = getMaxEquipmentLevel(equipment.rarity);
    
    if(nextLevel > maxLevel) return equipment;
    
    const copy = structuredClone(equipment);
    copy.level = nextLevel;
    
    // Increase stats
    Object.keys(copy.stats).forEach(statKey => {
        const statValue = copy.stats[statKey as keyof typeof copy.stats];
        if(typeof statValue === 'number') {
            copy.stats[statKey as keyof typeof copy.stats] = increaseWithFloor(statValue, 1.03);
        }
    });
    
    return copy;
}

export const getMaxEquipmentLevel = (rarity: Character.Rarity): number => {
    const maxLevels: Record<Character.Rarity, number> = {
        [Character.Rarity.COMMON]: 5,
        [Character.Rarity.UNCOMMON]: 7,
        [Character.Rarity.RARE]: 10,
        [Character.Rarity.EPIC]: 15,
        [Character.Rarity.LEGENDARY]: 20
    };
    return maxLevels[rarity];
}

export const calculateStatsWithEquipment = (character: Character.Character): Character.Character => {
    const copy = structuredClone(character);

    const equipment = getCharacterEquipment(character.id);

    Object.values(equipment).forEach(equipmentPiece => {
        copy.baseStats.attack += equipmentPiece.stats.attack || 0;
        copy.baseStats.defense += equipmentPiece.stats.defense || 0;
        copy.baseStats.maxHp += equipmentPiece.stats.maxHp || 0;
        copy.baseStats.speed += equipmentPiece.stats.speed || 0;

        if(!copy.advancedStats) {
            copy.advancedStats = {
                critChance: 0,
                critDamage: 0,
                dodge: 0,
                lifesteal: 0,
                accuracy: 0
            };
        }

        copy.advancedStats.critChance += equipmentPiece.stats.critChance || 0;
        copy.advancedStats.critDamage += equipmentPiece.stats.critDamage || 0;
        copy.advancedStats.dodge += equipmentPiece.stats.dodge || 0;
        copy.advancedStats.lifesteal += equipmentPiece.stats.lifesteal || 0;
        copy.advancedStats.accuracy += equipmentPiece.stats.accuracy || 0;
    });

    copy.power = calculateCharacterPower(copy);

    return copy;
}
