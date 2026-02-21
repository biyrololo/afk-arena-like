import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal";
import type { FC, JSX } from "react";
import { useState } from "react";
import { testPromocode } from "../../model/promocodes.store";
import { motion } from "framer-motion";

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

    const handleSubmit = () => {
        if(!code) {
            setMessage("");
            setError("Введите промокод");
            return;
        }
        const promocodeObject = testPromocode(code);
        if(!promocodeObject) {
            setMessage("");
            setError("Промокод не найден");
            return;
        }

        if(new Date() > new Date(promocodeObject.expiresAt)) {
            setMessage("");
            setError("Срок действия промокода истек");
            return;
        }

        setError("");
        setCode("");
        setMessage(promocodeObject.action());
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
            />
            {error && <p className="text-red-500 text-center text-4xl">{error}</p>}
            {message && <p className="text-green-500 text-center text-4xl">{message}</p>}
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