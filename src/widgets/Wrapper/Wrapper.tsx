import type { FC } from "react";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { Outlet } from "react-router-dom";

export const Wrapper: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    if(!isLoaded) {
        return <Loader />
    }

    return <Outlet />
}