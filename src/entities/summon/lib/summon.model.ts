import type { Character } from "@/shared/types/character";

export interface Banner {
    id: string;
    name: string;
    description: string;
    image: string;
    featuredCharachers?: Character.Character[]
}