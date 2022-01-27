import axios from 'axios';

import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export const dexcomService = {
    getDataRange
};
const getDataRange = async () => {
    const token = await getToken({ req, secret });
    const result = await axios.get(process.env.DEXCOM_API/v2/users/self/dataRange, 
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
    );
    return result;
};
const refreshTokens = async () => {

};

const encryptTokens = ({access_token, refresh_token}) => {
    const algorithm = 'aes-256-ctr';
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);

    const accessCipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const accessEncrypted = Buffer.concat([accessCipher.update(access_token), accessCipher.final()]);

    const refreshCipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const refreshEncrypted = Buffer.concat([refreshCipher.update(refresh_token), refreshCipher.final()]);

    const accessToken = {
        iv: iv.toString('hex'),
        content: accessEncrypted.toString('hex')
    };
    const refreshToken = {
        iv: iv.toString('hex'),
        content: refreshEncrypted.toString('hex')
    };
};
// after getting new tokens, save them to the user
const saveTokens = () => {

}; 