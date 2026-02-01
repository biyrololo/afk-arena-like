import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from "@/pages/Game/Game";
import GameStart from "@/pages/GameStart/GameStart";
import Menu from "@/pages/Menu/Menu";
import { GameEnd } from "@/pages/GameEnd";
import { MyCharacters } from "@/pages/MyCharacters";
import { MyCharacterPage } from "@/pages/MyCharacters/[id]";
import { SummonPage } from "@/pages/Summon/SummonPage";
import { MyEquipmentPage } from "@/pages/MyEquipment/MyEquipment";
import { MyEquipmentItemPage } from "@/pages/MyEquipment/[id]";
import { ShopPage } from "@/pages/Shop";

export default function App() {
    return (
        <BrowserRouter>
            <main className="relative">
                <Routes>
                    <Route path="" Component={Menu} />
                    <Route path="my-characters">
                        <Route path="" Component={MyCharacters} />
                        <Route path=":id" Component={MyCharacterPage} />
                    </Route>
                    <Route path="my-equipment">
                        <Route index Component={MyEquipmentPage} />
                        <Route path=":id" Component={MyEquipmentItemPage} />
                    </Route>
                    <Route path="game">
                        <Route path="" Component={Game} />    
                        <Route path="start" Component={GameStart} />
                        <Route path="end" Component={GameEnd} />
                    </Route>
                    <Route path="shop" Component={ShopPage} />
                    <Route path="summon" Component={SummonPage} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}