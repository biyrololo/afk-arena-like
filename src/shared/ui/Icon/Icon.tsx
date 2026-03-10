import { Icons } from "@/shared/icons";
import type { FC } from "react";

interface Props {
    icon: keyof typeof Icons;
    size?: number;
    dark?: boolean;
    className?: string;
}

export const Icon: FC<Props> = ({ icon, size = 40, dark, className }) => {
    return <img src={Icons[icon]} alt={icon}
    className={className}
    style={{ width: size, filter: dark ? "brightness(0) opacity(0.5)" : "none" }}
    onDragStart={(e) => e.preventDefault()}
    onDragOver={(e) => e.preventDefault()}
    onContextMenu={(e) => e.preventDefault()}
    />
}
