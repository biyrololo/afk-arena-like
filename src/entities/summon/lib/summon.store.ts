import type { Banner } from "./summon.model";

import banner1 from "@/assets/banners/banner1.webp";
import banner2 from "@/assets/banners/banner2.webp";

export const AllBanners: Banner[] = [
  {
    id: "all",
    name: "Герои и снаряжение",
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
