/* eslint-disable @typescript-eslint/no-empty-function */
import {
    useContext,
    createContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import servicesLogin from '../services/login';
import { getStorage } from '../utils/getStorage';

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    token: '',
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userExists: () => true,
});

interface Props {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const { storageToken, storageUser } = getStorage();

        if (storageToken && storageUser) {
            setUser(storageUser);
            setToken(storageToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await servicesLogin.login(username, password);
        if (!response) return;

        localStorage.setItem('task4-aUser', JSON.stringify(response.foundUser));
        localStorage.setItem('task4-aToken', JSON.stringify(response.token));

        setUser(response.foundUser);
        setToken(response.token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setToken('');
        setIsAuthenticated(false);
        window.localStorage.removeItem('task4-aToken');
        window.localStorage.removeItem('task4-aUser');
    };

    const userExists = (id: number, users: User[]): boolean => {
        const user = users.find((u) => u.id === id);
        if (!user || user.blocked) return false;
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                isAuthenticated,
                logout,
                userExists,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
