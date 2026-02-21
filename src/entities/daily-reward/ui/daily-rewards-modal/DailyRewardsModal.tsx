import { useMemo, type FC } from "react";
import { getDailyRewards, useDailyRewardsStore } from "../../model/daily-reward.store";
import { useShallow } from "zustand/shallow";
import { Modal } from "@/shared/ui/Modal";
import { DailyReward } from "../DailyReward";
import type { IDailyReward } from "../../model/daily-reward.model";
import { Button } from "@/shared/ui/Button/Button";

export const DailyRewardsModal: FC = () => {
    const [isOpenedModal, setIsOpenedModal, currentDay, lastClaimedAt, claimToday] = useDailyRewardsStore(
        useShallow(state => [
            state.isOpenedModal, 
            state.setIsOpenedModal, 
            state.currentDay,
            state.lastClaimedAt,
            state.claimToday
        ])
    )

    const rewards = useMemo(() => getDailyRewards(), [currentDay]);

    const isAvailable = (day: number) => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        return day === currentDay && new Date(lastClaimedAt) <= todayEnd;
    }

    const claimed = (day: number) => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        return (day < currentDay) || (day === currentDay && new Date(lastClaimedAt) > todayEnd);
    }

    const handleClaim = () => {
        const curReward = rewards.find(r => r.day === currentDay);
        if(!curReward || !isAvailable(curReward.day)) return;
        curReward.onClaim();
        claimToday();
        setIsOpenedModal(false);
    }

    return (
        <Modal
        isOpened={isOpenedModal}
        close={() => setIsOpenedModal(false)}
        title="Ежедневные награды"
        classNames={{
            title: 'text-4xl',
            container: 'px-8 gap-12 pb-8'
        }}
        >
            <section
            className="grid grid-cols-7 gap-8"
            >
                {
                    rewards.map(reward => (
                        <DailyReward 
                        dailyReward={reward}
                        available={isAvailable(reward.day)}
                        claimed={claimed(reward.day)}
                        />
                    ))
                }
            </section>
            <Button 
            className="w-full justify-center mt-10 transition-all"
            onClick={handleClaim}
            >
                Получить награду
            </Button>
        </Modal>
    )
}