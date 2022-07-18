const { apiHandler } = require("helpers/api");
import generateToken from "functions/generateToken";
import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
export default apiHandler(handler);
// if the request pass jwt verify middleware , token is valid

let refreshTokens = []

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            if (req.body.refreshToken == null) return res.status(401).json({ message: "Refresh Token Required" })
            //  if (!refreshTokens.includes(req.body.refreshtoken)) return res.status(403).end(`Refresh token is required`)
            return jwt.verify(req.body.refreshToken, serverRuntimeConfig.refreshTokenSecret, { algorithm: 'HS256' }, function (err, decoded) {
                if (err) return res.status(403).json(err)

                const { accessToken, refreshToken } = generateToken({ id: req.body.id, email: req.body.email })
                return res.status(200).json(
                    {
                        id: req.body.id,
                        email: req.body.email,
                        accessToken,
                        refreshToken
                    }
                )
            })
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
