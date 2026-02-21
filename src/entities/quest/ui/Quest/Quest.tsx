import type { FC } from "react";
import type { IQuestProps } from "./Quest.props";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "@/entities/character/lib/getRarityColor";
import { Button } from "@/shared/ui/Button/Button";

export const Quest: FC<IQuestProps> = ({
    quest,
    completed,
    onComplete
}) => {
    const progress = quest.getProgress();

    return (
        <div className="flex bg-zinc-500 p-4 gap-4 rounded-xl">
                <div className="grow flex flex-col justify-between">
                    <p className="flex w-full text-white text-2xl">
                        {quest.title}
                    </p>
                    <div>
                        {
                            progress < 1 ? (
                                <div className="w-full relative h-[40px] bg-zinc-600">
                                    <div className="absolute top-0 left-0 h-full bg-zinc-700"
                                    style={{ width: `${progress * 100}%` }}
                                    />
                                    <span className="text-lg h-full w-full flex justify-center text-white relative  items-center">
                                        {quest.getProgressText()}
                                    </span>
                                </div>
                            ) : !completed ? (
                                <Button
                                onClick={onComplete}
                                className="h-[40px] w-full justify-center rounded-xl"
                                >
                                    Получить
                                </Button>
                            ) : (
                                <Button
                                className="h-[40px] w-full justify-center rounded-xl"
                                disabled
                                >
                                    Получено
                                </Button>
                            )
                        }
                    </div>
                </div>

                <div
                className="rounded-2xl border-4 aspect-square w-[100px] h-[100px] flex items-center justify-center relative"
                style={{
                    borderColor: getRarityColor(quest.rewardRarity),
                    backgroundColor: `${getRarityColor(quest.rewardRarity)}77`
                }}
                >
                    {
                        Boolean(quest.count) && (
                            <span
                            className="absolute left-1 top-1 text-white text-shadow-[0px_0px_2px_black] text-base"
                            >x{quest.count}</span>
                        )
                    }
                    <Icon icon={quest.reward} size={70} />
                </div>
        </div>
    )
}