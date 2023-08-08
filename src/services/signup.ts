import axios, { AxiosError } from 'axios';
import { config } from '../config';

const url = config.apiBaseUrl;

const signup = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${url}/users/addUser`, {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            window.alert(error.response.data.message);
        }
    }
};

export default {
    signup,
};
