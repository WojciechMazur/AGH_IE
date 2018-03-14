import path from 'path';

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 8080,
        ip: process.env.IP || '0.0.0.0',
        apiRoot: process.env.API_ROOT || '/api',
    },
    test: {

    },
    development: {
        mongoURL: process.env.DB_URL || 'mongodb://localhost:27017',
        dbName: process.env.DB_NAME || 'ActivityTracker'
    },
    production: {

    }
};

module.exports = Object.assign(config.all, config[config.all.env]);
export default module.exports;