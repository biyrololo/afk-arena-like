import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";

export const FIREWARRIOR_CHARACTER: Character.Character = {
  id: "0",
  key: "firewarrior",
  name: "Огненный воин",
  rarity: Character.Rarity.RARE,
  role: Character.Role.DPS,
  faction: Character.Faction.FIRE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 600,
    attack: 100,
    speed: 120,
    defense: 40,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const VIKING_CHARACTER: Character.Character = {
  id: "0",
  key: "viking",
  name: "Викинг",
  rarity: Character.Rarity.EPIC,
  role: Character.Role.DPS,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 500,
    attack: 120,
    speed: 100,
    defense: 120,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2500
  },
  skills: [],
};

export const SPEARWOMAN_CHARACTER: Character.Character = {
  id: "0",
  key: "spearwoman",
  name: "Копейщик",
  rarity: Character.Rarity.LEGENDARY,
  role: Character.Role.DPS,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 300,
    attack: 150,
    speed: 250,
    defense: 20,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1200
  },
  skills: [],
};

export const WARRIOR_CHARACTER: Character.Character = {
  id: "0",
  key: "warrior",
  name: "Воин",
  rarity: Character.Rarity.UNCOMMON,
  role: Character.Role.TANK,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 300,
    attack: 80,
    speed: 200,
    defense: 60,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1000,
  },
  skills: [],
};

export const FROST_GUARDIAN: Character.Character = {
  id: "0",
  key: "frostGuardian",
  name: "Морозный страж",
  rarity: Character.Rarity.RARE,
  role: Character.Role.TANK,
  faction: Character.Faction.ICE,
  damageType: Character.DamageType.MAGIC,
  power: 70,
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2000
  },

  baseStats: {
    maxHp: 800,
    attack: 35,
    speed: 60,
    defense: 70,
  },
  progression: {
    level: 1,
    maxLevel: 10,
    stars: 1,
    ascension: 0,
  },
  skills: [],
};

export const DEMON_SLIME: Character.Character = {
  id: "0",
  key: "demonSlime",
  name: "Демонский слейм",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.DPS,
  faction: Character.Faction.UNDEAD,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 1000,
    attack: 200,
    speed: 80,
    defense: 100,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 3000
  },
  skills: [],
};

export const FIRE_KING_CHARACTER: Character.Character = {
  id: "1",
  key: "fireKing",
  name: "Огненный рыцарь",
  baseStats: {
    maxHp: 300,
    attack: 50,
    speed: 250,
    defense: 50,
  },
  rarity: Character.Rarity.COMMON,
  role: Character.Role.DPS,
  faction: Character.Faction.FIRE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const CRYSTAL_KING: Character.Character = {
  id: "2",
  key: "crystalKing",
  name: "Кристальный воин",
  rarity: Character.Rarity.EPIC,
  role: Character.Role.TANK, // или другой подходящий вариант
  faction: Character.Faction.NATURE, // установленное произвольное значение
  damageType: Character.DamageType.MAGIC, // установленное произвольное значение
  power: 30,

  baseStats: {
    maxHp: 300,
    attack: 100, // недостающий атрибут в исходном объекте
    speed: 150,
    defense: 50, // недостающий атрибут в исходном объекте
  },
  progression: {
    level: 1,
    maxLevel: 10,
    stars: 1,
    ascension: 0, // или любое другое значение
  },
  advancedStats: {
    critChance: 0.1,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 3000
  },

  skills: [], // здесь можно добавить доступные навыки
};

export const ELEMENTAL_WIND_CHARACTER: Character.Character = {
  id: "3",
  key: "elementalWind",
  name: "Элементальный ветер",
  rarity: Character.Rarity.LEGENDARY,
  role: Character.Role.DPS, // или другой подходящий вариант
  faction: Character.Faction.NATURE, // установленное произвольное значение
  damageType: Character.DamageType.MAGIC, // установленное произвольное значение
  power: 30,
  
  baseStats: {
    maxHp: 700,
    attack: 150, // недостающий атрибут в исходном объекте
    speed: 250,
    defense: 50, // недостающий атрибут в исходном объекте
  },
  progression: {
    level: 1,
    maxLevel: 10,
    stars: 1,
    ascension: 0, // или любое другое значение
  },
  advancedStats: {
    critChance: 0.1,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2500
  },
  
  skills: [], // здесь можно добавить доступные навыки
  
};

export const GROUND_MONK_CHARACTER: Character.Character = {
  id: "4",
  key: "groundMonk",
  name: "Земной монах",
  rarity: Character.Rarity.RARE,
  role: Character.Role.DPS,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 300,
    attack: 100,
    speed: 200,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
}

export const WATER_PRIESTESS_CHARACTER: Character.Character = {
  id: "5",
  key: "waterPriestess",
  name: "Водная ктото",
  rarity: Character.Rarity.RARE,
  role: Character.Role.DPS,
  faction: Character.Faction.LIGHT,
  damageType: Character.DamageType.MAGIC,
  power: 100,

  baseStats: {
    maxHp: 700,
    attack: 100,
    speed: 120,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
}

export const BLUE_SLIME_CHARACTER: Character.Character = {
  id: "6",
  key: "blueSlime",
  name: "Голубая слюня",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.DPS,
  faction: Character.Faction.UNDEAD,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 400,
    attack: 200,
    speed: 150,
    defense: 30,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 4000
  },
  skills: [],
}

export const GREEN_SLIME_CHARACTER: Character.Character = {
  id: "7",
  key: "greenSlime",
  name: "Зелёная слюня",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.DPS,
  faction: Character.Faction.UNDEAD,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 400,
    attack: 150,
    speed: 150,
    defense: 30,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1000
  },
  skills: [],
}

export const PURPLE_SLIME_CHARACTER: Character.Character = {
  id: "6",
  key: "purpleSlime",
  name: "Фиолетовая слюня",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.DPS,
  faction: Character.Faction.UNDEAD,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 500,
    attack: 100,
    speed: 150,
    defense: 30,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
}

export const FANTASY_WARRIOR_CHARACTER: Character.Character = {
  id: "8",
  key: "fantasyWarrior",
  name: "Фантазийный воин",
  rarity: Character.Rarity.RARE,
  role: Character.Role.DPS,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 600,
    attack: 100,
    speed: 280,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.5,
    critDamage: 0.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const ALL_CHARACTERS: Character.Character[] = [
  FIRE_KING_CHARACTER,
  CRYSTAL_KING,
  FROST_GUARDIAN,
];

export const getCharacterEquipment = (id: Character.Character["id"]) => {
  const allEquipment = usePlayerCharactersStore.getState().equipment;
  const equipment: Character.CharacterEquipment = {};
  allEquipment.forEach((e) => {
    if (e.equippedCharacterId === id) {
      equipment[e.slot] = e;
    }
  });
  return equipment;
};
