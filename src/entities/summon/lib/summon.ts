import { CRYSTAL_KING, ELEMENTAL_WIND_CHARACTER, FANTASY_WARRIOR_CHARACTER, FIRE_KING_CHARACTER, FIREWARRIOR_CHARACTER, GROUND_MONK_CHARACTER, KITSUNE_CHARACTER, SPEARWOMAN_CHARACTER, STEEL_KNIGHT_CHARACTER, VIKING_CHARACTER, WARRIOR_CHARACTER, WATER_PRIESTESS_CHARACTER } from "@/entities/character/lib/allCharacters";
import { Accessories, AllEquipment, Weapons } from "@/entities/character/lib/equipmentList";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { mockCharacters } from "@/shared/store/mockCharacters";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore"
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

const MULTIPLIERS = {
    [Character.Rarity.COMMON]: 1,
    [Character.Rarity.UNCOMMON]: 1.2,
    [Character.Rarity.RARE]: 2,
    [Character.Rarity.EPIC]: 7,
    [Character.Rarity.LEGENDARY]: 12
}

const allEquipment: Character.Equipment[] = [
    ...Object.values(AllEquipment.EQUIPMENT)
        .map(e => Object.values(e))
        .flat(),
    Object.values(Weapons.WEAPONS)
        .flat(),
    Object.values(Accessories.ACCESSORIES)
        .flat(),
].flat();

const ALL_DROP: DropItem[] = [
    ...mockCharacters.map(c => ({
        type: DropType.CHARACTER as DropType.CHARACTER,
        item: c,
        weight: calculateCharacterPower(c) * MULTIPLIERS[c.rarity] / 2
    })),
    ...allEquipment.map((e: Character.Equipment) => ({
        type: DropType.EQUIPMENT as DropType.EQUIPMENT,
        item: {
            ...e,
            equippedCharacterId: undefined
        },
        weight: calculateEquipmentPower(e) * MULTIPLIERS[e.rarity]
    }))
]

const COOL_DROPS: DropItem[] = [
    ...mockCharacters
        .filter(c => [
            Character.Rarity.EPIC, Character.Rarity.LEGENDARY
        ].includes(c.rarity))
        .map(c => ({
            type: DropType.CHARACTER as DropType.CHARACTER,
            item: c,
            weight: calculateCharacterPower(c) * 1.2 * MULTIPLIERS[c.rarity] / 2
        })),
    ...allEquipment
        .filter((e: Character.Equipment) => [Character.Rarity.EPIC, Character.Rarity.LEGENDARY].includes(e.rarity))
        .map((e: Character.Equipment) => ({
            type: DropType.EQUIPMENT as DropType.EQUIPMENT,
            item: {
                ...e,
                equippedCharacterId: undefined
            },
            weight: calculateEquipmentPower(e) * MULTIPLIERS[e.rarity]
        }))
]

const GET_FEATURED_DROPS = (keys: string[]): DropItem[] => {
    return (
        [
            ...mockCharacters
                .filter(c => c.rarity !== Character.Rarity.COMMON)
                .map(c => ({
                    type: DropType.CHARACTER as DropType.CHARACTER,
                    item: c,
                    weight: calculateCharacterPower(c) * (keys.includes(c.key) ? 0.5 : 1) * MULTIPLIERS[c.rarity] / 2
                })),
            ...Object.values(AllEquipment.EQUIPMENT)
                .map(e => Object.values(e))
                .flat()
                .filter((c: Character.Equipment) => c.rarity !== Character.Rarity.LEGENDARY)
                .map((e: Character.Equipment) => ({
                    type: DropType.EQUIPMENT as DropType.EQUIPMENT,
                    item: {
                        ...e,
                        equippedCharacterId: undefined
                    },
                    weight: calculateEquipmentPower(e) * MULTIPLIERS[e.rarity] * (keys.includes(e.key) ? 0.5 : 1)
                }))
        ]
    )
}

const GET_FEATURED_EQUIPMENT = (keys: string[]): DropItem[] => {
    return (
        [
            ...Object.values(AllEquipment.EQUIPMENT)
                .map(e => Object.values(e))
                .flat(),
            Object.values(Weapons.WEAPONS)
                .flat(),
            Object.values(Accessories.ACCESSORIES)
                .flat(),
        ].flat().map((e: Character.Equipment) => ({
            type: DropType.EQUIPMENT,
            item: {
                ...e,
                equippedCharacterId: undefined
            },
            weight: calculateEquipmentPower(e) * MULTIPLIERS[e.rarity] * (keys.includes(e.key) ? 0.5 : 1)
        }))
    )
}

const FEATURED_ROTATION_START = new Date("2025-01-01").getTime();
const WEEK = 7 * 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function getTimeUntilNextRotation() {
    const now = Date.now();

    // 1. Вычисляем, сколько мс прошло с начала самой первой ротации
    const timePassed = now - FEATURED_ROTATION_START;

    // 2. Находим, сколько мс длится текущий (незавершенный) цикл
    const msIntoCurrentRotation = timePassed % WEEK;

    // 3. Узнаем, сколько мс осталось до конца этой недели
    const msLeft = WEEK - msIntoCurrentRotation;

    // 4. Переводим в дни и часы
    const days = Math.floor(msLeft / DAY);
    const hours = Math.floor((msLeft % DAY) / HOUR);

    return { days, hours, msLeft };
}

const getFeaturedKeys = () => {
    const now = Date.now();
    const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);

    const keys = [
        [
            FIRE_KING_CHARACTER.key,
            KITSUNE_CHARACTER.key,
            SPEARWOMAN_CHARACTER.key
        ],
        [
            WARRIOR_CHARACTER.key,
            CRYSTAL_KING.key,
            ELEMENTAL_WIND_CHARACTER.key
        ],
        [
            WATER_PRIESTESS_CHARACTER.key,
            GROUND_MONK_CHARACTER.key,
            FANTASY_WARRIOR_CHARACTER.key
        ],
        [
            VIKING_CHARACTER.key,
            FIRE_KING_CHARACTER.key,
            FIREWARRIOR_CHARACTER.key
        ]
    ];

    return keys[weekIndex % keys.length];
};

export const getFeaturedEquipment = () => {
    const now = Date.now();
    const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);

    const keys = [
        [
            Weapons.WEAPONS.true_hero,
            Weapons.WEAPONS.muramasa,
            Accessories.ACCESSORIES.true_hero_shield
        ],
        [
            AllEquipment.EQUIPMENT.steel_gold.helmet,
            AllEquipment.EQUIPMENT.steel_gold.chest,
            AllEquipment.EQUIPMENT.steel_gold.boots,
        ],
        [
            AllEquipment.EQUIPMENT.iron.helmet,
            AllEquipment.EQUIPMENT.iron.chest,
            AllEquipment.EQUIPMENT.iron.boots,
        ],
        [
            Weapons.WEAPONS.true_evil,
            AllEquipment.EQUIPMENT.iron_brown.chest,
            Accessories.ACCESSORIES.ancient_fire_evil_shield,
        ],
    ]

    return keys[weekIndex % keys.length];
}

export const getFeaturedCharacters = () => {
    const now = Date.now();
    const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);

    const keys = [
        [
            FIRE_KING_CHARACTER,
            KITSUNE_CHARACTER,
            SPEARWOMAN_CHARACTER
        ],
        [
            WARRIOR_CHARACTER,
            CRYSTAL_KING,
            ELEMENTAL_WIND_CHARACTER
        ],
        [
            WATER_PRIESTESS_CHARACTER,
            GROUND_MONK_CHARACTER,
            FANTASY_WARRIOR_CHARACTER
        ],
        [
            VIKING_CHARACTER,
            STEEL_KNIGHT_CHARACTER,
            FIREWARRIOR_CHARACTER
        ]
    ];

    return keys[weekIndex % keys.length];
};

const prepareDrop = (drops: DropItem[]) => {
    const sum = drops.reduce((acc, cur) => acc + 1 / (cur.weight || 1), 0);
    drops.forEach(drop => {
        const w = 1 / (drop.weight || 1);
        drop.weight = w / sum;
    });
}

prepareDrop(ALL_DROP);
prepareDrop(COOL_DROPS);

const DROPS_BY_ID = {
    "all": ALL_DROP,
    // "equipment": EQUIPMENT_DROP,
}

const summonOnce = (drops: DropItem[]) => {
    let left = 0;
    const rand = Math.random();
    for (const drop of drops) {
        left += drop.weight;
        if (rand <= left) {
            return structuredClone(drop);
        }
    }
    return structuredClone(drops[drops.length - 1]);
}

export const getAllItemsByBannerId = (id: string): (DropItem & { featured?: boolean })[] => {
    let drops = DROPS_BY_ID[id as keyof typeof DROPS_BY_ID];
    if (id === 'featured') {
        const keys = getFeaturedKeys();
        const featuredDrops = GET_FEATURED_DROPS(keys).map(drop => ({ ...drop, featured: keys.includes(drop.item.key) }));
        prepareDrop(featuredDrops)
        drops = featuredDrops
    } else if (id === 'equipment') {
        const keys = getFeaturedEquipment();
        const featuredEquipment = GET_FEATURED_EQUIPMENT(keys.map(e => e.key)).map(drop => ({ ...drop, featured: keys.map(e => e.key as string).includes(drop.item.key) }));
        prepareDrop(featuredEquipment)
        drops = featuredEquipment
    }

    if (!drops) throw new Error("Invalid drop id: " + id);

    return drops;
}

export const summon = (amount: 1 | 10, id: string) => {
    let drops = DROPS_BY_ID[id as keyof typeof DROPS_BY_ID];
    if (id === 'featured') {
        const featuredDrops = GET_FEATURED_DROPS(getFeaturedKeys());
        prepareDrop(featuredDrops)
        drops = featuredDrops
    }
    if (id === 'equipment') {
        const featuredEquipment = GET_FEATURED_EQUIPMENT(getFeaturedEquipment().map(e => e.key));
        prepareDrop(featuredEquipment)
        drops = featuredEquipment
    }
    if (!drops) {
        throw new Error("Invalid drop id");
    }

    const valute = id === 'all' ? 'summons' : 'summonsSpecial';

    let balances = usePlayerStore.getState().balances;

    const spendAmouny = amount === 10 && id === 'all' ? 8 : amount;

    if (balances[valute] < spendAmouny) return []

    usePlayerStore.getState().setBalances({
        ...balances,
        [valute]: balances[valute] - spendAmouny
    })

    const result: DropItem[] = []
    for (let i = 0; i < amount; i++) {
        const r = summonOnce(drops)
        if (r.type === DropType.CHARACTER) {
            r.item.power = calculateCharacterPower(r.item)
            r.item.id = v4();
        } else if (r.type === DropType.EQUIPMENT) {
            r.item.equippedCharacterId = undefined;
            r.item.id = v4();
        }
        result.push(r)
    }

    const isSomeCool = result.some(r => r.type === DropType.CHARACTER && [Character.Rarity.EPIC, Character.Rarity.LEGENDARY].includes(r.item.rarity));
    if (id === 'featured' || id === 'equipment') {
        if (!isSomeCool && amount === 10) {
            const r = summonOnce(
                id === 'equipment' ?
                    COOL_DROPS.filter(c => c.type === DropType.EQUIPMENT) :
                    COOL_DROPS.filter(c => c.type === DropType.CHARACTER || c.item.rarity !== Character.Rarity.LEGENDARY)
            );
            if (r.type === DropType.EQUIPMENT) {
                r.item.equippedCharacterId = undefined;
                r.item.id = v4();
            } else {
                r.item.power = calculateCharacterPower(r.item);
                r.item.id = v4();
            }
            result[result.length - 1] = r;
        }
    }

    const currentCharacters = usePlayerCharactersStore
        .getState()
        .characters;

    let totalGemsBonus = 0;

    result.forEach((r, index) => {
        if (r.type === DropType.CHARACTER) {
            const newCharacter = r.item;
            const c = currentCharacters.find(ch => ch.key === newCharacter.key)
            if (c) {
                r.ascension = c.progression.ascension + 1;
                if (c.progression.ascension < 5) {
                    c.progression.ascension++;
                } else {
                    totalGemsBonus += 500;
                }
            }

            const c2 = result.slice(0, index)
                .filter(c => c.type === DropType.CHARACTER)
                .map(c => c.item)
                .find(c => c.key === r.item.key);
            if (c2) {
                r.ascension = c2.progression.ascension + 1;
                if (c2.progression.ascension < 5) {
                    c2.progression.ascension++;
                } else {
                    totalGemsBonus += 500;
                }
            }
        }
    })

    const charactersToAdd: Character.Character[] = [];
    result
        .filter(r => r.type === DropType.CHARACTER)
        .map(r => r.item)
        .forEach((c: Character.Character) => {
            if (!charactersToAdd.some((ch: Character.Character) => ch.key === c.key)) {
                charactersToAdd.push(c);
            }
        })

    usePlayerCharactersStore
        .getState()
        .setCharacters(
            currentCharacters.concat(charactersToAdd.filter((c: Character.Character) => !currentCharacters.some((ch: Character.Character) => ch.key === c.key)))
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

export const testSummonChances = (poolId: 'all' | 'equipment' | 'featured', iterations: number = 100000) => {
    // 1. Подготовка пула (аналогично логике в summon)
    let drops: DropItem[] = [];

    if (poolId === 'featured') {
        const featuredDrops = GET_FEATURED_DROPS(getFeaturedKeys());
        prepareDrop(featuredDrops);
        drops = featuredDrops;
    } else {
        // @ts-ignore
        drops = DROPS_BY_ID[poolId];
    }

    if (!drops) {
        console.error("Invalid drop id for test");
        return;
    }

    // 2. Структура для сбора статистики
    const stats = {
        [DropType.CHARACTER]: {} as Record<Character.Rarity, number>,
        [DropType.EQUIPMENT]: {} as Record<Character.Rarity, number>,
        total: {
            [DropType.CHARACTER]: 0,
            [DropType.EQUIPMENT]: 0
        }
    };

    // Инициализируем счетчики нулями
    Object.values(Character.Rarity).forEach(rarity => {
        stats[DropType.CHARACTER][rarity as Character.Rarity] = 0;
        stats[DropType.EQUIPMENT][rarity as Character.Rarity] = 0;
    });

    // 3. Цикл симуляции
    console.log(`Starting simulation for "${poolId}" pool with ${iterations} iterations...`);

    for (let i = 0; i < iterations; i++) {
        const result = summonOnce(drops);
        const type = result.type;
        const rarity = result.item.rarity;

        stats[type][rarity]++;
        stats.total[type]++;
    }

    // 4. Вывод результатов в красивом виде
    const formatPercent = (count: number) => ((count / iterations) * 100).toFixed(2) + '%';

    console.group(`Summon Test Results: ${poolId.toUpperCase()}`);

    console.log(`Total Characters: ${stats.total[DropType.CHARACTER]} (${formatPercent(stats.total[DropType.CHARACTER])})`);
    console.table(
        Object.keys(stats[DropType.CHARACTER]).map(rarity => ({
            Rarity: rarity,
            Count: stats[DropType.CHARACTER][rarity as Character.Rarity],
            Chance: formatPercent(stats[DropType.CHARACTER][rarity as Character.Rarity])
        }))
    );

    console.log(`Total Equipment: ${stats.total[DropType.EQUIPMENT]} (${formatPercent(stats.total[DropType.EQUIPMENT])})`);
    console.table(
        Object.keys(stats[DropType.EQUIPMENT]).map(rarity => ({
            Rarity: rarity,
            Count: stats[DropType.EQUIPMENT][rarity as Character.Rarity],
            Chance: formatPercent(stats[DropType.EQUIPMENT][rarity as Character.Rarity])
        }))
    );

    console.groupEnd();
};

// testSummonChances('featured')