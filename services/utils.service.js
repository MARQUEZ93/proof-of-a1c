import crypto from 'crypto';

export const utilsService = {
    encryptTokens,
    decryptToken
};
async function encryptTokens ({access_token, refresh_token}) {
    const { algorithm, secretKey, iv } = getCipherArguments();

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
    return {accessToken, refreshToken};
};
async function decryptToken(content, iv){
    const { algorithm, secretKey } = getCipherArguments();
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
};

function getCipherArguments(){
    const algorithm = 'aes-256-ctr';
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);
    return {algorithm, secretKey, iv};
}