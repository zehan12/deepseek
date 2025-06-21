// hooks/useAuth.ts
import { useUser, useAuth, useClerk } from "@clerk/nextjs";
import { useMemo } from "react";

export const useClerkAuth = () => {
    const { openSignIn } = useClerk();
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken, signOut } = useAuth();

    return useMemo(() => ({
        isSignedIn,
        isLoaded,
        user,
        signOut,
        getToken,
        openSignIn,
        userId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName || user?.username || "Guest",
        profileImage: user?.imageUrl
    }), [user, isSignedIn, isLoaded, signOut, getToken, openSignIn]);
};
