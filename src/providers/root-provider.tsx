"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react"

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (<>
        <ClerkProvider>
            {children}
        </ClerkProvider>
    </>)
}