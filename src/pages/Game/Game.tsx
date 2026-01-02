import { useLocation, useNavigate } from "react-router-dom";

import { EventBus } from "@/utils/eventBus";
import GameScene from "@/scenes/GameScene";
import GameUI from "@/widgets/GameUI/GameUI";
import PhaserGame from "@/shared/ui/PhaserGame";
import type { PlayerCharacter } from "@/shared/types/PlayerCharacter";
import { useEffect } from "react";

export default function Game() {
    const location = useLocation();
    const navgiate = useNavigate();

    const characters: Array<PlayerCharacter | null> | undefined = location.state?.characters;

    useEffect(() => {
        if(!characters) {
            navgiate('/', {
                replace: true
            })
    }
    }, [])
    
    useEffect(() => {
        console.log('CHARACTERS', characters);
        EventBus.on('sceneReady', (scene: string) => {
            console.log('loaded', scene);
            if(scene === 'GameScene') {
                console.log('emit addAllies', characters);
                EventBus.emit('addAllies', characters);
                console.log('emit start');
                EventBus.emit('start')
            }
        })


        return () => {
            EventBus.removeListener('sceneReady');
        }
    }, [])

    useEffect(() => {
        EventBus.on('gameOverUI', (data: {win: boolean}) => {
            console.log(data);
            navgiate('/game/end', {
                state: {
                    win: data.win
                }
            })
        })
    }, [])

    if(!characters) return null;

    return (
        <>
            <PhaserGame scenes={[GameScene]} />
            <GameUI />
        </>
    )   
}