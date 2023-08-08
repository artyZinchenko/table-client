import axios, { AxiosError } from 'axios';
import { config } from '../config';

const url = config.apiBaseUrl;

const login = async (
    email: string,
    password: string
): Promise<LoginResponse | undefined> => {
    try {
        const response = await axios.post(`${url}/users/login`, {
            email,
            password,
        });

        const { foundUser, token } = response.data;

        return { foundUser, token };
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            window.alert(error.response.data.message);
        }
    }
};

export default {
    login,
};
