import type { Banner } from "./summon.model";

import banner1 from "@/assets/banners/banner1.webp";
import banner2 from "@/assets/banners/banner2.webp";

export const AllBanners: Banner[] = [
  {
    id: "1",
    name: "Уникальные герои",
    description: "This is banner 1",
    image: banner1,
  },
  {
    id: "2",
    name: "Сильнейшие герои",
    description: "Это баннер 2",
    image: banner2,
  },
];
