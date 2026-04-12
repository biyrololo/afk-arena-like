import { useEffect, useEffectEvent, useMemo, useState, type FC } from "react";
import { findStatement, usePlotStore } from "../../lib/plot.store";
import { useShallow } from "zustand/shallow";
import { AnimatePresence, motion } from "framer-motion";

export const PlotModal: FC = () => {
    const [
        currentStatementId,
        currentSceneId,
        nextStatement,
        startScene
    ] = usePlotStore(
        useShallow(state => [
            state.currentStatementId,
            state.currentSceneId,
            state.nextStatement,
            state.startScene
        ])
    )

    useEffect(() => {
        startScene();
    }, [])

    const statement = useMemo(() => {
        if (!currentSceneId || !currentStatementId) return undefined;
        return findStatement(currentSceneId, currentStatementId);
    }, [currentSceneId, currentStatementId])

    const [writtenIndex, setWrittenIndex] = useState(1);

    const typeWriter = useEffectEvent(() => {
        if (typeof statement?.text === 'string') {
            if (writtenIndex < statement?.text.length) {
                setWrittenIndex(prev => prev + 1)
                return true;
            }
        }
        return false;
    })

    useEffect(() => {
        setWrittenIndex(1)

        const abortController = new AbortController();
        setInterval(() => {
            if (typeWriter()) return;
            abortController.abort();
        }, 50, { signal: abortController.signal });

        return () => abortController.abort();
    }, [setWrittenIndex, statement])

    const handleClick = () => {
        if (statement && typeof statement.text === 'string') {
            if (writtenIndex < statement.text.length) {
                setWrittenIndex(statement.text.length);
                return
            }
        }
        nextStatement();
    }

    return (
        <AnimatePresence>
            {
                statement && (
                    <motion.div
                        className="absolute inset-0 bg-black/50 flex flex-col cursor-pointer justify-end z-60"
                        style={{
                            pointerEvents: 'all',
                            backgroundImage: statement.backgroundImage ? `url(${statement.backgroundImage})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        onClick={handleClick}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, x: 40 }}
                    >
                        <AnimatePresence mode="wait">
                            {
                                statement.avatar && (
                                    <motion.img
                                        key={`${statement.avatar}-${statement.authorPosition}`}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                        src={statement.avatar}
                                        alt={statement.author}
                                        className="size-50 object-cover object-center rounded-t-2xl border-2 border-stone-700 mt-auto mx-20"
                                        style={{
                                            alignSelf: statement.authorPosition === 'right' ? 'flex-end' : 'flex-start',
                                            transform: statement.authorPosition === 'right' ? 'rotateY(180deg)' : ''
                                        }}
                                    />
                                )
                            }
                        </AnimatePresence>
                        <div
                            className={`
                                bg-stone-900 p-8 rounded-xl border-2 border-stone-700 mx-10 mb-20
                                flex flex-col gap-4
                                `}
                        >
                            <span
                                className="font-bold text-5xl"
                                style={{
                                    color: statement.color,
                                    alignSelf: statement.authorPosition === 'right' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                {statement.author}
                            </span>
                            <p
                                className="text-white text-2xl min-h-[1em]"
                            >
                                {
                                    typeof statement.text === 'string' ?
                                        statement.text.substring(0, writtenIndex) :
                                        statement.text
                                }
                            </p>
                        </div>
                        {
                            (typeof statement.text !== 'string' || writtenIndex === statement.text.length) && (
                                <p className="text-white text-2xl min-h-[1em] absolute bottom-1 left-1/2 -translate-x-1/2 py-4 px-8 bg-black/80 rounded-xl">
                                    Нажмите в любое место для продолжения
                                </p>
                            )
                        }
                    </motion.div>

                )
            }
        </AnimatePresence >
    )

} 