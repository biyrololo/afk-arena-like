import type { FC } from "react";

export const Image: FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return (
        <img 
        {...props}
        />
    )
}