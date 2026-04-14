// ======================
// SCENES CHAPTER 3: Кристальная блокада (80 этапов)
// ======================

export const CHAPTER_3_SCENES: IPlotScene[] = [
    // --- ЭТАП 1: ПЕРЕД БОЕМ С МАРОДЕРАМИ ---
    {
        id: "chapter3_start",
        statements: [
            {
                id: "c3s1",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Стоять! Эта территория теперь под защитой Нового Порядка. Сдавайте ценности для нужд высшего блага.",
                avatar: Avatars.metalBladekeeper,
                isAvailable: () => checkProgress(3, 1)
            },
            {
                id: "c3s2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "«Высшее благо»? Вы просто забираете последнее у тех, кто и так всё потерял!",
                avatar: Avatars.warrior,
            },
            {
                id: "c3s3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Мир меняется, но жадность остается прежней. Мы не отдадим вам наше снаряжение.",
                avatar: Avatars.fireKing,
            },
            {
                id: "c3s4",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Тогда мы заберем его сами. Рыцари, окружить их!",
                avatar: Avatars.metalBladekeeper,
            },
        ],
    },

    // --- ЭТАП 2: ПОСЛЕ БОЯ С МАРОДЕРАМИ ---
    {
        id: "after_bladekeeper",
        statements: [
            {
                id: "c3ab1",
                author: CHARACTERS.METAL_BLADEKEEPER_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Агх... это еще не конец! Орден запомнит ваше лицо, Игнис!",
                avatar: Avatars.metalBladekeeper,
                isAvailable: () => checkProgress(3, 2)
            },
            {
                id: "c3ab2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Пусть бегут. У нас есть дела поважнее, чем споры с разбойниками в доспехах.",
                avatar: Avatars.warrior,
            },
        ],
    },

    // --- ЭТАП 20: ПЕРЕД БОЕМ С АКАРИ ---
    {
        id: 'akari_encounter',
        statements: [
            {
                id: "c3ar1",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "purple",
                authorPosition: 'right',
                text: "Свет... он ослепляет... Тьма кажется такой спокойной... Уходите, пока она не поглотила и вас!",
                avatar: Avatars.spearwoman,
                isAvailable: () => checkProgress(3, 20)
            },
            {
                id: "c3ar2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Акари, приди в себя! Игнис, её взгляд пустой, скверна уже завладела ей!",
                avatar: Avatars.warrior,
            },
            {
                id: "c3ar3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Я вижу это. Нам нужно ослабить влияние бездны через бой, а затем я использую пламя!",
                avatar: Avatars.fireKing,
            },
        ],
    },

    // --- ЭТАП 21: ПОСЛЕ БОЯ С АКАРИ (Очищение) ---
    {
        id: "after_akari_rescue",
        statements: [
            {
                id: "c3ar4",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Сейчас! Огонь, очисти её разум от теней!",
                avatar: Avatars.fireKing,
                isAvailable: () => checkProgress(3, 21)
            },
            {
                id: "c3ar5",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Ох... словно пробуждение от долгого сна. Спасибо. Мой разум был в ледяных оковах.",
                avatar: Avatars.spearwoman,
            },
            {
                id: "c3ar6",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Зефирос... Хранитель Призмы... он полностью поддался искажению. Он перекрыл путь к Столице!",
                avatar: Avatars.spearwoman,
            },
            {
                id: "c3ar7",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Значит, слухи верны. Нам придется идти в обход через Междуземье после того, как разберемся здесь.",
                avatar: Avatars.warrior,
            },
            {
                id: "c3ar8",
                color: "green",
                text: `Получен персонаж: ${CHARACTERS.SPEARWOMAN_CHARACTER.name}`,
            },
        ],
        onComplete: () => {
            const characters = usePlayerCharactersStore.getState().characters;
            const c = characters.find(char => char.key === CHARACTERS.SPEARWOMAN_CHARACTER.key);
            if (c) {
                c.progression.ascension < 5 ? c.progression.ascension += 1 : usePlayerStore.getState().addBalance('gems', 1000);
            } else {
                usePlayerCharactersStore.getState().addCharacter(cloneCharacter(CHARACTERS.SPEARWOMAN_CHARACTER));
            }
        }
    },

    // --- ЭТАП 35: ПЕРЕД БОЕМ С КИЦУНЭ ---
    {
        id: 'kitsune_encounter',
        statements: [
            {
                id: "c3k1",
                author: CHARACTERS.KITSUNE_CHARACTER.name,
                color: "orange",
                authorPosition: 'right',
                text: "Милые путники, не желаете ли вы немного помощи? Кристаллы могут быть очень коварными, а я знаю тайные тропы.",
                avatar: Avatars.kitsune,
                isAvailable: () => checkProgress(3, 35)
            },
            {
                id: "c3k2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "В её словах слишком много фальши. Игнис, будь начеку, я чувствую подвох.",
                avatar: Avatars.warrior,
            },
            {
                id: "c3k3",
                author: CHARACTERS.KITSUNE_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Какая проницательность! Но поздно — вы уже в моей ловушке. Посмотрим, как вы справитесь с моими иллюзиями!",
                avatar: Avatars.kitsune,
            },
        ],
    },

    // --- ЭТАП 36: ПОСЛЕ БОЯ С КИЦУНЭ ---
    {
        id: 'after_kitsune',
        statements: [
            {
                id: "c3k4",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Она исчезла! Только лепестки в воздухе... Хитрый лис, она использовала нас, чтобы проверить наши силы!",
                avatar: Avatars.viking,
                isAvailable: () => checkProgress(3, 36)
            },
            {
                id: "c3k5",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Она ушла с помощью магии. Нам нельзя расслабляться, такие как она не сдаются просто так.",
                avatar: Avatars.warrior,
            },
        ],
    },

    // --- ЭТАП 50: ПЕРЕД БОЕМ С ВОИТЕЛЬНИЦЕЙ ---
    {
        id: 'woman_warrior_encounter',
        statements: [
            {
                id: "c3ww1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Ни шагу дальше! Мы защищаем рубеж Столицы. Весь остальной мир уже поглощен скверной, и мы не впустим её сюда!",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(3, 50)
            },
            {
                id: "c3ww2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Остановитесь! Мы пришли из тех земель, и они еще сражаются! Вас обманули!",
                avatar: Avatars.warrior,
            },
            {
                id: "c3ww3",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: 'right',
                text: "Хранитель Зефирос сказал, что снаружи не осталось ничего живого. Вы — лишь тени. В бой, рыцари!",
                avatar: Avatars.womanWarrior,
            },
        ],
    },

    // --- ЭТАП 51: ПОСЛЕ БОЯ С ВОИТЕЛЬНИЦЕЙ ---
    {
        id: 'after_woman_warrior',
        statements: [
            {
                id: "c3wwj1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Вы... вы действительно живые. Зефирос... он солгал нам, чтобы мы не покидали пост?",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(3, 51)
            },
            {
                id: "c3wwj2",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Его разум захвачен, он видит мир через призму бездны. Столица вот-вот падет под натиском чудовищ, пока вы стоите здесь.",
                avatar: Avatars.fireKing,
            },
            {
                id: "c3wwj3",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                authorPosition: "right",
                text: "Если Столица в опасности, я должна быть там. Я провожу вас до центральных врат, чтобы искупить свою вину!",
                avatar: Avatars.womanWarrior,
            },
        ],
    },

    // --- ЭТАП 65: ПЕРЕД БОЕМ С БРАННОМ ---
    {
        id: 'firewarrior_rematch',
        statements: [
            {
                id: "c3fc1",
                author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: "right",
                text: "Игнис! Моя сила стала еще ярче. Теперь я докажу, что ты недостоин своего титула!",
                avatar: Avatars.firewarrior,
                isAvailable: () => checkProgress(3, 65)
            },
            {
                id: "c3fc2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Бранн, сейчас не время для поединков! Земля содрогается, ты разве не чувствуешь?",
                avatar: Avatars.warrior,
            },
        ],
    },

    // --- ЭТАП 66: ПОСЛЕ БОЯ С БРАННОМ (Вторжение) ---
    {
        id: 'firewarrior_escape',
        statements: [
            {
                id: "c3fc3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Смотрите! На горизонте целая лавина чудовищ! Они наступают!",
                avatar: Avatars.warrior,
                isAvailable: () => checkProgress(3, 66)
            },
            {
                id: "c3fc4",
                author: CHARACTERS.VIKING_CHARACTER.name,
                color: "green",
                text: "Их слишком много даже для нас! Нужно отходить к кристальным пикам!",
                avatar: Avatars.viking,
            },
            {
                id: "c3fc5",
                author: CHARACTERS.FIREWARRIOR_CHARACTER.name,
                color: "red",
                authorPosition: "right",
                text: "Ха! Тьма сама дает мне шанс уйти. Наслаждайтесь своим спасением, пока можете!",
                avatar: Avatars.firewarrior,
            },
        ],
    },

    // --- ЭТАП 80: ПЕРЕД ФИНАЛЬНЫМ БОЕМ (Зефирос) ---
    {
        id: "crystal_king_encounter",
        statements: [
            {
                id: "c3ck1",
                author: CHARACTERS.CRYSTAL_KING.name,
                color: "red",
                authorPosition: 'right',
                text: "Я запечатаю этот мир. В кристалле нет боли, нет перемен, нет угасания. Только вечный свет.",
                avatar: Avatars.crystalKing,
                isAvailable: () => checkProgress(3, 80)
            },
            {
                id: "c3ck2",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Твой свет — это тюрьма, Зефирос! Мы вернем людям право на жизнь и свободу!",
                avatar: Avatars.warrior,
            },
            {
                id: "c3ck3",
                author: CHARACTERS.FIRE_KING_CHARACTER.name,
                color: "green",
                text: "Твоя блокада падет сегодня. Приготовься!",
                avatar: Avatars.fireKing,
            },
        ],
    },

    // --- КОНЕЦ ГЛАВЫ (После победы над Зефиросом) ---
    {
        id: "chapter3_end",
        statements: [
            {
                id: "c3end1",
                author: CHARACTERS.WOMAN_WARRIOR_CHARACTER.name,
                color: "green",
                text: "Барьер исчез... Но я вижу дым над Столицей. Я должна идти к своим людям. Спасибо вам.",
                avatar: Avatars.womanWarrior,
                isAvailable: () => checkProgress(4, 1)
            },
            {
                id: "c3end2",
                author: CHARACTERS.SPEARWOMAN_CHARACTER.name,
                color: "green",
                text: "Береги город. А мы отправимся в Междуземье. Только там можно закрыть брешь навсегда.",
                avatar: Avatars.spearwoman,
            },
            {
                id: "c3end3",
                author: CHARACTERS.WARRIOR_CHARACTER.name,
                color: "green",
                text: "Путь будет непростым, но мы уже зашли слишком далеко, чтобы отступать.",
                avatar: Avatars.warrior,
            },
        ],
    },
];