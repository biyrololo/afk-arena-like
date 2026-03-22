import { Button } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Modal } from "@/shared/ui/Modal";
import type { FC } from "react";
import { motion } from "framer-motion";

interface ClassesModalProps {
    isOpened: boolean;
    close: () => void;
}

export const ClassesModal: FC<ClassesModalProps> = ({
    isOpened,
    close
}) => {
    return (
        <Modal
            isOpened={isOpened}
            close={close}
            maxWidth="1400px"
            component={motion.div}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div>
                <div className="flex flex-col gap-4 text-white text-6xl text-center mb-8">
                    Роли героев
                </div>
                <div className="grid grid-cols-3 gap-16 w-fit mx-auto">
                    <div className="w-fit">
                        <Icon icon="role_assassin" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl">Ассасин</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="role_warrior" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl">Воин</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="role_tank" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl">Танк</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-4 text-white text-6xl text-center mb-8 mt-16">
                    Фракции
                </div>
                <div className="grid grid-cols-6 gap-x-16 gap-y-8 w-fit mx-auto">
                    <div className="w-fit">
                        <Icon icon="faction_fire" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Орден Феникса</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="faction_ice" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Ледяные Стражи</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="faction_crystal" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Мистики Кристалла</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="faction_nature" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Вечное Равновесие</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="faction_orden" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Орден Рыцарей</p>
                    </div>
                    <div className="w-fit">
                        <Icon icon="faction_corruption" size={140} className="rounded-xl" />
                        <p className="text-center text-white text-2xl max-w-[140px]">Бездна</p>
                    </div>
                </div>
            </div>
            <Button className="w-full justify-center mt-20 text-4xl" onClick={close}>
                Закрыть
            </Button>
        </Modal>
    )
}