import { Character } from "@/shared/types/character";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "../store/PlayerCharactersStore";
import { getCharacterEquipment } from "@/entities/character/lib/allCharacters";

export const RESOURES_FOR_LEVEL: { balances: PlayerBalances }[] = [
    {balances: {gold: 100, gems: 10, summons: 0}},   // 1 → 2
    {balances: {gold: 200, gems: 20, summons: 0}},   // 2 → 3
    {balances: {gold: 300, gems: 30, summons: 0}},   // 3 → 4
    {balances: {gold: 400, gems: 40, summons: 0}},   // 4 → 5
    {balances: {gold: 500, gems: 50, summons: 0}},   // 5 → 6
    {balances: {gold: 600, gems: 60, summons: 0}},   // 6 → 7
    {balances: {gold: 700, gems: 70, summons: 0}},   // 7 → 8
    {balances: {gold: 800, gems: 80, summons: 0}},   // 8 → 9
    {balances: {gold: 900, gems: 90, summons: 0}},   // 9 → 10
    {balances: {gold: 1000, gems: 100, summons: 0}}, // 10 → 11
    {balances: {gold: 1100, gems: 110, summons: 0}}, // 11 → 12
    {balances: {gold: 1200, gems: 120, summons: 0}}, // 12 → 13
    {balances: {gold: 1300, gems: 130, summons: 0}}, // 13 → 14
    {balances: {gold: 1400, gems: 140, summons: 0}}, // 14 → 15
    {balances: {gold: 1500, gems: 150, summons: 0}}, // 15 → 16
    {balances: {gold: 1600, gems: 160, summons: 0}}, // 16 → 17
    {balances: {gold: 1700, gems: 170, summons: 0}}, // 17 → 18
    {balances: {gold: 1800, gems: 180, summons: 0}}, // 18 → 19
    {balances: {gold: 1900, gems: 190, summons: 0}}, // 19 → 20
    {balances: {gold: 2000, gems: 200, summons: 0}}, // 20 → 21
    {balances: {gold: 2100, gems: 210, summons: 0}}, // 21 → 22
    {balances: {gold: 2200, gems: 220, summons: 0}}, // 22 → 23
    {balances: {gold: 2300, gems: 230, summons: 0}}, // 23 → 24
    {balances: {gold: 2400, gems: 240, summons: 0}}, // 24 → 25
    {balances: {gold: 2500, gems: 250, summons: 0}}, // 25 → 26
    {balances: {gold: 2600, gems: 260, summons: 0}}, // 26 → 27
    {balances: {gold: 2700, gems: 270, summons: 0}}, // 27 → 28
    {balances: {gold: 2800, gems: 280, summons: 0}}, // 28 → 29
    {balances: {gold: 2900, gems: 290, summons: 0}}, // 29 → 30
    {balances: {gold: 3000, gems: 300, summons: 0}}, // 30 → 31
    {balances: {gold: 3100, gems: 310, summons: 0}}, // 31 → 32
];


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
    {balances: {gold: 1000, gems: 100, summons: 0}},  // Level 20 → 21
    {balances: {gold: 1050, gems: 105, summons: 0}},  // Level 21 → 22
    {balances: {gold: 1100, gems: 110, summons: 0}},  // Level 22 → 23
    {balances: {gold: 1150, gems: 115, summons: 0}},  // Level 23 → 24
    {balances: {gold: 1200, gems: 120, summons: 0}},  // Level 24 → 25
    {balances: {gold: 1250, gems: 125, summons: 0}},  // Level 25 → 26
    {balances: {gold: 1300, gems: 130, summons: 0}},  // Level 26 → 27
    {balances: {gold: 1350, gems: 135, summons: 0}},  // Level 27 → 28
    {balances: {gold: 1400, gems: 140, summons: 0}},  // Level 28 → 29
    {balances: {gold: 1450, gems: 145, summons: 0}},  // Level 29 → 30
    {balances: {gold: 1500, gems: 150, summons: 0}},  // Level 30 → 31
    {balances: {gold: 1550, gems: 155, summons: 0}},  // Level 31 → 32
    {balances: {gold: 1600, gems: 160, summons: 0}},  // Level 32 → 33
    {balances: {gold: 1650, gems: 165, summons: 0}},  // Level 33 → 34
    {balances: {gold: 1700, gems: 170, summons: 0}},  // Level 34 → 35
    {balances: {gold: 1750, gems: 175, summons: 0}},  // Level 35 → 36
    {balances: {gold: 1800, gems: 180, summons: 0}},  // Level 36 → 37
    {balances: {gold: 1850, gems: 185, summons: 0}},  // Level 37 → 38
    {balances: {gold: 1900, gems: 190, summons: 0}},  // Level 38 → 39
    {balances: {gold: 1950, gems: 195, summons: 0}},  // Level 39 → 40
    {balances: {gold: 2000, gems: 200, summons: 0}},  // Level 40 → 41
    {balances: {gold: 2050, gems: 205, summons: 0}},  // Level 41 → 42
    {balances: {gold: 2100, gems: 210, summons: 0}},  // Level 42 → 43
    {balances: {gold: 2150, gems: 215, summons: 0}},  // Level 43 → 44
    {balances: {gold: 2200, gems: 220, summons: 0}},  // Level 44 → 45
    {balances: {gold: 2250, gems: 225, summons: 0}},  // Level 45 → 46
    {balances: {gold: 2300, gems: 230, summons: 0}},  // Level 46 → 47
    {balances: {gold: 2350, gems: 235, summons: 0}},  // Level 47 → 48
    {balances: {gold: 2400, gems: 240, summons: 0}},  // Level 48 → 49
    {balances: {gold: 2450, gems: 245, summons: 0}},  // Level 49 → 50
    {balances: {gold: 2500, gems: 250, summons: 0}},  // Level 50 → 51
    {balances: {gold: 2550, gems: 255, summons: 0}},  // Level 51 → 52
    {balances: {gold: 2600, gems: 260, summons: 0}},  // Level 52 → 53
    {balances: {gold: 2650, gems: 265, summons: 0}},  // Level 53 → 54
    {balances: {gold: 2700, gems: 270, summons: 0}},  // Level 54 → 55
    {balances: {gold: 2750, gems: 275, summons: 0}},  // Level 55 → 56
    {balances: {gold: 2800, gems: 280, summons: 0}},  // Level 56 → 57
    {balances: {gold: 2850, gems: 285, summons: 0}},  // Level 57 → 58
    {balances: {gold: 2900, gems: 290, summons: 0}},  // Level 58 → 59
    {balances: {gold: 2950, gems: 295, summons: 0}},  // Level 59 → 60
    {balances: {gold: 3000, gems: 300, summons: 0}},  // Level 60 → 61
    {balances: {gold: 3050, gems: 305, summons: 0}},  // Level 61 → 62
    {balances: {gold: 3100, gems: 310, summons: 0}},  // Level 62 → 63
    {balances: {gold: 3150, gems: 315, summons: 0}},  // Level 63 → 64
    {balances: {gold: 3200, gems: 320, summons: 0}},  // Level 64 → 65
    {balances: {gold: 3250, gems: 325, summons: 0}},  // Level 65 → 66
    {balances: {gold: 3300, gems: 330, summons: 0}},  // Level 66 → 67
    {balances: {gold: 3350, gems: 335, summons: 0}},  // Level 67 → 68
    {balances: {gold: 3400, gems: 340, summons: 0}},  // Level 68 → 69
    {balances: {gold: 3450, gems: 345, summons: 0}},  // Level 69 → 70
    {balances: {gold: 3500, gems: 350, summons: 0}},  // Level 70 → 71
    {balances: {gold: 3550, gems: 355, summons: 0}},  // Level 71 → 72
    {balances: {gold: 3600, gems: 360, summons: 0}},  // Level 72 → 73
    {balances: {gold: 3650, gems: 365, summons: 0}},  // Level 73 → 74
    {balances: {gold: 3700, gems: 370, summons: 0}},  // Level 74 → 75
    {balances: {gold: 3750, gems: 375, summons: 0}},  // Level 75 → 76
    {balances: {gold: 3800, gems: 380, summons: 0}},  // Level 76 → 77
    {balances: {gold: 3850, gems: 385, summons: 0}},  // Level 77 → 78
    {balances: {gold: 3900, gems: 390, summons: 0}},  // Level 78 → 79
    {balances: {gold: 3950, gems: 395, summons: 0}},  // Level 79 → 80
    {balances: {gold: 4000, gems: 400, summons: 0}},  // Level 80 → 81
    {balances: {gold: 4050, gems: 405, summons: 0}},  // Level 81 → 82
    {balances: {gold: 4100, gems: 410, summons: 0}},  // Level 82 → 83
    {balances: {gold: 4150, gems: 415, summons: 0}},  // Level 83 → 84
    {balances: {gold: 4200, gems: 420, summons: 0}},  // Level 84 → 85
    {balances: {gold: 4250, gems: 425, summons: 0}},  // Level 85 → 86
    {balances: {gold: 4300, gems: 430, summons: 0}},  // Level 86 → 87
    {balances: {gold: 4350, gems: 435, summons: 0}},  // Level 87 → 88
    {balances: {gold: 4400, gems: 440, summons: 0}},  // Level 88 → 89
    {balances: {gold: 4450, gems: 445, summons: 0}},  // Level 89 → 90
    {balances: {gold: 4500, gems: 450, summons: 0}},  // Level 90 → 91
    {balances: {gold: 4550, gems: 455, summons: 0}},  // Level 91 → 92
    {balances: {gold: 4600, gems: 460, summons: 0}},  // Level 92 → 93
    {balances: {gold: 4650, gems: 465, summons: 0}},  // Level 93 → 94
    {balances: {gold: 4700, gems: 470, summons: 0}},  // Level 94 → 95
    {balances: {gold: 4750, gems: 475, summons: 0}},  // Level 95 → 96
    {balances: {gold: 4800, gems: 480, summons: 0}},  // Level 96 → 97
    {balances: {gold: 4850, gems: 485, summons: 0}},  // Level 97 → 98
    {balances: {gold: 4900, gems: 490, summons: 0}},  // Level 98 → 99
    {balances: {gold: 4950, gems: 495, summons: 0}},  // Level 99 → 100

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
        baseStats.speed * 0.2;

    // 2. Role modifiers
    const roleModifiers: Record<Character.Role, number> = {
        [Character.Role.TANK]: 1.1,
        [Character.Role.DPS]: 1.15,
        [Character.Role.SUPPORT]: 1.05
    };

    baseScore *= roleModifiers[role];

    // 3. Advanced stats multiplier
    let advancedMultiplier = 1;

    advancedMultiplier +=
        advancedStats.critChance * 0.3 +
        advancedStats.critDamage * 0.2 +
        advancedStats.dodge * 0.2 +
        advancedStats.lifesteal * 0.2 +
        advancedStats.accuracy * 0.2 +
        advancedStats.energyRegen * 0.05;

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
            if(statValue < 1) {
                equipment.stats[statKey as keyof typeof equipment.stats] = Math.max(increaseWithFloor(statValue * 100, 1.03) / 100, statValue + 0.01);
            } else {
                equipment.stats[statKey as keyof typeof equipment.stats] = Math.max(increaseWithFloor(statValue, 1.03), statValue + 1); // 3% increase per level
            }
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
        [Character.Rarity.COMMON]: 40,
        [Character.Rarity.UNCOMMON]: 50,
        [Character.Rarity.RARE]: 60,
        [Character.Rarity.EPIC]: 70,
        [Character.Rarity.LEGENDARY]: 80
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
        copy.advancedStats.critChance += equipmentPiece.stats.critChance || 0;
        copy.advancedStats.critDamage += equipmentPiece.stats.critDamage || 0;
        copy.advancedStats.dodge += equipmentPiece.stats.dodge || 0;
        copy.advancedStats.lifesteal += equipmentPiece.stats.lifesteal || 0;
        copy.advancedStats.accuracy += equipmentPiece.stats.accuracy || 0;
    });

    copy.power = calculateCharacterPower(copy);

    return copy;
}
