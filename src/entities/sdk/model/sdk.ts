import type { SDK as YaSDK, Player, Serializable } from 'ysdk';
import { dumpData, dumpStats, loadData, loadStats } from './sdkTools';

export namespace SDKModel {
    export interface IData extends Record<string, Serializable> { };

    export interface IStats extends Record<string, number> { };

    export interface Callbacks {
        onOpen: () => void;
        onClose: (wasShown: boolean) => void;
        onError: (error: Error | string) => void;
    }

    export interface RewardedCallbacks extends Callbacks {
        onRewarded: () => void;
        onClose: () => void;
    }

    export interface AuthDialogCallbacks extends Callbacks {
        onSuccess: () => void;
        onError: (error: unknown) => void;
    }
}

export class SDK {
    static instance: SDK;
    ysdk: YaSDK | null = null;
    onLoad: ((sdk: SDK) => void)[] = [];
    player: Player | null = null;

    lastSavedData: string | null = null;

    static getInstance(): SDK {
        if (!this.instance) {
            this.instance = new SDK();
        }
        return this.instance;
    }

    init() {
        return new Promise((resolve: (sdk: YaSDK | null) => void, reject) => {
            const yaGamesGlobal: { init: () => Promise<YaSDK> } | undefined = YaGames;
            // const yaGamesGlobal: { init: () => Promise<YaSDK> } | undefined = undefined;

            if (!yaGamesGlobal) {
                console.warn('YaGames SDK не найден (режим разработки)');
                resolve(null);
                return;
            }
            yaGamesGlobal.init()
                .then((ysdk: YaSDK) => {
                    this.ysdk = ysdk;
                    const lang = this.readLang();
                    console.log('[debug] Detected lang', lang);
                    for (let i = 0; i < this.onLoad.length; i++) {
                        this.onLoad[i](this);
                    }
                    ysdk.getStorage().then((safeStorage: any) => Object.defineProperty(window, 'localStorage', { get: () => safeStorage }))
                        .then(() => {
                            localStorage.setItem('key', 'safe storage is working');
                            console.log(localStorage.getItem('key'))
                        })
                    resolve(ysdk)
                })
                .catch((error: unknown) => {
                    reject(error);
                })
        })
    }

    addOnLoad(callback: (sdk: SDK) => void) {
        if (!this.ysdk)
            this.onLoad.push(callback);
        else {
            callback(this);
        }
    }

    readLang() {
        if (!this.ysdk) return;
        if (!this.ysdk.environment) return;
        if (!this.ysdk.environment.i18n) return;
        if (!this.ysdk.environment.i18n.lang) return;
        return this.ysdk.environment.i18n.lang
    }

    gameReady() {
        if (!this.ysdk) {
            return;
        }
        return this.ysdk.features.LoadingAPI.ready()
    }

    gameStart() {
        if (!this.ysdk) {
            return;
        }
        console.warn('Game start');
        return this.ysdk.features.GameplayAPI.start()
    }

    gameStop() {
        if (!this.ysdk) {
            return;
        }
        console.warn('Game stop');
        return this.ysdk.features.GameplayAPI.stop()
    }

    showFullscreenAdv(callbacks: Partial<SDKModel.Callbacks> = {}) {
        if (!this.ysdk) {
            if (callbacks.onError) {
                callbacks.onError('YSDK not initialized');
            }
            return;
        }
        this.ysdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: function () {
                    console.log('Fullscreen adv opened');
                    if (callbacks.onOpen) {
                        callbacks.onOpen();
                    }
                },
                onClose: function (wasShown) {
                    console.log('Fullscreen adv closed', wasShown);
                    if (callbacks.onClose) {
                        callbacks.onClose(wasShown);
                    }
                },
                onError: function (error) {
                    console.error('Error while showing fullscreen adv', error);
                    if (callbacks.onError) {
                        callbacks.onError(error);
                    }
                },
            }
        })
    }

    showRewardedVideo(callbacks: Partial<SDKModel.RewardedCallbacks> = {}) {
        if (!this.ysdk) {
            if (callbacks.onError) {
                callbacks.onError(new Error('YSDK not initialized'));
            }
            return;
        }
        this.ysdk.adv.showRewardedVideo({
            callbacks: {
                onOpen: () => {
                    console.log('Video ad open.');
                    if (callbacks.onOpen) {
                        callbacks.onOpen();
                    }
                },
                onRewarded: () => {
                    console.log('Rewarded!');
                    if (callbacks.onRewarded) {
                        callbacks.onRewarded();
                    }
                },
                onClose: () => {
                    console.log('Video ad closed.');
                    if (callbacks.onClose) {
                        callbacks.onClose();
                    }
                },
                onError: (e) => {
                    console.log('Error while open video ad:', e instanceof Error ? e : new Error(e));
                    if (callbacks.onError) {
                        callbacks.onError(e);
                    }
                },
            }
        })
    }

    initPlayer() {
        if (!this.ysdk) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.ysdk!.getPlayer()
                .then((player) => {
                    console.log('Player', player);
                    console.warn('isAuthorized', player.isAuthorized());
                    this.player = player;
                    // useGameStore.getState().setIsAuthorized(player.isAuthorized());
                    resolve(player);
                })
                .catch((error) => {
                    // useGameStore.getState().setIsAuthorized(false);
                    reject(error);
                });
        })
    }

    setData(data: SDKModel.IData) {
        if (!this.player) {
            console.error('Player not initialized while setting data');
            return;
        }
        const currentData = JSON.stringify(data);
        if (currentData === this.lastSavedData) {
            console.warn('Data is the same, not saving');
            return;
        }
        console.warn('Set player data', data);
        return this.player.setData(data, true);
    }

    getData(keys: undefined | string[] = undefined) {
        if (!this.player) {
            console.error('Player not initialized while getting data');
            return null;
        }
        console.warn('Get player data', keys);
        return this.player.getData(keys);
    }

    setStats(data: SDKModel.IStats) {
        if (!this.player) {
            console.error('Player not initialized while setting stats');
            return;
        }
        console.warn('Set player stats', data);
        return this.player.setStats(data);
    }

    incrementStats(data: SDKModel.IStats) {
        if (!this.ysdk || !this.player) return;
        console.warn('Increment player stats', data);
        return this.player.incrementStats(data);
    }

    getStats(keys = undefined) {
        if (!this.player) {
            console.error('Player not initialized while getting stats');
            return null;
        }
        console.warn('Get player stats', keys);
        return this.player.getStats(keys);
    }

    isPlayerAuthorized() {
        if (!this.player) return false;
        return this.player.isAuthorized();
    }

    openAuthDialog(callbacks: Partial<SDKModel.AuthDialogCallbacks> = {}) {
        if (!this.ysdk) return false;
        this.ysdk.auth.openAuthDialog()
            .then(() => this.initPlayer())
            .then(() => this.syncWithRemote())
            .then(() => {
                if (callbacks.onSuccess) {
                    callbacks.onSuccess();
                }
            })
            .catch((error) => {
                // useGameStore.getState().setIsAuthorized(false);
                if (callbacks.onError) {
                    callbacks.onError(error);
                }
            });
    }

    async syncWithRemote(maxRetries = 3) {
        if (!this.ysdk) return null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`[SDK] Syncing with remote (attempt ${attempt}/${maxRetries})...`);
                const data = await this.getData();
                if (data) {
                    loadData(data)
                }
                const stats = await this.getStats();
                if (stats) {
                    loadStats(stats)
                }
                this.lastSavedData = JSON.stringify(dumpData());
                console.log('[SDK] Successfully synced with remote');
                return; // Success, exit retry loop
            } catch (error) {
                console.error(`[SDK] Error while syncing with remote (attempt ${attempt}/${maxRetries}):`, error);

                if (attempt === maxRetries) {
                    console.error('[SDK] All sync attempts failed');
                } else {
                    // Wait before retry (exponential backoff: 1s, 2s, 4s)
                    const waitTime = Math.pow(2, attempt - 1) * 1000;
                    console.log(`[SDK] Waiting ${waitTime}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
            }
        }
    }

    async syncWithLocal(maxRetries = 3) {
        if (!this.ysdk) return null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`[SDK] Saving to Yandex Cloud (attempt ${attempt}/${maxRetries})...`);

                const data = dumpData();

                await Promise.all([
                    this.setData(data),
                    this.setStats(dumpStats())
                ]);

                console.log('[SDK] Successfully saved to Yandex Cloud');
                this.lastSavedData = JSON.stringify(data);
                return; // Success, exit retry loop
            } catch (error) {
                console.error(`[SDK] Error while saving to Yandex Cloud (attempt ${attempt}/${maxRetries}):`, error);

                if (attempt === maxRetries) {
                    console.error('[SDK] All save attempts failed');
                } else {
                    // Wait before retry (exponential backoff: 1s, 2s, 4s)
                    const waitTime = Math.pow(2, attempt - 1) * 1000;
                    console.log(`[SDK] Waiting ${waitTime}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
            }
        }
    }

    async getPurchases() {
        return await this.ysdk?.payments.getPurchases();
    }

    async getCatalog() {
        return await this.ysdk?.payments.getCatalog();
    }

    async purchase(id: string) {
        return await this.ysdk?.payments.purchase({ id });
    }

    async consumePurchase(token: string) {
        return await this.ysdk?.payments.consumePurchase(token);
    }

    hideBannerAdv() {
        console.warn('Hide banner adv');
        return this.ysdk?.adv.hideBannerAdv();
    }

    // Immediate save for critical actions (spending currency, getting heroes, etc.)
    // Call this directly from code after important state changes
    syncImmediately() {
        console.log('[SDK] Immediate sync triggered');
        return this.syncWithLocal(3);
    }
}