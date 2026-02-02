import { useLocation, useNavigate } from "react-router-dom";

import { EventBus } from "@/utils/eventBus";
import GameScene from "@/scenes/GameScene";
import GameUI from "@/widgets/GameUI/GameUI";
import PhaserGame from "@/shared/ui/PhaserGame";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { useEffect } from "react";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { findStage } from "@/entities/chapter/lib/chapters";

export default function Game() {
    const location = useLocation();
    const navgiate = useNavigate();

    const characters: Array<PlayerCharacter | null> | undefined = location.state?.characters;
    const chapter: number | undefined = location.state?.chapter;
    const stage: number | undefined = location.state?.stage;

    useEffect(() => {
        if(!characters) {
            navgiate('/', {
                replace: true
            })
        } else {
            EventBus.emit('load:start')
        }
    }, [])
    
    useEffect(() => {
        if(!characters || !chapter || !stage) return;
        console.log('CHARACTERS', characters);
        EventBus.on('sceneReady', (scene: string) => {
            console.log('loaded', scene);
            if(scene === 'GameScene') {
                console.log('emit addAllies', characters);
                EventBus.emit('addAllies', characters);
                const currentStage = findStage(chapter, stage);
                if(!currentStage) {
                    throw new Error(`Stage ${chapter}-${stage} not found`);
                }
                console.log('emit start');
                EventBus.emit('start', currentStage)
            }
        })


        return () => {
            EventBus.removeListener('sceneReady');
        }
    }, [characters, chapter, stage])

    useEffect(() => {
        EventBus.on('gameOverUI', (data: {win: boolean}) => {
            console.log(data);
            navgiate('/game/end', {
                state: {
                    ...data
                }
            })
        })
    }, [])

    if(!characters) return null;

    return (
        <>
            <PhaserGame scenes={[GameScene]} />
            <ResponsiveUI>
                <GameUI />
            </ResponsiveUI>
        </>
    )   
}