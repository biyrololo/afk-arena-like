import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export const usePlayerStore = create()(
    devtools(
        subscribeWithSelector(
            (set, get) => ({
                
            })
        ),
        {
            name: 'player'
        }
    )
)