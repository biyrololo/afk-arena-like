import { EventBus } from "@/utils/eventBus";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"

type MenuNav = {
    icon: string;
    width: number;
    height: number;
    callback: () => void;
    title: string
}

export default function MenuUI() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game/start');
    }

    const navs: MenuNav[] = useMemo(() => ([
        {
            icon: '/assets/menu/heroes.png',
            width: 150,
            height: 100,
            callback: () => navigate('/my-characters'),
            title: 'Герои'
        },
        {
            icon: '/assets/menu/attack.png',
            width: 100,
            height: 100,
            callback: handleStartGame,
            title: 'Бой'
        },
        {
            icon: '/assets/menu/home.png',
            width: 100,
            height: 100,
            callback: () => {},
            title: 'Главная'
        },
        {
            icon: '/assets/menu/summon.png',
            width: 100,
            height: 100,
            callback: () => {},
            title: 'Призыв'
        }
    ]), [])

    return (
        <div className="absolute inset-0">
            <section className={`
                absolute bottom-0 right-0 left-0
                bg-amber-600/40
                p-4
                h-40
                flex
                items-end
                *:cursor-pointer
                text-white
                justify-center
                gap-10
                `}>
                    {
                        navs.map(n => (
                            <button 
                            key={n.title}
                            onClick={n.callback}
                            className="group"
                            >
                                <div 
                                className="bg-cover bottom-0 relative transition-all duration-100 group-hover:bottom-1"
                                style={{
                                    backgroundImage: `url(${n.icon})`,
                                    width: `${n.width}px`,
                                    height: `${n.height}px`
                                }}
                                />
                                <h2 className="group-hover:top-0.5 relative transition-all duration-100 top-0">{n.title}</h2>
                            </button>
                        ))
                    }
            </section>
        </div> 
    )
}