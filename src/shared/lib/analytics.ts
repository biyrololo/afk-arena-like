import { usePlayerStore } from "@/entities/player/model/player.store";

/**
 * Перечисление всех идентификаторов целей из твоего списка в Яндекс Метрике.
 * Строковые значения должны СТРОГО совпадать с тем, что вписано в колонку "Идентификатор".
 */
export enum GameGoal {
    ClickStartBattle = 'click_start_battle',
    ClickGachaMenu = 'click_gacha_menu',
    ClickHeroesInventory = 'click_heroes_inventory',
    FirstBattleStart = 'first_battle_start',
    FirstBattleWin = 'first_battle_win',
    FirstHeroUpgrade = 'first_hero_upgrade',
    FirstGachaSpin = 'first_gacha_spin',
    BattleDefeatLevel1 = 'battle_defeat_level_1',
    LevelFinish = 'level_finish',
    OpenShopScreen = 'open_shop_screen',
    OpenRewardedAd = 'open_rewarded_ad',
    GachaResultRarity = 'gacha_result_rarity',
    ClickStartBattleSurvival = 'click_start_battle_survival',
    ClickedMoneyBuy = 'clicked_money_buy',
    ClickedGameBuy = 'clicked_game_buy'
}


/**
 * Класс-сервис для работы с аналитикой.
 */
export class Analytics {
    private static readonly METRIKA_ID = 108193066;

    /**
     * Отправляет цель в Яндекс Метрику с текущим состоянием игрока.
     * @param extra - Любые дополнительные параметры события (например, ID уровня или редкость героя)
     */
    public static send(goal: GameGoal, extra: Record<string, any> = {}): void {
        const params = {
            // Общие параметры для всех целей
            u_lvl: `${usePlayerStore.getState().chapterNumber}-${usePlayerStore.getState().stageNumber}`,
            u_chapter: usePlayerStore.getState().chapterNumber,
            u_stage: usePlayerStore.getState().stageNumber,
            u_gold: usePlayerStore.getState().balances.gold,
            u_gems: usePlayerStore.getState().balances.gems,
            u_summons: usePlayerStore.getState().balances.summons,
            u_summons_special: usePlayerStore.getState().balances.summonsSpecial,
            // Дополнительные данные события
            ...extra
        };

        if (location.hostname === 'localhost') {
            console.log(`[Analytics-Debug] Goal: ${goal}`, params);
            return;
        }

        if (typeof ym !== 'undefined') {

            ym(this.METRIKA_ID, 'reachGoal', goal, params);

            // Лог для дебага (можно убрать перед билдом)
            console.log(`[Analytics] Goal: ${goal}`, params);
        } else {
            console.warn(`[Analytics] ym is not defined. Goal ${goal} failed.`);
        }
    }
}