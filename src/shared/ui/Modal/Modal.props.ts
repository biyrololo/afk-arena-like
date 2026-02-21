import type { ElementType } from "react";

export type ModalProps = React.PropsWithChildren & {
    isOpened: boolean;
    close: () => void;
    title?: string;
    maxWidth?: string;
    classNames?: {
        backdrop?: string;
        container?: string;
        title?: string;
    };
    component?: ElementType;
} & Record<string, unknown>;
