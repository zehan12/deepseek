"use client";

import { ReactNode } from "react"

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (<>
        {children}
    </>)
}