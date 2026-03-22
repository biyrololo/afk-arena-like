import { Modal } from "@/shared/ui/Modal";
import { useEffect, useMemo, useState, type FC } from "react";
import { motion } from 'framer-motion'
import { DropType, getAllItemsByBannerId, type DropItem } from "@/entities/summon/lib/summon";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { HeroMiniCard } from "@/entities/character/ui/HeroMiniCard/HeroMiniCard";
import { Button } from "@/shared/ui/Button/Button";
import cn from 'classnames';

export interface ContentModalProps {
    isOpened: boolean;
    close: () => void;
    bannerId: string;
}

const PER_PAGE = 9;

export const ContentModal: FC<ContentModalProps> = ({ isOpened, close, bannerId }) => {
    const [page, setPage] = useState(0);

    const items = useMemo(() => {
        return [...getAllItemsByBannerId(bannerId)].sort((a, b) => {
            // 1. Сначала определяем приоритет группы
            const getPriority = (item: DropItem & { featured?: boolean }) => {
                if (item.featured) return 1;
                if (item.type === DropType.CHARACTER) return 2;
                if (item.type === DropType.EQUIPMENT) return 3;
                return 4; // На случай других типов
            };

            const priorityA = getPriority(a);
            const priorityB = getPriority(b);

            // 2. Сравниваем группы
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            // 3. Если группы одинаковые, сортируем по весу (от меньшего к большему)
            return a.weight - b.weight;
        });
    }, [bannerId]);

    useEffect(() => {
        setPage(0);
    }, [isOpened, setPage])

    const paginatedItems = useMemo(() => {
        return items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
    }, [items, page]);

    const isNextPage = useMemo(() => {
        return items.length > (page + 1) * PER_PAGE;
    }, [items, page]);

    const isPrevPage = useMemo(() => {
        return page > 0;
    }, [page]);

    const handleNextPage = () => {
        setPage(page => page + 1);
    };

    const handlePrevPage = () => {
        setPage(page => page - 1);
    };

    return (
        <Modal
            isOpened={isOpened}
            close={close}
            component={motion.div}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            title="Содержимое"
            maxWidth="1600px"
            classNames={{
                title: 'text-4xl mb-4',
                backdrop: 'z-300'
            }}
        >
            <section className="grid grid-cols-3 gap-x-4 gap-y-6 px-4 min-h-[580px] items-start grid-rows-3">
                {
                    paginatedItems.map((item, index) => (
                        <div key={index} className={cn("flex gap-x-12 items-center p-2 rounded-2xl", item.featured && "bg-red-600/60")}>
                            {
                                item.type === DropType.EQUIPMENT ? (
                                    <EquipmentCard withoutAnimation equipment={item.item} size={160} iconSize={100} />
                                ) : (
                                    <HeroMiniCard withoutAnimation character={item.item} size="160px" />
                                )
                            }
                            <p className="text-white text-3xl">
                                Шанс: {Math.ceil(item.weight * 1000) / 10}%
                                {item.featured && <span className="text-yellow-300"><br />повышенный</span>}
                            </p>
                        </div>
                    ))
                }
            </section>
            <div className="flex justify-between items-center mt-16">
                <Button onClick={handlePrevPage} disabled={!isPrevPage}>Назад</Button>
                <p className="text-white text-4xl font-bold">{page + 1} из {Math.ceil(items.length / PER_PAGE)}</p>
                <Button onClick={handleNextPage} disabled={!isNextPage}>Далее</Button>
            </div>
            <Button onClick={close} className="bg-red-500 hover:not-disabled:bg-red-700 w-full mt-8 justify-center">Закрыть</Button>
        </Modal>
    )
};
