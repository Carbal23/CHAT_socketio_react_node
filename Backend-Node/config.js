const config = {
    dbUrl: process.env.DB_URL || "mongodb+srv://mcarbal:mau12345@merntask.od9i5gv.mongodb.net/Telegram",
    port: process.env.PORT || 4000,
    host: process.env.HOST || "http://localhost",
    publicRoute: process.env.PUBLIC_ROUTE || "/app",
    filesRoute: process.env.FILES_ROUTE || "files",
     
};

module.exports = config;