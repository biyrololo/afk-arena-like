import type { Banner } from "./summon.model";

import banner1 from "@/assets/banners/banner1.webp";
import banner2 from "@/assets/banners/banner2.webp";
import { getFeaturedCharacters } from "./summon";

export const AllBanners: Banner[] = [
  {
    id: "featured",
    name: "Редкие герои",
    description: "Это баннер 2",
    image: banner2,
    featuredCharachers: getFeaturedCharacters()
  },
  {
    id: "all",
    name: "Стандартный",
    description: "Это баннер 2",
    image: banner2,
  },
  {
    id: "equipment",
    name: "Редкое снаряжение",
    description: "This is banner 1",
    image: banner1,
  },
];
