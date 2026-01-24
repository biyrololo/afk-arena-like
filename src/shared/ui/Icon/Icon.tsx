import { Icons } from "@/shared/icons";
import type { FC } from "react";

interface Props {
    icon: keyof typeof Icons;
    size?: number;
}

export const Icon: FC<Props> = ({ icon, size = 40 }) => {
    return <img src={Icons[icon]} alt={icon}
    style={{ width: size }}
    />
}
