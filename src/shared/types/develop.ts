import { Character } from "@/shared/types/character";
import type { PlayerBalances } from "@/entities/player/model/player.model";
import { usePlayerStore } from "@/entities/player/model/player.store";
import usePlayerCharactersStore from "../store/PlayerCharactersStore";
import { getCharacterEquipment } from "@/entities/character/lib/allCharacters";
import { v4 } from "uuid";

export const fixEquipment = () => {
  const equipmentList = structuredClone(usePlayerCharactersStore.getState().equipment);
  for (let i = 0; i < equipmentList.length; i++) {
    for (let j = i + 1; j < equipmentList.length; j++) {
      if (equipmentList[i].id === equipmentList[j].id) {
        equipmentList[j].id = v4();
        if (equipmentList[i].equippedCharacterId === equipmentList[j].equippedCharacterId && equipmentList[i].equippedCharacterId !== undefined) {
          equipmentList[j].equippedCharacterId = undefined;
        }
      }
    }
  }

  usePlayerCharactersStore.setState({ equipment: equipmentList });
};

export const RESOURES_FOR_LEVEL: { balances: PlayerBalances }[] = [
  // --- УРОВНИ 1-10 (Вступление) ---
  { balances: { gold: 50, gems: 0, summons: 0, summonsSpecial: 0 } },   // 1 → 2
  { balances: { gold: 70, gems: 0, summons: 0, summonsSpecial: 0 } },
  { balances: { gold: 100, gems: 0, summons: 0, summonsSpecial: 0 } },   // 1 → 2
  { balances: { gold: 250, gems: 0, summons: 0, summonsSpecial: 0 } },   // 2 → 3
  { balances: { gold: 500, gems: 0, summons: 0, summonsSpecial: 0 } },   // 3 → 4
  { balances: { gold: 1000, gems: 0, summons: 0, summonsSpecial: 0 } },  // 4 → 5 (Первый порог гемов)
  { balances: { gold: 1500, gems: 0, summons: 0, summonsSpecial: 0 } },  // 5 → 6
  { balances: { gold: 2200, gems: 0, summons: 0, summonsSpecial: 0 } },  // 6 → 7
  { balances: { gold: 3000, gems: 0, summons: 0, summonsSpecial: 0 } },  // 7 → 8
  { balances: { gold: 4000, gems: 0, summons: 0, summonsSpecial: 0 } },  // 8 → 9
  { balances: { gold: 5500, gems: 100, summons: 0, summonsSpecial: 0 } }, // 9 → 10 (Чекпоинт)

  // --- УРОВНИ 11-30 (Разгон) ---
  ...Array.from({ length: 20 }, (_, i) => {
    const lvl = i + 11;
    const isGemStep = lvl % 10 === 0;
    // Квадратичный рост золота: (lvl^2) * множитель
    const goldAmount = Math.round((Math.pow(lvl, 2.2) * 25) / 100) * 100;
    // Медленный рост гемов: +10-20 за каждые 5 уровней
    const gemAmount = isGemStep ? 100 + (Math.floor(lvl / 10) * 20) : 0;

    return { balances: { gold: goldAmount, gems: gemAmount, summons: 0, summonsSpecial: 0 } };
  }),

  // --- УРОВНИ 31-60 (Мид-гейм) ---
  ...Array.from({ length: 30 }, (_, i) => {
    const lvl = i + 31;
    const isGemStep = lvl % 10 === 0;
    const goldAmount = Math.round((Math.pow(lvl, 2.5) * 15) / 500) * 500;
    const gemAmount = isGemStep ? 150 + (Math.floor(lvl / 10) * 20) : 0;

    return { balances: { gold: goldAmount, gems: gemAmount, summons: 0, summonsSpecial: 0 } };
  }),

  // --- УРОВНИ 61-100 (Лейт-гейм / Энд-гейм) ---
  ...Array.from({ length: 40 }, (_, i) => {
    const lvl = i + 61;
    const isGemStep = lvl % 10 === 0;
    // Резкое удорожание золота
    const goldAmount = Math.round((Math.pow(lvl, 2.8) * 10) / 1000) * 1000;
    // Гемы остаются ценными и не инфлируют слишком сильно
    const gemAmount = isGemStep ? 250 + (Math.floor(lvl / 10) * 50) : 0;

    return { balances: { gold: goldAmount, gems: gemAmount, summons: 0, summonsSpecial: 0 } };
  })
];
export const EQUIPMENT_UPGRADE_COSTS: { balances: PlayerBalances }[] = [
  // --- УРОВНИ 1-10 (Начало: дешево и быстро) ---
  { balances: { gold: 50, gems: 0, summons: 0, summonsSpecial: 0 } },    // 1 → 2
  { balances: { gold: 50, gems: 0, summons: 0, summonsSpecial: 0 } },    // 1 → 2
  { balances: { gold: 50, gems: 0, summons: 0, summonsSpecial: 0 } },    // 1 → 2
  { balances: { gold: 120, gems: 0, summons: 0, summonsSpecial: 0 } },   // 2 → 3
  { balances: { gold: 250, gems: 0, summons: 0, summonsSpecial: 0 } },   // 3 → 4
  { balances: { gold: 500, gems: 0, summons: 0, summonsSpecial: 0 } },  // 4 → 5 (Первый порог)
  { balances: { gold: 700, gems: 0, summons: 0, summonsSpecial: 0 } },   // 5 → 6
  { balances: { gold: 1000, gems: 0, summons: 0, summonsSpecial: 0 } },  // 6 → 7
  { balances: { gold: 1400, gems: 0, summons: 0, summonsSpecial: 0 } },  // 7 → 8
  { balances: { gold: 1900, gems: 0, summons: 0, summonsSpecial: 0 } },  // 8 → 9
  { balances: { gold: 2500, gems: 60, summons: 0, summonsSpecial: 0 } }, // 9 → 10 (Оружие требует заточки)

  // --- УРОВНИ 11-100 (Генерация прогрессии) ---
  ...Array.from({ length: 90 }, (_, i) => {
    const lvl = i + 11;
    const isGemStep = lvl % 10 === 0;

    // Золото: Скейлинг заметный, но мягче, чем у уровней игрока
    // Формула дает ~200k на 100 уровне (в 2-2.5 раза меньше уровня персонажа)
    const goldAmount = Math.round((Math.pow(lvl, 2.15) * 10) / 100) * 100;

    // Гемы: Редкие траты, фиксированный медленный рост
    // На 100 уровне будет просить всего ~150 гемов за шаг
    const gemAmount = isGemStep ? Math.floor(120 + Math.log(lvl / 10) * 10) : 0;

    return {
      balances: {
        gold: goldAmount,
        gems: gemAmount,
        summons: 0,
        summonsSpecial: 0
      }
    };
  })
];

function updateStatsWithAscension(character: Character.Character) {
  const { ascension } = character.progression;

  character.baseStats.attack *= (1 + ascension * 0.2)
  character.baseStats.defense *= (1 + ascension * 0.2)
  character.baseStats.maxHp *= (1 + ascension * 0.2)
  character.baseStats.attack = Math.floor(character.baseStats.attack)
  character.baseStats.defense = Math.floor(character.baseStats.defense)
  character.baseStats.maxHp = Math.floor(character.baseStats.maxHp)

  character.advancedStats.critChance += ascension * 0.02;
  character.advancedStats.critDamage += ascension * 0.05;

  character.advancedStats.dodge += ascension * 0.02;
  character.advancedStats.accuracy += ascension * 0.02;
  character.advancedStats.energyRegen += ascension * 2;
}

const increaseWithFloor = (value: number, x: number) => Math.floor(value * x);

export function calculateCharacterPower(
  character: Character.Character,
): number {
  const { baseStats, advancedStats, progression, role } = character;

  // 1. Base stats score
  let baseScore =
    baseStats.maxHp * 0.3 * (1 + baseStats.defense / 200) +
    baseStats.attack * (2000 / advancedStats.cooldownAttack) * (
      advancedStats.critChance * advancedStats.critDamage + 1
    ) +
    baseStats.speed * 0.1;

  // 2. Role modifiers
  const roleModifiers: Record<Character.Role, number> = {
    [Character.Role.TANK]: 1,
    [Character.Role.WARRIOR]: 1.05,
    [Character.Role.ASSASSIN]: 1.1,
  };

  baseScore *= roleModifiers[role];

  // 3. Advanced stats multiplier
  let advancedMultiplier = 1;

  advancedMultiplier +=
    advancedStats.dodge * 0.5 +
    advancedStats.lifesteal * 0 +
    advancedStats.accuracy * 0.2 +
    advancedStats.energyRegen * 0.005 * (2000 / advancedStats.cooldownAttack);

  // 4. Progression multiplier
  const progressionMultiplier =
    1 +
    progression.level * 0.02 +
    progression.stars * 0.1;

  const power = baseScore * advancedMultiplier * progressionMultiplier;

  return Math.floor(power);
}

export function calculateEquipmentPower(
  equipment: Character.Equipment,
): number {
  const { stats, rarity, level } = equipment;

  // 1. Base stats score (similar to character calculation)
  let baseScore = 0;

  if (stats.maxHp) baseScore += stats.maxHp * 0.5;
  if (stats.attack) baseScore += stats.attack * 0.5;
  if (stats.defense) baseScore += stats.defense * 1.2;
  if (stats.speed) baseScore += stats.speed * 1.0;

  // 2. Advanced stats contribution
  let advancedScore = 0;

  if (stats.critChance) advancedScore += stats.critChance * 100; // 0.01 = 1% crit chance = 30 power
  if (stats.critDamage) advancedScore += stats.critDamage * 100; // 0.01 = 1% crit damage = 20 power
  if (stats.dodge) advancedScore += stats.dodge * 100; // 0.01 = 1% dodge = 20 power
  if (stats.lifesteal) advancedScore += stats.lifesteal * 5; // 0.01 = 1% lifesteal = 20 power
  if (stats.accuracy) advancedScore += stats.accuracy * 100; // 0.01 = 1% accuracy = 10 power

  // 3. Rarity multipliers (similar progression concept)
  const rarityMultipliers: Record<Character.Rarity, number> = {
    [Character.Rarity.COMMON]: 1.0,
    [Character.Rarity.UNCOMMON]: 1.2,
    [Character.Rarity.RARE]: 1.3,
    [Character.Rarity.EPIC]: 1.4,
    [Character.Rarity.LEGENDARY]: 2.0,
  };

  // 4. Level multiplier (equipment level scaling)
  const levelMultiplier = 1 + level * 0.05; // 5% increase per level

  const power =
    (baseScore + advancedScore) * rarityMultipliers[rarity] * levelMultiplier;

  return Math.floor(power);
}

export const levelUp = (id: string) => {
  const characterQuery = usePlayerCharactersStore
    .getState()
    .characters.find((c) => c.id === id);
  if (!characterQuery) return;
  const character = structuredClone(characterQuery);
  const playerResources = usePlayerStore.getState().balances;
  const resources = RESOURES_FOR_LEVEL[character.progression.level + 1];

  if (!isEnoughResources(resources, playerResources)) return;

  playerResources.gold -= resources.balances.gold;
  playerResources.gems -= resources.balances.gems;
  playerResources.summons -= resources.balances.summons;

  usePlayerStore.getState().setBalances(playerResources);

  character.progression.level++;

  character.baseStats.attack = increaseWithFloor(
    character.baseStats.attack,
    1.03,
  );
  character.baseStats.defense = increaseWithFloor(
    character.baseStats.defense,
    1.03,
  );
  character.baseStats.maxHp = increaseWithFloor(
    character.baseStats.maxHp,
    1.03,
  );

  if (character.progression.level % 5 === 0) {
    if (character.advancedStats.accuracy) {
      character.advancedStats.accuracy += 0.02;
    }
    if (character.advancedStats?.dodge) {
      character.advancedStats.dodge += 0.01;
    }
    if (character.advancedStats?.critChance) {
      character.advancedStats.critChance += 0.02;
    }
    if (character.advancedStats?.critDamage) {
      character.advancedStats.critDamage += 0.05;
    }
  }

  usePlayerCharactersStore
    .getState()
    .setCharacters(
      usePlayerCharactersStore
        .getState()
        .characters.map((c) => (c.id === id ? character : c)),
    );
};

export const calculateLevelUpStats = (
  character: Character.Character,
): Readonly<Character.Character> => {
  const lvl = character.progression.level;
  const nextLvl = lvl + 1;

  const copy = structuredClone(character);
  copy.progression.level = nextLvl;

  copy.baseStats.attack = increaseWithFloor(copy.baseStats.attack, 1.03);
  copy.baseStats.defense = increaseWithFloor(copy.baseStats.defense, 1.03);
  copy.baseStats.maxHp = increaseWithFloor(copy.baseStats.maxHp, 1.03);

  if (nextLvl % 5 === 0) {
    if (copy.advancedStats?.accuracy) {
      copy.advancedStats.accuracy += 0.02;
    }
    if (copy.advancedStats?.dodge) {
      copy.advancedStats.dodge += 0.01;
    }
    if (copy.advancedStats?.critChance) {
      copy.advancedStats.critChance += 0.02;
    }
    if (copy.advancedStats?.critDamage) {
      copy.advancedStats.critDamage += 0.05;
    }
  }

  copy.power = calculateCharacterPower(copy);

  return copy;
};

export const isEnoughResources = (
  need:
    | (typeof RESOURES_FOR_LEVEL)[number]
    | (typeof EQUIPMENT_UPGRADE_COSTS)[number],
  resources: PlayerBalances,
) => {
  return (
    resources.gems >= need.balances.gems &&
    resources.gold >= need.balances.gold &&
    resources.summons >= need.balances.summons &&
    resources.summonsSpecial >= need.balances.summonsSpecial
  );
};

export const GEMS_FOR_SELL_BY_RARITY: Record<Character.Rarity, number> = {
  [Character.Rarity.COMMON]: 0,
  [Character.Rarity.UNCOMMON]: 10,
  [Character.Rarity.RARE]: 20,
  [Character.Rarity.EPIC]: 50,
  [Character.Rarity.LEGENDARY]: 100,
}

export const sellEquipment = (equipmentId: string) => {
  const equipmentQuery = usePlayerCharactersStore
    .getState()
    .equipment.find((e) => e.id === equipmentId);
  if (!equipmentQuery) return;

  const power = calculateEquipmentPower(equipmentQuery);

  const { addBalance } = usePlayerStore.getState();

  const gold = Math.floor(power * 3 * (100 + GEMS_FOR_SELL_BY_RARITY[equipmentQuery.rarity]) / 100);

  addBalance('gold', gold);
  addBalance('gems', GEMS_FOR_SELL_BY_RARITY[equipmentQuery.rarity]);

  usePlayerCharactersStore
    .getState()
    .setEquipment(
      usePlayerCharactersStore
        .getState()
        .equipment.filter((e) => e.id !== equipmentId),
    );
};

export const upgradeEquipment = (equipmentId: string) => {
  const equipmentQuery = usePlayerCharactersStore
    .getState()
    .equipment.find((e) => e.id === equipmentId);
  if (!equipmentQuery) return;

  const equipment = structuredClone(equipmentQuery);
  const playerResources = usePlayerStore.getState().balances;

  // Check if equipment can be upgraded (max level might be 10 or based on rarity)
  const maxLevel = getMaxEquipmentLevel(equipment.rarity);
  if (equipment.level >= maxLevel) return;

  const upgradeCost = EQUIPMENT_UPGRADE_COSTS[equipment.level + 1];
  if (!upgradeCost || !isEnoughResources(upgradeCost, playerResources)) return;

  // Deduct resources
  playerResources.gold -= upgradeCost.balances.gold;
  playerResources.gems -= upgradeCost.balances.gems;
  playerResources.summons -= upgradeCost.balances.summons;
  usePlayerStore.getState().setBalances({ ...playerResources });

  // Upgrade equipment
  equipment.level++;

  // Increase stats (similar to character level up but for equipment)
  if (equipment.stats.attack) {
    equipment.stats.attack = increaseWithFloor(equipment.stats.attack, 1.05);
  }
  if (equipment.stats.defense) {
    equipment.stats.defense = increaseWithFloor(equipment.stats.defense, 1.05);
  }
  if (equipment.stats.maxHp) {
    equipment.stats.maxHp = increaseWithFloor(equipment.stats.maxHp, 1.05);
  }

  if (equipment.level % 5 === 0) {
    if (equipment.stats.speed) {
      equipment.stats.speed += 2;
    }
    if (equipment.stats.accuracy) {
      equipment.stats.accuracy += 0.02;
    }
    if (equipment.stats.dodge) {
      equipment.stats.dodge += 0.01;
    }
    if (equipment.stats.critChance) {
      equipment.stats.critChance += 0.02;
    }
    if (equipment.stats.critDamage) {
      equipment.stats.critDamage += 0.05;
    }
  }

  // Update equipment in store
  usePlayerCharactersStore
    .getState()
    .setEquipment(
      usePlayerCharactersStore
        .getState()
        .equipment.map((e) => (e.id === equipmentId ? equipment : e)),
    );
};

export const calculateEquipmentUpgradeStats = (
  equipment: Character.Equipment,
): Readonly<Character.Equipment> => {
  const nextLevel = equipment.level + 1;
  const maxLevel = getMaxEquipmentLevel(equipment.rarity);

  if (nextLevel > maxLevel) return equipment;

  const copy = structuredClone(equipment);
  copy.level = nextLevel;

  // Increase stats (similar to character level up but for equipment)
  if (copy.stats.attack) {
    copy.stats.attack = increaseWithFloor(copy.stats.attack, 1.05);
  }
  if (copy.stats.defense) {
    copy.stats.defense = increaseWithFloor(copy.stats.defense, 1.05);
  }
  if (copy.stats.maxHp) {
    copy.stats.maxHp = increaseWithFloor(copy.stats.maxHp, 1.05);
  }

  if (copy.level % 5 === 0) {
    if (copy.stats.speed) {
      copy.stats.speed += 2;
    }
    if (copy.stats.accuracy) {
      copy.stats.accuracy += 0.02;
    }
    if (copy.stats.dodge) {
      copy.stats.dodge += 0.01;
    }
    if (copy.stats.critChance) {
      copy.stats.critChance += 0.02;
    }
    if (copy.stats.critDamage) {
      copy.stats.critDamage += 0.05;
    }
  }
  return copy;
};

const maxLevels: Record<Character.Rarity, number> = {
  [Character.Rarity.COMMON]: 200,
  [Character.Rarity.UNCOMMON]: 200,
  [Character.Rarity.RARE]: 200,
  [Character.Rarity.EPIC]: 200,
  [Character.Rarity.LEGENDARY]: 200,
};

export const getMaxEquipmentLevel = (rarity: Character.Rarity): number => {
  return maxLevels[rarity];
};

export const calculateStatsWithEquipment = (
  character: Character.Character,
): Character.Character => {
  const copy = structuredClone(character);
  updateStatsWithAscension(copy);

  const equipment = getCharacterEquipment(character.id);

  Object.values(equipment).forEach((equipmentPiece) => {
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
};
