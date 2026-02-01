import { Character } from "@/shared/types/character";

export type CreateEquipmentProps = Pick<Character.Equipment,
    'slot' |
    'stats' |
    'name' |
    'description' |
    'key' |
    'rarity' |
    'level'
>;

export namespace AllEquipment {

    export const EQUIPMENT = {

        gray: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'gray',
                name: 'Шлем Пепельного Стража',
                description: 'Потрёпанный временем, но всё ещё надёжный.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { defense: 4, maxHp: 15 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'gray',
                name: 'Кираса Забытого Дозора',
                description: 'Броня старых пограничников.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { defense: 8, maxHp: 45 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'gray',
                name: 'Сапоги Длинного Караула',
                description: 'Созданы для долгих дежурств.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { speed: 2 }
            }
        },

        bworn: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'bworn',
                name: 'Шлем Ветхого Воина',
                description: 'Следы старых битв всё ещё заметны.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { defense: 5, maxHp: 20 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'bworn',
                name: 'Панцирь Уставшего Боя',
                description: 'Не блестит, но держит удар.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { defense: 10, maxHp: 55 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'bworn',
                name: 'Сапоги Скитальца',
                description: 'Много прошли — ещё пройдут.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { speed: 2, dodge: 0.03 }
            }
        },

        browngreen: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'browngreen',
                name: 'Шлем Лесного Заслона',
                description: 'Маскирует и защищает.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { defense: 6, accuracy: 0.04 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'browngreen',
                name: 'Доспех Чащобы',
                description: 'Любим лесными дозорными.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { maxHp: 60, defense: 11 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'browngreen',
                name: 'Сапоги Бесшумного Шага',
                description: 'Шаги почти не слышны.',
                rarity: Character.Rarity.COMMON,
                level: 1,
                stats: { speed: 3, dodge: 0.05 }
            }
        },

        green: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'green',
                name: 'Шлем Изумрудного Дозора',
                description: 'Дарует ясность взгляда.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { defense: 7, accuracy: 0.06 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'green',
                name: 'Кираса Живого Корня',
                description: 'Усиливает живучесть.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { maxHp: 75, defense: 12 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'green',
                name: 'Сапоги Быстрого Мха',
                description: 'Лёгкие и цепкие.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { speed: 3, dodge: 0.06 }
            }
        },

        orange: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'orange',
                name: 'Шлем Закатного Пламени',
                description: 'Согрет жаром битв.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { defense: 8, critChance: 0.05 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'orange',
                name: 'Кираса Последнего Солнца',
                description: 'Чем дольше бой — тем ярче ответ.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { maxHp: 85, defense: 13, critDamage: 0.1 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'orange',
                name: 'Сапоги Горячего Песка',
                description: 'Поддерживают напор.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { speed: 3, accuracy: 0.04 }
            }
        },

        light: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'light',
                name: 'Шлем Чистого Света',
                description: 'Очищает разум.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { defense: 9, accuracy: 0.07 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'light',
                name: 'Доспех Рассвета',
                description: 'Вдохновляет союзников.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { maxHp: 95, defense: 14 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'light',
                name: 'Сапоги Лучезарного Шага',
                description: 'Движения быстры и точны.',
                rarity: Character.Rarity.UNCOMMON,
                level: 1,
                stats: { speed: 4, dodge: 0.06 }
            }
        },

        gold: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'gold',
                name: 'Шлем Королевского Знака',
                description: 'Символ власти и чести.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 12, accuracy: 0.08 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'gold',
                name: 'Золотая Кираса Доминиона',
                description: 'Подавляет противников.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { maxHp: 120, defense: 18, critDamage: 0.12 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'gold',
                name: 'Сапоги Повелителя',
                description: 'Каждый шаг внушает страх.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { speed: 4, accuracy: 0.05 }
            }
        },

        steel: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel',
                name: 'Шлем Гулкой Стали',
                description: 'Отражает удары с лязгом.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 14, maxHp: 35, accuracy: 0.05 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel',
                name: 'Кираса Несгибаемого',
                description: 'Для тех, кто стоит до конца.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 28, maxHp: 110, critDamage: 0.1 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel',
                name: 'Сапоги Стального Шага',
                description: 'Тяжёлые, но надёжные.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { speed: 1, dodge: 0.04 }
            }
        },

        steel_brown: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_brown',
                name: 'Шлем Закалённой Земли',
                description: 'Пропитан пылью сражений.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 15, maxHp: 40 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_brown',
                name: 'Доспех Осадного Вала',
                description: 'Идеален для обороны.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 30, maxHp: 130 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_brown',
                name: 'Сапоги Каменного Упора',
                description: 'Трудно сбить с ног.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { speed: 1, dodge: 0.03 }
            }
        },

        steel_browngreen: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_browngreen',
                name: 'Шлем Пограничного Легиона',
                description: 'Для суровых рубежей.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 16, accuracy: 0.06 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_browngreen',
                name: 'Кираса Рубежного Стража',
                description: 'Сдерживает натиск.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { defense: 32, maxHp: 135 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_browngreen',
                name: 'Сапоги Патруля',
                description: 'Баланс скорости и защиты.',
                rarity: Character.Rarity.RARE,
                level: 1,
                stats: { speed: 2, dodge: 0.05 }
            }
        },

        steel_green: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_green',
                name: 'Шлем Изумрудной Стали',
                description: 'Чёткий взгляд охотника.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { defense: 17, critChance: 0.06 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_green',
                name: 'Доспех Лесного Авангарда',
                description: 'Для мобильных бойцов.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { defense: 30, maxHp: 120, dodge: 0.05 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_green',
                name: 'Сапоги Быстрого Клинка',
                description: 'Позволяют навязывать бой.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { speed: 4, dodge: 0.08 }
            }
        },

        steel_orange: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_orange',
                name: 'Шлем Боевого Заката',
                description: 'Разжигает ярость.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { defense: 18, critChance: 0.08 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_orange',
                name: 'Кираса Последнего Натиска',
                description: 'Чем ближе смерть — тем сильнее удары.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { maxHp: 140, critDamage: 0.18 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_orange',
                name: 'Сапоги Прорыва',
                description: 'Для агрессивной игры.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { speed: 4, accuracy: 0.06 }
            }
        },

        steel_light: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_light',
                name: 'Шлем Очищенной Стали',
                description: 'Разум ясен, рука тверда.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { defense: 19, accuracy: 0.1 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_light',
                name: 'Доспех Светлого Авангарда',
                description: 'Ведёт за собой.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { defense: 34, maxHp: 150 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_light',
                name: 'Сапоги Чёткого Шага',
                description: 'Ни одного лишнего движения.',
                rarity: Character.Rarity.EPIC,
                level: 1,
                stats: { speed: 5 }
            }
        },

        steel_gold: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'steel_gold',
                name: 'Шлем Золочёного Полководца',
                description: 'Командует даже молча.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { defense: 22, accuracy: 0.12 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'steel_gold',
                name: 'Кираса Золотого Доминиона',
                description: 'Подавляет волю врагов.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { maxHp: 180, defense: 40, critDamage: 0.2 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'steel_gold',
                name: 'Сапоги Властного Шага',
                description: 'Каждый шаг — приказ.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { speed: 4, accuracy: 0.08 }
            }
        },

        iron: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'iron',
                name: 'Шлем Ярости Кузни',
                description: 'Пробуждает жажду боя.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { defense: 18, critChance: 0.12, accuracy: 0.08 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'iron',
                name: 'Доспех Кровавого Молота',
                description: 'Каждый удар в ответ сильнее.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { maxHp: 160, defense: 22, lifesteal: 0.1 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'iron',
                name: 'Сапоги Проломленного Строя',
                description: 'Для тех, кто идёт первым.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { speed: 4, dodge: 0.12 }
            }
        },

        iron_brown: {
            helmet: {
                slot: Character.EquipmentSlot.HELMET,
                key: 'iron_brown',
                name: 'Шлем Пепла Войны',
                description: 'Помнит падение империй.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { defense: 24, critChance: 0.1 }
            },
            chest: {
                slot: Character.EquipmentSlot.CHEST,
                key: 'iron_brown',
                name: 'Кираса Выжженного Поля',
                description: 'Чем тяжелее бой — тем крепче броня.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { maxHp: 200, defense: 45 }
            },
            boots: {
                slot: Character.EquipmentSlot.BOOTS,
                key: 'iron_brown',
                name: 'Сапоги Последнего Марша',
                description: 'Идут до конца.',
                rarity: Character.Rarity.LEGENDARY,
                level: 1,
                stats: { speed: 3, dodge: 0.1 }
            }
        }

    } as const;
}

export namespace Weapons {

    export const WEAPONS = {

        sharp_pink: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'sharp_pink_sword',
            name: 'Клинок Розовой Искры',
            description: 'Лёгкий и быстрый меч для первых дуэлей.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { attack: 12, critChance: 0.08, speed: 1 }
        },

        bone: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'bone_sword',
            name: 'Костяной Меч Падших',
            description: 'Собран из останков древних воинов.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { attack: 14, lifesteal: 0.04 }
        },

        emerald: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'emerald_sword',
            name: 'Изумрудный Клинок Охотника',
            description: 'Каждый удар находит слабое место.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 18, accuracy: 0.15 }
        },

        solid_purple: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'solid_purple_sword',
            name: 'Фиолетовый Монолит',
            description: 'Тяжёлый меч с разрушительной силой.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 22, critDamage: 0.18 }
        },

        hellstone: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'hellstone_sword',
            name: 'Адский Клинок Преисподней',
            description: 'Пылает яростью глубин.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 30, critDamage: 0.3 }
        },

        consecration: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'consecration_sword',
            name: 'Освящённый Меч Клятвы',
            description: 'Свет направляет клинок.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 28, accuracy: 0.2, critChance: 0.1 }
        },

        night: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'night_sword',
            name: 'Клинок Ночной Тени',
            description: 'Убивает до того, как его заметят.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 26, critChance: 0.2, dodge: 0.05 }
        },

        jungle: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'jungle_sword',
            name: 'Мачете Диких Джунглей',
            description: 'Идеален для агрессивного боя.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 21, speed: 1, lifesteal: 0.05 }
        },

        cobalt_core: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'cobalt_core_sword',
            name: 'Кобальтовый Сердечник',
            description: 'Стабильный и смертоносный.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 29, accuracy: 0.15 }
        },

        hero: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'hero_sword',
            name: 'Меч Героя Королевства',
            description: 'Оружие защитника слабых.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 38, accuracy: 0.15, critChance: 0.1 }
        },

        short_blue: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'short_blue_sword',
            name: 'Короткий Лазурный Клинок',
            description: 'Быстрые точные удары.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 17, speed: 2 }
        },

        evil: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'evil_sword',
            name: 'Зловещий Меч Порчи',
            description: 'Искажает саму кровь.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 40, lifesteal: 0.12, critChance: 0.12 }
        },

        torch: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'torch_sword',
            name: 'Пылающий Факел-Бастард',
            description: 'Обжигает при каждом ударе.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 20, critDamage: 0.15 }
        },

        needle: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'needle_sword',
            name: 'Игла Дуэлянта',
            description: 'Почти не оставляет шансов.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 24, critChance: 0.28 }
        },

        true_hero: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'true_hero_sword',
            name: 'Истинный Меч Героя',
            description: 'Символ легенды.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { attack: 60, accuracy: 0.2, critChance: 0.15 }
        },

        muramasa: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'muramasa_sword',
            name: 'Мурамаса',
            description: 'Жаждет крови.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { attack: 55, critChance: 0.25, lifesteal: 0.12 }
        },

        ancient_heavy: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'ancient_heavy_sword',
            name: 'Древний Тяжёлый Меч',
            description: 'Каждый удар — как обвал.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 45, critDamage: 0.35 }
        },

        steel_chain: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'steel_chain_sword',
            name: 'Цепной Стальной Клинок',
            description: 'Рвёт защиту врагов.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 32, accuracy: 0.12 }
        },

        curved: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'curved_sword',
            name: 'Изогнутый Песочный Клинок',
            description: 'Идеален для серий ударов.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 23, speed: 2 }
        },

        short_platinum: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'short_platinum_sword',
            name: 'Платиновый Короткий Меч',
            description: 'Лёгкий, но смертоносный.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 30, critChance: 0.18 }
        },

        falchion: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'falchion_sword',
            name: 'Фальшион Разбойника',
            description: 'Грубая, но эффективная сталь.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 26, critDamage: 0.2 }
        },

        scimitar: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'scimitar_sword',
            name: 'Скимитар Песков',
            description: 'Смертоносный танец клинков.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 34, speed: 1, dodge: 0.06 }
        },

        royal_spear: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'royal_spear',
            name: 'Королевское Копьё Доминиона',
            description: 'Держит врагов на расстоянии.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 42, accuracy: 0.18 }
        },

        heavy_melee: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'heavy_melee_sword',
            name: 'Массивный Боевой Клинок',
            description: 'Медленный, но беспощадный.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 40, critDamage: 0.3 }
        },

        crystal: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'crystal_sword',
            name: 'Кристальный Резонатор',
            description: 'Усиливает критические удары.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 44, critChance: 0.2 }
        },

        royal: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'royal_sword',
            name: 'Королевский Меч Наследия',
            description: 'Сбалансированное оружие лидера.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 46, accuracy: 0.15, defense: 8 }
        },

        christmas_tree: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'christmas_tree_sword',
            name: 'Клинок Праздничной Хвои',
            description: 'Странный, но эффективный.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 28, critChance: 0.12, lifesteal: 0.05 }
        },

        ice: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'ice_sword',
            name: 'Ледяной Клинок Безмолвия',
            description: 'Холод замедляет врагов.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 42, accuracy: 0.1, dodge: 0.05 }
        },

        true_evil: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'true_evil_sword',
            name: 'Истинный Клинок Порчи',
            description: 'Абсолютное зло приняло форму стали.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { attack: 68, critChance: 0.22, critDamage: 0.4 }
        },

        true_muramasa: {
            slot: Character.EquipmentSlot.WEAPON,
            key: 'true_muramasa_sword',
            name: 'Истинная Мурамаса',
            description: 'Совершенный клинок резни.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { attack: 72, critChance: 0.3, critDamage: 0.45, lifesteal: 0.15 }
        }

    } as const;
}


export namespace Accessories {

    export const ACCESSORIES = {

        /* 🧤 GLOVES */

        iron_gloves: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'iron_gloves',
            name: 'Железные Перчатки',
            description: 'Простая защита и уверенный хват.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { defense: 6, attack: 2 }
        },

        gold_gloves: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'gold_gloves',
            name: 'Золотые Перчатки',
            description: 'Баланс силы и статуса.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 5, critChance: 0.05 }
        },

        magic_crystal_gloves: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'magic_crystal_gloves',
            name: 'Кристальные Магические Перчатки',
            description: 'Усиливают точность и крит.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { critChance: 0.15, accuracy: 0.12 }
        },

        /* 🛡 SHIELDS */

        wooden_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'wooden_shield',
            name: 'Деревянный Щит',
            description: 'Первая линия обороны.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { defense: 10 }
        },

        fortified_wooden_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'fortified_wooden_shield',
            name: 'Укреплённый Деревянный Щит',
            description: 'Выдерживает серьёзные удары.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { defense: 16, hp: 20 }
        },

        magic_crystal_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'magic_crystal_shield',
            name: 'Кристальный Магический Щит',
            description: 'Отражает часть урона.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { defense: 22, dodge: 0.05 }
        },

        emerald_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'emerald_shield',
            name: 'Изумрудный Щит',
            description: 'Защита с идеальной балансировкой.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { defense: 26, accuracy: 0.1 }
        },

        evil_crystal_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'evil_crystal_shield',
            name: 'Зловещий Кристальный Щит',
            description: 'Питается болью врагов.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { defense: 32, lifesteal: 0.08 }
        },

        night_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'night_shield',
            name: 'Щит Ночной Тени',
            description: 'Растворяется во тьме.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { defense: 30, dodge: 0.12 }
        },

        ancient_fire_evil_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'ancient_fire_evil_shield',
            name: 'Древний Огненный Щит Порчи',
            description: 'Пылающий артефакт разрушения.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { defense: 48, critDamage: 0.25 }
        },

        hero_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'hero_shield',
            name: 'Щит Героя',
            description: 'Щит защитника королевства.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { defense: 36, hp: 60 }
        },

        true_hero_shield: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'true_hero_shield',
            name: 'Истинный Щит Героя',
            description: 'Легендарный символ стойкости.',
            rarity: Character.Rarity.LEGENDARY,
            level: 1,
            stats: { defense: 55, hp: 120, dodge: 0.08 }
        },

        /* 💍 RINGS */

        steel_ring: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'steel_ring',
            name: 'Стальное Кольцо',
            description: 'Простое усиление.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { attack: 4 }
        },

        gold_ring: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'gold_ring',
            name: 'Золотое Кольцо',
            description: 'Чуть больше силы.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { attack: 6, critChance: 0.04 }
        },

        ruby_ring: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'ruby_ring',
            name: 'Рубиновое Кольцо',
            description: 'Усиливает разрушительные удары.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { critDamage: 0.25 }
        },

        emerald_ring: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'emerald_ring',
            name: 'Изумрудное Кольцо',
            description: 'Точность важнее силы.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { accuracy: 0.18 }
        },

        lapis_ring: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'lapis_ring',
            name: 'Лазуритовое Кольцо',
            description: 'Повышает шанс крита.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { critChance: 0.18 }
        },

        /* 📿 NECKLACES */

        steel_necklace: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'steel_necklace',
            name: 'Стальное Ожерелье',
            description: 'Выносливость и защита.',
            rarity: Character.Rarity.COMMON,
            level: 1,
            stats: { hp: 40, defense: 6 }
        },

        emerald_necklace: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'emerald_necklace',
            name: 'Изумрудное Ожерелье',
            description: 'Повышает боевую эффективность.',
            rarity: Character.Rarity.UNCOMMON,
            level: 1,
            stats: { accuracy: 0.12, attack: 6 }
        },

        ruby_necklace: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'ruby_necklace',
            name: 'Рубиновое Ожерелье',
            description: 'Для агрессивных билдов.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { attack: 10, critDamage: 0.2 }
        },

        lapis_necklace: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'lapis_necklace',
            name: 'Лазуритовое Ожерелье',
            description: 'Мастер критических ударов.',
            rarity: Character.Rarity.RARE,
            level: 1,
            stats: { critChance: 0.22 }
        },

        royal_necklace: {
            slot: Character.EquipmentSlot.ACCESSORY,
            key: 'royal_necklace',
            name: 'Королевское Ожерелье',
            description: 'Символ власти и силы.',
            rarity: Character.Rarity.EPIC,
            level: 1,
            stats: { attack: 14, accuracy: 0.15, hp: 80 }
        }

    } as const;
}
