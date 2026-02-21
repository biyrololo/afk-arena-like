import type { FC } from "react";
import type { ModalProps } from "./Modal.props";
import cn from "classnames";

export const Modal: FC<ModalProps> = ({
    isOpened,
    close,
    title,
    classNames,
    children,
    maxWidth='600px',
    component: Component = 'div',
    ...props
}) => {
    if(!isOpened) return null;
    return (
        <div
        className={cn("absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-100 select-none bg-black/50 gap-6", classNames?.backdrop)}
        onContextMenu={(e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
        }}
        >
            <Component className={cn(`w-[90%] max-h-[95%] bg-zinc-600 p-2 rounded-2xl flex flex-col gap-4`, classNames?.container)}
            style={{
                maxWidth: maxWidth
            }}
            {...props}
            >
                {
                    Boolean(title) && <span className={cn("text-white text-2xl text-center", classNames?.title)}>{title}</span>
                }
                <div>
                    {
                        children
                    }
                </div>
            </Component>
        </div>
    )
}