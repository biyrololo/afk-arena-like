import { PlotModal } from "@/entities/plot/ui/PlotModal/PlotModal";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import MenuUI from "@/widgets/MenuUI/MenuUI";


export default function Menu() {
    return (
        <ResponsiveUI>
            <div
            className={`
                w-full h-full relative
                bg-[url('assets/menu/menu.webp')]
                bg-cover
                bg-center
            `}
            >
                <MenuUI />
            </div>
            <PlotModal />
        </ResponsiveUI>
    )
}