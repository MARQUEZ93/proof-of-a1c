import axios from 'axios';
import { utilsService } from './index';

const secret = process.env.SECRET;

export const dexcomService = {
    getDataRange
};
async function getDataRange(doc, decryptedAccessToken) {
    try {
        const result = await axios.get(`${process.env.DEXCOM_API}/v2/users/self/dataRange`, 
            { headers: { Authorization: `Bearer ${decryptedAccessToken}` } }
        );
        console.log(result);
        return result;
    } catch (err) {
        if (err.response.status === 401){
            console.log(doc);
            getNewTokens(doc);
        }
    }
};

async function getNewTokens(doc) {
    const decryptedRefreshToken = utilsService.decryptToken(doc.refresh_token_content, doc.refresh_token_iv);
    console.log(decryptedRefreshToken);
    const result = await axios.post(process.env.DEXCOM_TOKEN, 
        { headers: { Authorization: `Bearer ${accessToken}`, 
        'content-type': 'application/x-www-form-urlencoded', 
        'no-cache': 'no-cache'  } },
        {data: {
            firstName: 'Finn',
            lastName: 'Williams'
          }
        }
    );

    doc.save
    //TODO prevent infinite loops that break their API etc
};
// after getting new tokens, save them to the user
// const saveTokens = () => {

// }; 