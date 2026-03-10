import type { Character } from "./character";

export interface PlayerCharacter extends Character.Character { }

export interface PlayerCharacterState {
    texture: string;
    energy: number;
    maxEnergy: number;
    maxHp: number;
    hp: number;
    baseColor?: number;
}

export interface PlayerCharacterWithState extends PlayerCharacter {
    state?: PlayerCharacterState;
}