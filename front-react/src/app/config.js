import path from 'path';

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 3000,
        ip: process.env.IP || '0.0.0.0',

        apiRoot: process.env.API_ROOT || '/api',
    },
    test: {

    },
    development: {
        backendPort: process.env.BACKEND_PORT || 8080,
        backendHostname: process.env.BACKEND_HOSTNAME || 'http://localhost',
    },
    production: {

    }
};

export const Config = Object.assign(config.all, config[config.all.env], {backendURL: `${config.development.backendHostname}:${config.development.backendPort}`});

console.log(Config);