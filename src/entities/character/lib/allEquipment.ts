import { Icons } from "@/shared/icons";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import { Character } from "@/shared/types/character";
import { v4 } from "uuid";
import type { CreateEquipmentProps } from "./equipmentList";

export const createEquipment = (props: CreateEquipmentProps): Character.Equipment => {
    const newEquipment: Character.Equipment = {
        id: v4(),
        ...props,
        equippedCharacterId: undefined
    }

    if(!(`${props.key}_${props.slot}` in Icons)) {
        throw new Error(`Icon for ${props.key}_${props.slot} does not exist`);
    }

    return newEquipment;
}

export const equipItem = (characterId: Character.Character['id'], equipmentId: Character.Equipment['id']) => {
    const equipment = usePlayerCharactersStore.getState().equipment;

    const eq = equipment.find((e) => e.id === equipmentId);
    if (!eq) return;

    usePlayerCharactersStore.setState((state) => {
        const updatedEquipment = equipment.map((e) => {
            if (e.id === equipmentId) {
                return { ...e, equippedCharacterId: characterId };
            } else if(e.equippedCharacterId === characterId && e.slot === eq.slot) {
                return { ...e, equippedCharacterId: undefined };
            }
            return e;
        });
        return { equipment: updatedEquipment };
    });
}

export const unequipItem = (equipmentId: Character.Equipment['id']) => {
    const equipment = usePlayerCharactersStore.getState().equipment;

    usePlayerCharactersStore.setState((state) => {
        const updatedEquipment = equipment.map((e) => {
            if (e.id === equipmentId) {
                return { ...e, equippedCharacterId: undefined };
            }
            return e;
        });
        return { equipment: updatedEquipment };
    });
}

export const getEquipmentBySlot = (slot: Character.EquipmentSlot) => {
    const equipment = usePlayerCharactersStore.getState().equipment;
    return equipment.filter((e: Character.Equipment) => e.slot === slot);
}
