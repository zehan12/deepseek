export const ROLES = {
    USER: "user",
    AI: "ai"
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];
