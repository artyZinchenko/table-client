import axios, { AxiosError } from 'axios';
import { config } from '../config';

const url = config.apiBaseUrl;

const block = async (token: string, ids: number[]) => {
    try {
        const response = await axios.put(
            `${url}/users/block`,
            { ids },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.message);
            return error.response;
        }
    }
};

export default {
    block,
};
