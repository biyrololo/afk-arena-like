import { generateTowerStage } from "@/entities/chapter/lib/stages/tower-stages";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal";
import { Loader, Trophy, X } from "lucide-react";
import { useState, type CSSProperties, type FC } from "react";

import styles from './Leaderboard.module.css';
import classNames from "classnames";
import { Backgrounds } from "@/shared/backgrounds";
import { SDK } from "@/entities/sdk/model/sdk";
import { LEADERBOARD_NAME } from "@/shared/lib/constants";
import type { LeaderboardEntriesData } from "ysdk";
import { useGameStateStore } from "@/entities/game/model/game-state.store";

export const Leaderboard: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [isPlayerAuthorized, setIsPlayerAuthorized] = useState(SDK.getInstance().isPlayerAuthorized());

    const [leaderboardEntriesData, setLeaderboardEntriesData] = useState<LeaderboardEntriesData | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const entries = await SDK.getInstance().getLeaderboardEntries(LEADERBOARD_NAME, { includeUser: true, quantityAround: 1, quantityTop: 5 });

            setLeaderboardEntriesData(entries);
        } catch (e) {
            console.error('Error while fetching data:', e);
        }
        setIsLoading(false);
    }

    const handleAuthorize = () => {
        useGameStateStore.getState().setPaused(true);
        SDK.getInstance().openAuthDialog({
            onSuccess: () => {
                setIsPlayerAuthorized(true);
                fetchData();
                useGameStateStore.getState().setPaused(false);
            },
            onError: () => {
                useGameStateStore.getState().setPaused(false);
            },
            onClose: () => {
                useGameStateStore.getState().setPaused(false);
            },
        })
    }

    const handleOpen = () => {
        if (!SDK.getInstance().isPlayerAuthorized()) {
            setIsPlayerAuthorized(false);
        } else {
            setIsPlayerAuthorized(true);
            fetchData();
        }
    }

    const toggleLeaderboard = () => {
        if (!isOpened) {
            handleOpen();
        }
        setIsOpened(!isOpened);
    };

    return (
        <>
            <div className="absolute top-10 left-60 flex flex-col items-center">
                <Button
                    className=" bg-amber-400! hover:bg-amber-500! flex flex-col text-2xl p-2!"
                    onClick={toggleLeaderboard}
                >
                    <Trophy size={60} />
                    Таблица<br />Лидеров
                </Button>
                {!isPlayerAuthorized && <div className="text-white/90 text-2xl text-center">Требуется<br />Авторизация</div>}
            </div>
            <Modal maxWidth="unset" isOpened={isOpened} close={toggleLeaderboard} classNames={{
                container: 'flex flex-col items-center bg-[#2c1523]! border-4 border-[#b10b2a32] p-4',
                containerRoot: 'w-full'
            }}>
                <div className="text-5xl mb-4 text-white text-center">Таблица Лидеров Башни</div>
                {
                    !isPlayerAuthorized ? <AuthorizationModal onClose={toggleLeaderboard} onAuthorize={handleAuthorize} /> :
                        isLoading || !leaderboardEntriesData ? (
                            <>
                                <div className="w-full flex justify-center items-center my-16">
                                    <Loader color="white" size={60} className={styles.spinner} />
                                </div>
                                <div className="mt-2">
                                    <Button className="bg-red-500 cursor-pointer flex items-center gap-4 hover:bg-red-700! text-white font-bold text-3xl py-2 px-8 rounded disabled:opacity-50 w-full justify-center"
                                        onClick={toggleLeaderboard}
                                    >
                                        Закрыть <X size={40} />
                                    </Button>
                                </div>
                            </>
                        ) :
                            (
                                <>
                                    <div className="w-full flex flex-col gap-2">
                                        {
                                            leaderboardEntriesData.userRank <= 5 ? (
                                                <>
                                                    {
                                                        leaderboardEntriesData.entries.slice(0, 5).map((entry) => (
                                                            <Record
                                                                key={entry.rank}
                                                                rank={entry.rank}
                                                                name={entry.player.publicName}
                                                                score={entry.score}
                                                                avatar={entry.player.getAvatarSrc('medium')}
                                                                isPlayerEntry={entry.rank === leaderboardEntriesData.userRank}
                                                            />
                                                        ))
                                                    }
                                                </>
                                            ) : <>
                                                {
                                                    leaderboardEntriesData.entries.map((entry, index) => {
                                                        if (index <= 4 || entry.rank === leaderboardEntriesData.userRank) {
                                                            return (
                                                                <Record
                                                                    key={entry.rank}
                                                                    rank={entry.rank}
                                                                    name={entry.player.publicName}
                                                                    score={entry.score}
                                                                    avatar={entry.player.getAvatarSrc('medium')}
                                                                    isPlayerEntry={entry.rank === leaderboardEntriesData.userRank}
                                                                />
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </>
                                        }
                                    </div>
                                    <div className="mt-2">
                                        <Button className="bg-red-500 cursor-pointer flex items-center gap-4 hover:bg-red-700! text-white font-bold text-3xl py-2 px-8 rounded disabled:opacity-50 w-full justify-center"
                                            onClick={toggleLeaderboard}
                                        >
                                            Закрыть <X size={40} />
                                        </Button>
                                    </div>
                                </>
                            )
                }
            </Modal>
        </>
    )
}

interface AuthorizeModalProps {
    onClose: () => void;
    onAuthorize: () => void;
}

const AuthorizationModal: FC<AuthorizeModalProps> = ({ onClose, onAuthorize }) => {
    return (
        <div className="text-white text-3xl">
            <div className="leading-20">Авторизуйтесь, чтобы получить больше преимуществ!</div>
            <div>
                Войдите в аккаунт, чтобы получить доступ к <span className="text-green-400 font-extrabold">Таблице Лидеров</span> и сохранить в ней свои результаты, синхронизировать свой игровой прогресс.
                <br />
                <span className="text-yellow-400 font-extrabold leading-20">Не упустите шанс стать лучшим!</span>
                <div className="text-white/90 my-2 w-full block">
                    <span className="text-white font-extrabold leading-20">Преимущества авторизации:</span>
                    <br />
                    1. Доступ к <span className="text-green-400 font-extrabold">Таблице Лидеров</span>
                    <br />
                    2. Сохранение результатов в Таблице Лидеров
                    <br />
                    3. Синхронизация игрового прогресса и покупок <span className="text-green-400 font-extrabold">на всех устройствах</span>
                    <br />
                </div>
                <div className="text-white text-center cursor-pointer bg-green-600 p-2 rounded-2xl hover:bg-green-500 mt-6"
                    onContextMenu={e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onClick={() => onAuthorize()}
                >
                    Авторизоваться и открыть Таблицу Лидеров
                </div>
                <div className="text-white text-center cursor-pointer bg-orange-600 p-2 rounded-2xl hover:bg-orange-500 mt-2"
                    onContextMenu={e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onClick={() => { onClose() }}
                >
                    Отказаться и вернуться к игре
                </div>
            </div>
        </div>
    )
}

interface RecordProps {
    rank: number;
    name: string;
    score: number;
    avatar: string;
    isPlayerEntry?: boolean;
}

const Record: FC<RecordProps> = ({ rank, name, score, avatar, isPlayerEntry }) => {
    const stage = generateTowerStage(score);
    return (
        <div className={classNames("flex items-center gap-8 text-3xl relative p-3 rounded-xl", styles.record)}
            style={{
                '--bg-url': `url(${Backgrounds[stage.background as keyof typeof Backgrounds]})`
            } as CSSProperties}
        >
            <div className="w-14 text-4xl text-white">{rank}</div>
            <img src={avatar} alt={name} className="w-30 h-30 rounded-full" />
            <div className={classNames("text-white w-100 overflow-hidden text-ellipsis", isPlayerEntry && "text-green-500!")}>{name}</div>
            <div className="text-white w-40 text-6xl">{score}</div>
            <div className="ml-auto">
                <div className="flex items-center gap-2">
                    {stage.enemies.filter((enemy) => enemy !== undefined).map((enemy, index) => (
                        <HeroMiniCard withoutAnimation key={index} character={enemy} size="140px" />
                    ))}
                </div>
            </div>
        </div>
    );
};
