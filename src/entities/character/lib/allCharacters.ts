import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";

export const FIREWARRIOR_CHARACTER: Character.Character = {
  id: "0",
  key: "firewarrior",
  name: "Бранн",
  description: 'Яростный клинок',
  rarity: Character.Rarity.RARE,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.FIRE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 550,
    attack: 140,
    speed: 100,
    defense: 50,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.05,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1600
  },
  skills: [],
};

export const VIKING_CHARACTER: Character.Character = {
  id: "0",
  key: "viking",
  name: "Бьёрн",
  description: 'Железный Бок',
  rarity: Character.Rarity.RARE,
  role: Character.Role.TANK,
  faction: Character.Faction.ICE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 1000,
    attack: 80,
    speed: 120,
    defense: 120,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const SPEARWOMAN_CHARACTER: Character.Character = {
  id: "0",
  key: "spearwoman",
  name: "Акари",
  description: 'Молниеносное копье',
  rarity: Character.Rarity.LEGENDARY,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CRYSTAL,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 300,
    attack: 150,
    speed: 250,
    defense: 40,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 6,
    cooldownAttack: 1000
  },
  skills: [],
};

export const WARRIOR_CHARACTER: Character.Character = {
  id: "0",
  key: "warrior",
  name: "Валькирия",
  description: 'Верный Защитник',
  rarity: Character.Rarity.RARE,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.FIRE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,
  baseStats: {
    maxHp: 400,
    attack: 130,
    speed: 210,
    defense: 75,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.15,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 20,
    cooldownAttack: 900,
  },
  skills: [],
};

export const FROST_GUARDIAN: Character.Character = {
  id: "0",
  key: "frostGuardian",
  name: "Таллос",
  description: 'Ледяной Центурион',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.TANK,
  faction: Character.Faction.ICE,
  damageType: Character.DamageType.MAGIC,
  power: 70,
  baseStats: {
    maxHp: 1400,
    attack: 120,
    speed: 60,
    defense: 300,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 12,
    cooldownAttack: 1600
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
  name: "Мордраг",
  description: 'Пожиратель Миров',
  rarity: Character.Rarity.LEGENDARY,
  role: Character.Role.TANK,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 4000,
    attack: 120,
    speed: 50,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.3,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 8,
    cooldownAttack: 3000
  },
  skills: [],
};

export const FIRE_KING_CHARACTER: Character.Character = {
  id: "1",
  key: "fireKing",
  name: "Игнис",
  description: 'Суверен Пламени',
  baseStats: {
    maxHp: 800,
    attack: 100,
    speed: 180,
    defense: 150,
  },
  rarity: Character.Rarity.EPIC,
  role: Character.Role.TANK,
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
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 8,
    cooldownAttack: 2000
  },
  skills: [],
};

export const CRYSTAL_KING: Character.Character = {
  id: "2",
  key: "crystalKing",
  name: "Зефирос",
  description: 'Хранитель Призмы',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.WARRIOR, // или другой подходящий вариант
  faction: Character.Faction.CRYSTAL, // установленное произвольное значение
  damageType: Character.DamageType.MAGIC, // установленное произвольное значение
  power: 30,

  baseStats: {
    maxHp: 350,
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
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 15,
    cooldownAttack: 2000
  },

  skills: [], // здесь можно добавить доступные навыки
};

export const ELEMENTAL_WIND_CHARACTER: Character.Character = {
  id: "3",
  key: "elementalWind",
  name: "Вамм",
  description: 'Порыв Пустыни',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.ASSASSIN, // или другой подходящий вариант
  faction: Character.Faction.NATURE, // установленное произвольное значение
  damageType: Character.DamageType.MAGIC, // установленное произвольное значение
  power: 30,

  baseStats: {
    maxHp: 350,
    attack: 160, // недостающий атрибут в исходном объекте
    speed: 300,
    defense: 30, // недостающий атрибут в исходном объекте
  },
  progression: {
    level: 1,
    maxLevel: 10,
    stars: 1,
    ascension: 0, // или любое другое значение
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.3,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 8,
    cooldownAttack: 1500
  },

  skills: [], // здесь можно добавить доступные навыки

};

export const GROUND_MONK_CHARACTER: Character.Character = {
  id: "4",
  key: "groundMonk",
  name: "Дзун",
  description: 'Незыблемая Скала',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 600,
    attack: 100,
    speed: 170,
    defense: 90,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.05,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 8,
    cooldownAttack: 1400
  },
  skills: [],
}

export const WATER_PRIESTESS_CHARACTER: Character.Character = {
  id: "5",
  key: "waterPriestess",
  name: "Наяда",
  description: 'Голос Океана',
  rarity: Character.Rarity.RARE,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.MAGIC,
  power: 100,

  baseStats: {
    maxHp: 400,
    attack: 110,
    speed: 180,
    defense: 40,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 15,
    cooldownAttack: 1300
  },
  skills: [],
}

export const BLUE_SLIME_CHARACTER: Character.Character = {
  id: "6",
  key: "blueSlime",
  name: "Глэсио",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 250,
    attack: 100,
    speed: 100,
    defense: 5,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.3,
    energyRegen: 10,
    cooldownAttack: 1600
  },
  skills: [],
}

export const GREEN_SLIME_CHARACTER: Character.Character = {
  id: "7",
  key: "greenSlime",
  name: "Блэсио",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 400,
    attack: 60,
    speed: 80,
    defense: 5,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.3,
    energyRegen: 10,
    cooldownAttack: 2000
  },
  skills: [],
}

export const PURPLE_SLIME_CHARACTER: Character.Character = {
  id: "6",
  key: "purpleSlime",
  name: "Плэсио",
  rarity: Character.Rarity.COMMON,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 180,
    attack: 180,
    speed: 180,
    defense: 5,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.3,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.3,
    energyRegen: 10,
    cooldownAttack: 1100
  },
  skills: [],
}

export const FANTASY_WARRIOR_CHARACTER: Character.Character = {
  id: "8",
  key: "fantasyWarrior",
  name: "Лумис",
  description: 'Звездный Скиталец',
  rarity: Character.Rarity.LEGENDARY,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.CRYSTAL,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 500,
    attack: 100,
    speed: 220,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const KITSUNE_CHARACTER: Character.Character = {
  id: "9",
  key: "kitsune",
  name: "Мико",
  description: 'Дух Девяти Хвостов',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CRYSTAL,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 300,
    attack: 120,
    speed: 100,
    defense: 50,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 25,
    cooldownAttack: 1300
  },
  skills: [],
};

export const MINOTAUR_CHARACTER: Character.Character = {
  id: "10",
  key: "minotaur",
  name: "Минотавр",
  description: 'Король Зловещих',
  rarity: Character.Rarity.COMMON,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.NATURE,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 500,
    attack: 80,
    speed: 120,
    defense: 100,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2000
  },
  skills: [],
};

export const BRINGER_OF_DEATH_CHARACTER: Character.Character = {
  id: "11",
  key: "bringerOfDeath",
  name: "Везувий",
  description: 'Везувий',
  rarity: Character.Rarity.UNCOMMON,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 260,
    attack: 180,
    speed: 100,
    defense: 20,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.1,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1800
  },
  skills: [],
};

export const NIGHT_BORNE_CHARACTER: Character.Character = {
  id: "12",
  key: "nightBorne",
  name: "Ночная Рожденная",
  description: 'Ночная Рожденная',
  rarity: Character.Rarity.UNCOMMON,
  role: Character.Role.ASSASSIN,
  faction: Character.Faction.CORRUPTION,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 350,
    attack: 160,
    speed: 300,
    defense: 30,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1700
  },
  skills: [],
};

export const KNIGHT_CHARACTER: Character.Character = {
  id: "13",
  key: "knight",
  name: "Рыцарь",
  description: 'Рыцарь',
  rarity: Character.Rarity.UNCOMMON,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.ORDEN,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 400,
    attack: 60,
    speed: 250,
    defense: 80,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2000
  },
  skills: [],
};

export const STEEL_KNIGHT_CHARACTER: Character.Character = {
  id: "14",
  key: "steelKnight",
  name: "Стальной Рыцарь",
  description: 'Стальной Рыцарь',
  rarity: Character.Rarity.RARE,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.ORDEN,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 600,
    attack: 100,
    speed: 240,
    defense: 230,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 1500
  },
  skills: [],
};

export const HERO_KNIGHT_CHARACTER: Character.Character = {
  id: "15",
  key: "heroKnight",
  name: "Герои Рыцарства",
  description: 'Герои Рыцарства',
  rarity: Character.Rarity.RARE,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.ORDEN,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 600,
    attack: 80,
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
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2000
  },
  skills: [],
};

export const MARTIAL_HERO_CHARACTER: Character.Character = {
  id: "16",
  key: "martialHero",
  name: "Мартиалий",
  description: 'Мартиалий',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.WARRIOR,
  faction: Character.Faction.ORDEN,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 600,
    attack: 250,
    speed: 200,
    defense: 100,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2500
  },
  skills: [],
};

export const OLD_GOLEM_CHARACTER: Character.Character = {
  id: "17",
  key: "oldGolem",
  name: "Мартиалий",
  description: 'Мартиалий',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.TANK,
  faction: Character.Faction.CRYSTAL,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 2100,
    attack: 250,
    speed: 100,
    defense: 100,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0.1,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2500
  },
  skills: [],
};

export const OLD_GUARDIAN_CHARACTER: Character.Character = {
  id: "17",
  key: "oldGuardian",
  name: "Мартиалий",
  description: 'Мартиалий',
  rarity: Character.Rarity.EPIC,
  role: Character.Role.TANK,
  faction: Character.Faction.CRYSTAL,
  damageType: Character.DamageType.PHYSICAL,
  power: 100,

  baseStats: {
    maxHp: 1600,
    attack: 420,
    speed: 200,
    defense: 5,
  },
  progression: {
    level: 1,
    maxLevel: 999,
    stars: 0,
    ascension: 0,
  },
  advancedStats: {
    critChance: 0.2,
    critDamage: 1.5,
    dodge: 0,
    lifesteal: 0.5,
    accuracy: 0.1,
    energyRegen: 10,
    cooldownAttack: 2500
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
