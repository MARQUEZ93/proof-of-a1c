import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
import axios from 'axios';

export const userService = {
    create
};
function create(user) {
    axios.post(`${baseUrl}/users`, user);
}