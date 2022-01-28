import axios from 'axios';
import { utilsService } from './index';

const secret = process.env.SECRET;

export const dexcomService = {
    getDataRange
};
async function getDataRange(accessToken) {
    const result = await axios.get(`${process.env.DEXCOM_API}/v2/users/self/dataRange`, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log(result);
    return result;
};
// const refreshTokens = async () => {

// };
// after getting new tokens, save them to the user
// const saveTokens = () => {

// }; 