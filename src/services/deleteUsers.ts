import axios, { AxiosError } from 'axios';
import { config } from '../config';

const url = config.apiBaseUrl;

const deleteUsers = async (token: string, ids: number[]) => {
    try {
        const response = await axios.delete(
            `${url}/users/removeUsers/${ids.join(',')}`,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                params: { ids },
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
    deleteUsers,
};
