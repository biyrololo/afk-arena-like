import type { JSX } from "react";

export interface IPromocode {
    expiresAt: string; // ISO 8601 date;
    action: () => string | JSX.Element;
    codeHash: string;
}