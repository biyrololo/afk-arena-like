import { useEffect, useEffectEvent, useMemo, useState, type FC } from "react";
import { findStatement, usePlotStore } from "../../lib/plot.store";
import { useShallow } from "zustand/shallow";

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
        if(!currentSceneId || !currentStatementId) return undefined;
        return findStatement(currentSceneId, currentStatementId);
    }, [currentSceneId, currentStatementId])

    const [writtenIndex, setWrittenIndex] = useState(0);

    const typeWriter = useEffectEvent(() => {
        if(typeof statement?.text === 'string') {
            if(writtenIndex < statement?.text.length) {
                setWrittenIndex(prev => prev + 1)
                return true;
            }
        }
        return false;
    })

    useEffect(() => {
        setWrittenIndex(0)

        const abortController = new AbortController();
        setInterval(() => {
            if(typeWriter()) return;
            abortController.abort();
        }, 50, { signal: abortController.signal });
        
        return () => abortController.abort();
    }, [setWrittenIndex, statement])

    const handleClick = () => {
        if(statement && typeof statement.text === 'string') {
            if(writtenIndex < statement.text.length) {
                setWrittenIndex(statement.text.length);
                return
            }
        }
        nextStatement();
    }

    if(!statement) return null;

    return (
            <div
            className="absolute inset-0 bg-black/50 flex flex-col cursor-pointer justify-end"
            style={{
                pointerEvents: 'all',
                backgroundImage: statement.backgroundImage ? `url(${statement.backgroundImage})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            onClick={handleClick}
            >
                {
                    statement.avatar && (
                        <img 
                        key={statement.id}
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
                <div
                className={`
                    bg-stone-900 p-8 rounded-xl border-2 border-stone-700 mx-10 mb-10
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
                    <p className="text-white text-2xl">
                        {
                            typeof statement.text === 'string' ?
                            statement.text.substring(0, writtenIndex) :
                            statement.text
                        }
                    </p>
                </div>
            </div>
    )

} 