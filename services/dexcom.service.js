import axios from 'axios';
import { utilsService } from './index';
import FormData from 'form-data'; 

const secret = process.env.SECRET;

export const dexcomService = {
    getDataRange,
    getBloodSugar
};
async function getDataRange(doc, decryptedAccessToken) {
    console.log("hit gdR");
    console.log(decryptedAccessToken);
    try {
        const options = {
            method: 'get',
            url: `${process.env.DEXCOM_API}/v2/users/self/dataRange`,
            headers: { 
                Authorization: `Bearer ${decryptedAccessToken}`
            }
        };
        const result = await axios(options);
        return result.data.egvs;
    } catch (err) {
        // need to refresh token(s)
        if (err.response.status === 401){
            getNewTokens(doc);
        }
    }
};
async function getBloodSugar(decryptedAccessToken, startTime, endTime) {
    try {
        const options = {
            method: 'post',
            url: `${process.env.DEXCOM_API}/v2/users/self/statistics`,
            headers: { 
                Authorization: `Bearer ${decryptedAccessToken}`
            }
        };
        const result = await axios(options);
        console.log(result.data);
        return result.data.mean;
    } catch (err) {
        // need to refresh token(s)
        if (err.response.status === 401){
            getNewTokens(doc);
        }
    }
};
// save to the user - ensure post.save runs again
async function getNewTokens(doc) {
    const decryptedRefreshToken = await utilsService.decryptToken(doc.refresh_token_content, doc.refresh_token_iv);
    console.log("hit gNT");
    console.log(decryptedRefreshToken);
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('client_id', process.env.DEXCOM_CLIENT);
        bodyFormData.append('client_secret', process.env.DEXCOM_SECRET);
        bodyFormData.append('refresh_token', decryptedRefreshToken);
        bodyFormData.append('grant_type', 'refresh_token');
        bodyFormData.append('redirect_uri', process.env.DEXCOM_REDIRECT);
        const options = {
            method: 'post',
            url: process.env.DEXCOM_TOKEN,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'cache-control': 'no-cache',
            },
            data: bodyFormData
        };
        const response = await axios(options);
        console.log("new tokens block");
        console.log(response.data);
        const encryptedTokens = utilsService.encryptTokens(response.data);

        doc.access_token_content = encryptedTokens.accessToken.content;
        doc.access_token_iv = encryptedTokens.accessToken.iv;
        doc.refresh_token_content = encryptedTokens.refreshToken.content;
        doc.refresh_token_iv = encryptedTokens.refreshToken.iv;
        await doc.save();
    } catch (err){
        console.log(err);
    }
    //TODO prevent infinite loops that break their API etc
};