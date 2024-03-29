import { expressjwt } from "express-jwt";
const util = require('util');
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.accessTokenSecret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/token',
            '/api/users/register'
        ]
    });
    return util.promisify(middleware)(req, res);
}