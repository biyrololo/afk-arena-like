import type { Banner } from "./summon.model";

import banner1 from "@/assets/banners/banner1.webp";
import banner2 from "@/assets/banners/banner2.webp";
import { getFeaturedCharacters, getFeaturedEquipment } from "./summon";

import featuredImage1 from '@/assets/banners/featured/banner1.webp';
import featuredImage2 from '@/assets/banners/featured/banner2.webp';
import featuredImage3 from '@/assets/banners/featured/banner3.webp';
import featuredImage4 from '@/assets/banners/featured/banner4.webp';

const FEATURED_ROTATION_START = new Date("2025-01-01").getTime();
const WEEK = 7 * 24 * 60 * 60 * 1000;

const now = Date.now();
const weekIndex = Math.floor((now - FEATURED_ROTATION_START) / WEEK);

const featuredImages = [
  featuredImage1,
  featuredImage2,
  featuredImage3,
  featuredImage4,
]

export const AllBanners: Banner[] = [
  {
    id: "featured",
    name: "Редкие герои",
    description: "Это баннер 2",
    image: featuredImages[weekIndex % featuredImages.length],
    featuredCharachers: getFeaturedCharacters(),
    valute: 'summonsSpecial'
  },
  {
    id: "equipment",
    name: "Редкое снаряжение",
    description: "Это баннер 1",
    image: banner1,
    valute: 'summonsSpecial',
    featuredEquipment: getFeaturedEquipment(),
  },
  {
    id: "all",
    name: "Стандартный",
    description: "Это баннер 2",
    image: banner2,
    valute: 'summons'
  },
];
