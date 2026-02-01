import { useNavigate } from "react-router-dom"

import crystal from '@/assets/menu/crystal.png';
import sword from '@/assets/menu/sword.png';
import heroes from '@/assets/menu/heroes.png';
import equipment from '@/assets/menu/equipment.png';
import shop from '@/assets/menu/shop.png';

import classes from './MenuUI.module.css';
import { Balances } from "../Balances/Balances";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";

export default function MenuUI() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game/start');
    }

    const crystalAspectRatio = 722 / 601;
    const swordAspectRatio = 249 / 322;
    const heroesAspectRatio = 400 / 322;
    const equipmentAspectRatio = 400 / 422;

    const shopAspectRatio = 100 / 131;

    const [chapterNumber, stageNumber] = usePlayerStore(useShallow(state => [state.chapterNumber, state.stageNumber]))

    return (
        <div className="absolute inset-0">
            <Balances />
            <div 
            className={`${classes['magic-glow']}`}
            style={{
                width: 500,
                height: 500 / crystalAspectRatio,
                right: 190,
                bottom: 300,
            }}
            />
            <div
            className={`
                absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100
                `}
            style={{
                backgroundImage: `url(${crystal})`,
                backgroundSize: 'contain',
                width: 400,
                height: 400 / crystalAspectRatio,
                right: 190,
                bottom: 220,
            }}
            onClick={() => navigate('/summon')}
            >
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-40">Призыв</span>
            </div>
            <div
            className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
            style={{
                backgroundImage: `url(${sword})`,
                backgroundSize: 'contain',
                width: 400,
                height: 400 / swordAspectRatio,
                left: 760,
                bottom: 70,
            }}
            onClick={() => handleStartGame()}
            >
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-60">В бой</span>
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-4">{`Этап ${chapterNumber}-${stageNumber}`}</span>
            </div>
            <div
            className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
            style={{
                backgroundImage: `url(${heroes})`,
                backgroundSize: 'contain',
                width: 600,
                height: 600 / heroesAspectRatio,
                left: 150,
                bottom: 430,
            }}
            onClick={() => navigate('/my-characters')}
            >
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-80">Герои</span>
            </div>
            <div
            className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
            style={{
                backgroundImage: `url(${equipment})`,
                backgroundSize: 'contain',
                width: 300,
                height: 300 / equipmentAspectRatio,
                left: 150,
                bottom: 70,
            }}
            onClick={() => navigate('/my-equipment')}
            >
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-5xl mt-50">Снаряжение</span>
            </div>
            <div
            className="absolute flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all duration-100"
            style={{
                backgroundImage: `url(${shop})`,
                backgroundSize: 'contain',
                width: 100,
                height: 100 / shopAspectRatio,
                right: 100,
                top: 120,
            }}
            onClick={() => navigate('/shop')}
            >
                <span className="text-white bg-amber-950 border-4 border-amber-600 py-2 px-6 rounded-full text-3xl mt-48">Магазин</span>
            </div>
        </div> 
    )
}