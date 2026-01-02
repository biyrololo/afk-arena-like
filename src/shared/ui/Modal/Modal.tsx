import type { FC } from "react";
import type { ModalProps } from "./Modal.props";

export const Modal: FC<ModalProps> = ({
    isOpened,
    close,
    title,
    classNames,
    children
}) => {
    if(!isOpened) return null;
    return (
        <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-100 select-none bg-black/50 gap-6"
        onContextMenu={e => {
            e.stopPropagation();
            e.preventDefault();
        }}>
            <div className="w-[90%] md:max-w-[600px] max-h-[95vh] bg-zinc-600 p-2 rounded-2xl flex flex-col gap-2 2xl:gap-4">
                {
                    Boolean(title) && <span className="text-white text-xl 2xl:text-2xl text-center">{title}</span>
                }
                <div>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}