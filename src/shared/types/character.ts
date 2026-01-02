export enum Rarity {
    COMMON = 'common',
    UNCOMMON = 'uncommon',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary'
}

export interface Character {
    id: number;
    key: string;
    name: string;
    maxHp: number;
    damage: number;
    rarity: Rarity;
    speed: number
}