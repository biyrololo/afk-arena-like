import CharacterViewScene from "@/scenes/CharacterViewScene";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import PhaserGame from "@/shared/ui/PhaserGame";
import { EventBus } from "@/utils/eventBus";
import { useEffect, useMemo, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useShallow } from "zustand/react/shallow";

export const MyCharacterPage: FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [isReady, setIsReady] = useState(false);

    const characters = usePlayerCharactersStore(
        useShallow(
            state => state.characters
        )
    )

    const current = useMemo(() => {
        if(!id) return null;

        return characters.find(c => c.id === +id)
    }, [id, characters])

    useEffect(() => {
        console.log('current', current)
        
        // const setCharacter = () => {
            console.log('set current', current)
            EventBus.emit('CharacterViewScene:setCharacter',
                current
            )
        if(!current) return;
        // }
        // EventBus.on('CharacterViewScene:ready', setCharacter);

        // return () => {
        //     EventBus.off('CharacterViewScene:ready', setCharacter)
        // }
    }, [current])

    if(!current) {
        // navigate('/')
        return null;
    }

    return (
        <>
            <PhaserGame scenes={[CharacterViewScene]} />
            <div>
                <span
                className="absolute text-center text-2xl text-white top-0 left-0"   
                >
                    {current.name}
                </span>
            </div>
        </>
    )
}