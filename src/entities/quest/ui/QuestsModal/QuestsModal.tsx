import { useMemo, useState, type FC } from "react";
import { QUESTS, useQuestsStore } from "../../model/quest.store";
import { useShallow } from "zustand/shallow";
import { Modal } from "@/shared/ui/Modal";
import { Quest } from "../Quest/Quest";
import { Button } from "@/shared/ui/Button/Button";

const PER_PAGE = 4;

export const QuestsModal: FC = () => {
    const [
        isModalOpen,
        setIsModalOpen,
        completedQuests,
        completeQuest
    ] = useQuestsStore(useShallow(
        state => [state.isModalOpen, state.setIsModalOpen, state.completedQuests, state.completeQuest]
    ))

    const handleCompleteQuest = (questId: string) => {
        QUESTS.find(quest => quest.id === questId)?.onClaim?.();
        completeQuest(questId);
    }

    const isQuestCompleted = (questId: string) => {
        return completedQuests.includes(questId);
    }

    const [page, setPage] = useState(0);

    const paginated = useMemo(() => {
        return QUESTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
    }, [page]);

    const totalPages = useMemo(() => {
        return Math.ceil(QUESTS.length / PER_PAGE);
    }, [QUESTS.length, PER_PAGE]);

    const nextPage = () => {
        setPage(p => Math.min(p + 1, totalPages - 1))
    };

    const prevPage = () => {
        setPage(p => Math.max(p - 1, 0))
    };

    return (
        <Modal
            isOpened={isModalOpen}
            close={() => setIsModalOpen(false)}
            maxWidth="unset"
            classNames={{
                container: 'w-[1000px] p-4'
            }}
        >
            <div className="flex flex-col gap-4 text-white text-6xl text-center mb-8">
                Задания
            </div>
            <div className="flex flex-col gap-4 min-h-[600px]">
                {
                    paginated.map((quest) => (
                        <Quest quest={quest} key={quest.id} onComplete={() => handleCompleteQuest(quest.id)} completed={isQuestCompleted(quest.id)} />
                    ))
                }
            </div>
            <div className="mt-8 flex justify-between items-center">
                <Button className="text-center justify-center" onClick={() => prevPage()}
                disabled={page <= 0}
                >
                    Назад
                </Button>
                <p className="text-white text-2xl">{page + 1} / {totalPages}</p>
                <Button 
                className="text-center justify-center" onClick={() => nextPage()}
                disabled={page >= totalPages - 1}
                >
                    Вперёд
                </Button>
            </div>
            <div className="mt-8">
                <Button className="w-full text-center justify-center" onClick={() => setIsModalOpen(false)}>
                    Закрыть
                </Button>
            </div>
        </Modal>
    )
}