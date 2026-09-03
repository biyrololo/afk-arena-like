import { usePlayerStore } from "@/entities/player/model/player.store"
import { characterToCompactCharacter, compactCharacterToCharacter } from "@/entities/sdk/model/sdkTools";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import type { Character } from "@/shared/types/character";

export const createExtraData = (): string | undefined => {
    const squad = usePlayerStore.getState().lastSquad;
    const characters = usePlayerCharactersStore.getState().characters;
    if (!squad) return undefined;

    return JSON.stringify(
        squad.map(c => characters.find(ch => ch.id === c))
            .filter(c => !!c).map(characterToCompactCharacter)
    )
}

interface ExtraData {
    squad: Character.Character[];
}

export const parseExtraData = (extraData: string | undefined): ExtraData => {
    if (!extraData) return { squad: [] };
    try {
        const squad = JSON.parse(extraData).map(compactCharacterToCharacter)
        return { squad };
    } catch (e) {
        return { squad: [] };
    }
}
