/// <reference types="react-scripts" />

interface User {
    id: number;
    username: string;
    email: string;
    blocked: number;
    lastLogin: string;
    registrationDate: string;
}

interface AuthContextValue {
    user: User | null;
    token: string;
    isAuthenticated: boolean;
    login: (arg0: string, agr1: string) => void;
    logout: () => void;
    userExists: (id: number, users: User[]) => boolean;
}

interface FormatUser {
    id: number;
    username: string;
    email: string;
    blocked: string;
    lastLogin: string;
    registrationDate: string;
}

interface LoginResponse {
    foundUser: User;
    token: string;
}
