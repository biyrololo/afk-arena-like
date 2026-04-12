import type { Banner } from "@/entities/summon/lib/summon.model";
import classNames from "classnames";
import type { FC } from "react";

interface BannersRowProps {
    banners: Banner[];
    activeBanner: Banner['id'];
    onBannerClick: (bannerId: Banner['id']) => void;
}

export const BannersRow: FC<BannersRowProps> = ({ banners, activeBanner, onBannerClick }) => {
    return (
        <div className="flex flex-wrap gap-12 justify-center absolute left-1/2 top-6 -translate-x-1/2 z-100">
            {banners.map((banner) => (
                <div key={banner.id} className={
                    classNames(
                        "w-[210px] h-[100px] rounded-md  cursor-pointer hover:opacity-70 transition-all duration-100",
                        activeBanner === banner.id ? 'border-2 border-amber-50' : 'opacity-60'
                    )
                }
                    onClick={() => onBannerClick(banner.id)}
                    style={{
                        backgroundImage: `url(${banner.image})`,
                        backgroundSize: 'cover'
                    }}
                >

                </div>
            ))}
        </div>
    );
};
