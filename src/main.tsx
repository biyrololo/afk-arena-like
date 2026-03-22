import './style.css';

import App from './app/App';
import ReactDOM from 'react-dom/client';
import { SDK } from './entities/sdk/model/sdk';
import { useGameStateStore } from './entities/game/model/game-state.store';
import { consumeAllPurchases } from './entities/sdk/model/sdkConsumePurchases';

SDK.getInstance().init()
    .then(() => SDK.getInstance().initPlayer())
    .then(() => SDK.getInstance().syncWithRemote())
    .then(() => consumeAllPurchases())
    .finally(() => {
        useGameStateStore.getState().initDone();
    })

document.getElementById('app')!.oncontextmenu = e => {
    e.preventDefault();
    e.stopPropagation();
}

document.getElementById('app')!.ondragstart = e => {
    e.preventDefault();
    e.stopPropagation();
}

ReactDOM.createRoot(document.getElementById('app')!).render(
    <App />
)