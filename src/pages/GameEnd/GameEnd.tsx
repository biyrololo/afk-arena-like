import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GameEnd: FC = () => {
    const { state } = useLocation();

    const navigate = useNavigate();

    if(!state || !('win' in state)) {
        navigate('/');
        return null;
    }

    if(state.win) {
        return (
            <div className="text-white">
                имба. вы выиграли
                <div
                onClick={() => navigate('/')}
                >
                    вернуться
                </div>
            </div>
        )
    }

    return (
        <div className="text-white">
            фууу вы проиграли
            <div
            onClick={() => navigate('/')}
            >
                вернуться
            </div>
        </div>
    )
}