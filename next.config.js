module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: 'MAUlAvDioj2IXrM3gNnI6g1y3ttiSI1ci2CAk8mLaem='
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://www.proofofa1c.com/api' // production api
    }
}