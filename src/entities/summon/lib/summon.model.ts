import type { PlayerBalances } from "@/entities/player/model/player.model";
import type { Character } from "@/shared/types/character";

export interface Banner {
    id: string;
    name: string;
    description: string;
    image: string;
    featuredCharachers?: Character.Character[];
    featuredEquipment?: Omit<Character.Equipment, 'id'>[];
    valute: keyof PlayerBalances
}