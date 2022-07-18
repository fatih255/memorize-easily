import getConfig from 'next/config';
import jwt from "jsonwebtoken";
const { serverRuntimeConfig } = getConfig();
export default function (payload) {

    const expAccessToken = "30m";
    const expRefreshToken = "7d";

    const accessToken = jwt.sign(payload, serverRuntimeConfig.accessTokenSecret, { algorithm: 'HS256', expiresIn: expAccessToken })
    const refreshToken = jwt.sign(payload, serverRuntimeConfig.refreshTokenSecret, { algorithm: 'HS256', expiresIn: expRefreshToken });

    return { accessToken, refreshToken }
}