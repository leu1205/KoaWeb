module.exports = {
    PORT: process.env.PORT || 3000,
    cookieSecret: "123456789",
    mongoDB: {
        koaWeb: "mongodb://localhost:27017/koaWeb"
    },
    session: {
        key: 'login',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        secure: false,
        signed: true
    }
};