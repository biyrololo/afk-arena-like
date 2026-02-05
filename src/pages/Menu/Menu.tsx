import { PlotModal } from "@/entities/plot/ui/PlotModal/PlotModal";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import MenuUI from "@/widgets/MenuUI/MenuUI";
import menu from '@/assets/menu/menu.webp'


export default function Menu() {

    return (
        <ResponsiveUI>
            <div
            className={`
                w-full h-full relative
                bg-cover
                bg-center
            `}
            style={{ backgroundImage: `url(${menu})` }}
            >
                <MenuUI />
            </div>
            <PlotModal />
        </ResponsiveUI>
    )
}