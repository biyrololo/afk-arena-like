import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from "@/pages/Game/Game";
import GameStart from "@/pages/GameStart/GameStart";
import Menu from "@/pages/Menu/Menu";
import { GameEnd } from "@/pages/GameEnd";
import { MyCharacters } from "@/pages/MyCharacters";
import { MyCharacterPage } from "@/pages/MyCharacters/[id]";

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
                <Route path="game">
                    <Route path="" Component={Game} />    
                    <Route path="start" Component={GameStart} />
                    <Route path="end" Component={GameEnd} />
                </Route>
            </Routes>
            </main>
        </BrowserRouter>
    )
}