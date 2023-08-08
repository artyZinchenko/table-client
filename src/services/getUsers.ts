import axios, { AxiosError } from 'axios';
import { config } from '../config';

const url = config.apiBaseUrl;

const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${url}/users/`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
};

export default {
  getUsers,
};
