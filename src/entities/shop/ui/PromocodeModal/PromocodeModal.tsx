import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal";
import type { FC, JSX } from "react";
import { useState } from "react";
import { testPromocode } from "../../model/promocodes.store";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useShallow } from "zustand/shallow";

interface PromocodeModalProps {
    isOpened: boolean;
    close: () => void;
}

export const PromocodeModal: FC<PromocodeModalProps> = ({
    isOpened,
    close,
}) => {
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string | JSX.Element>("");
    const [code, setCode] = useState<string>("");
    const [usedPromocodes, addUsedPromocode] = usePlayerStore(useShallow(state => [
        state.usedPromocodes,
        state.addUsedPromocode
    ]))

    const handleSubmit = () => {
        if (!code) {
            setMessage("");
            setError("Введите промокод");
            return;
        }
        if (usedPromocodes.includes(code)) {
            setMessage("");
            setError("Промокод уже использован");
            return;
        }
        const promocodeObject = testPromocode(code);
        if (!promocodeObject) {
            setMessage("");
            setError("Промокод не найден");
            return;
        }

        if (new Date() > new Date(promocodeObject.expiresAt)) {
            setMessage("");
            setError("Срок действия промокода истек");
            return;
        }

        setError("");
        setCode("");
        setMessage(promocodeObject.action());
        addUsedPromocode(code);
    };

    return (
        <Modal
            isOpened={isOpened}
            close={close}
            maxWidth="50%"
            component={motion.div}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
        >
            <h2 className="text-6xl text-center text-white mt-4">
                Ввод промокода
            </h2>
            <input
                className="mt-10 w-1/2 text-4xl p-3 mx-auto flex text-white bg-black border-2 border-white rounded-md"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={50}
                tabIndex={-1}
                placeholder="Промокод..."
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                onContextMenu={e => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            />
            {error && <p className="text-red-500 text-center text-4xl">{error}</p>}
            {message && <p className="text-green-500 text-center text-4xl">{message}</p>}
            {/* <div className="text-white text-3xl text-center flex flex-col items-center justify-center gap-1 mt-6">
                <span>Промокоды можно найти в</span>
                <span className="text-green-500 cursor-pointer text-2xl"
                    onClick={e => {
                        e.preventDefault();
                        window.open(import.meta.env.VITE_TG_LINK, "_blank")
                    }}
                    onContextMenu={e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >Нашем сообществе</span>
            </div> */}
            <Button
                className="w-1/2 text-4xl justify-center mt-10 mx-auto mb-4"
                onClick={handleSubmit}
            >
                Применить
            </Button>
            <Button
                className="w-1/2 text-4xl justify-center mt-4 mx-auto mb-4"
                onClick={close}
            >
                Закрыть
            </Button>
        </Modal>
    )
}