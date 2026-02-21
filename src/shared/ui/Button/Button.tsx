import type { Icons } from "@/shared/icons";
import type { FC } from "react";
import { Icon } from "../Icon/Icon";

import cn from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: keyof typeof Icons;
  endIcon?: keyof typeof Icons;
}

export const Button: FC<ButtonProps> = ({
  startIcon,
  endIcon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        `
        bg-blue-500 cursor-pointer flex items-center gap-4 hover:not-disabled:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded disabled:opacity-50
        `,
        className,
      )}
      {...props}
    >
      {startIcon && <Icon icon={startIcon} />}
      {children}
      {endIcon && <Icon icon={endIcon} />}
    </button>
  );
};
