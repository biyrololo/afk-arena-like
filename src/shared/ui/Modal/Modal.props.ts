export interface ModalProps extends React.PropsWithChildren {
    isOpened: boolean;
    close: () => void;
    title?: string
    classNames?: {
        backdrop?: string;
        container?: string;
    }
}