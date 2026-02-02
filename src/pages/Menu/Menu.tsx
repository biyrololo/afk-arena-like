import { PlotModal } from "@/entities/plot/ui/PlotModal/PlotModal";
import BootScene from "@/scenes/BootScene";
import PhaserGame from "@/shared/ui/PhaserGame";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { EventBus } from "@/utils/eventBus";
import MenuUI from "@/widgets/MenuUI/MenuUI";
import { useEffect } from "react";
import menu from '@/assets/menu/menu.webp'


export default function Menu() {
    useEffect(() => {
        EventBus.emit('load:start')
    }, [])

    return (
        <>
            <PhaserGame scenes={[BootScene]} />
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
        </>
    )
}