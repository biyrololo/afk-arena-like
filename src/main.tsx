import './style.css';

import App from './app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDK } from './entities/sdk/model/sdk';
import { useGameStateStore } from './entities/game/model/game-state.store';

// document.addEventListener('click', () => {
//     document.getElementById('app')!.requestFullscreen();
// })

SDK.getInstance().init()
.then(() => SDK.getInstance().initPlayer())
.then(() => SDK.getInstance().syncWithRemote())
.finally(() => useGameStateStore.getState().initDone())

ReactDOM.createRoot(document.getElementById('app')!).render(
    <App />
)