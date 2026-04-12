import { useMemo, type FC } from "react";
import { getDailyRewards, useDailyRewardsStore } from "../../model/daily-reward.store";
import { useShallow } from "zustand/shallow";
import { Modal } from "@/shared/ui/Modal";
import { DailyReward } from "../DailyReward";
import { Button } from "@/shared/ui/Button/Button";
import cn from 'classnames'
import { Gift } from "lucide-react";
import bg from '@/assets/backgrounds/daily-rewards.webp';

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
        if (!curReward || !isAvailable(curReward.day)) {
            setIsOpenedModal(false);
            return;
        };
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
                title: 'text-7xl drop-shadow-[0px_0px_3px_black] text-left',
                container: 'px-16 gap-12 pb-8 pt-10'
            }}
            maxWidth="98%"
            style={{
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#10141f',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
            }}
        >
            <div className="grid grid-cols-6 w-full">
                <section
                    className="grid grid-cols-4 gap-8 col-start-1 col-end-5"
                >
                    {
                        rewards.map(reward => (
                            <DailyReward
                                key={reward.day}
                                dailyReward={reward}
                                available={isAvailable(reward.day)}
                                claimed={claimed(reward.day)}
                                onClick={isAvailable(reward.day) ? handleClaim : undefined}
                                className={reward.day % 7 === 0 ? 'col-start-3 col-end-5' : ''}
                            />
                        ))
                    }
                </section>
                <div className=""></div>
            </div>
            <Button
                className={cn(
                    "w-full justify-center mt-10 transition-all !bg-amber-600 hover:not-disabled:!bg-amber-500 text-4xl flex items-center gap-2",
                    "p-10 text-7xl shadow-2xl shadow-black rounded-xl"
                )}
                onClick={handleClaim}
            >
                Получить награду
                <Gift width={60} height={60} />
            </Button>
        </Modal>
    )
}