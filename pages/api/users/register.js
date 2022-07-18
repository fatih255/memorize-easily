const { apiHandler } = require("helpers/api");
import { Prisma } from "@prisma/client";
import generateToken from "functions/generateToken";
import jwt from "jsonwebtoken";
import prisma from "lib/prisma";
import getConfig from "next/config";



const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);
// if the request pass jwt verify middleware , token is valid

let refreshTokens = []

async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            if (req.body?.password != null && req.body?.password != null) {

                const authHeader = req.headers['authorization']
                const token = authHeader && authHeader.split(' ')[1]
                if (token != null) {
                    //if there is token verify the token, and if its verified ,return message 'You are already logged in'
                    jwt.verify(token, serverRuntimeConfig.accessTokenSecret, (err, user) => {
                        if (!err) {
                            return res.status(200).json({ name: 'You Already Logged In' })
                        }

                    })
                    // if the token does not exist and jwt could not verify the token, generate new tokens and send them all
                } else {
                    //ask db for this email address exist
                    const { email, password } = req.body
                    const getUser = await prisma.User.findUnique({
                        where: {
                            email: email,
                        }
                    })
                    //Email does not exist, membership can be created on this email
                    if (getUser == null) {
                        //Email does not exist, membership can be created on this email
                        try {
                            const newUser = await prisma.user.create({
                                data: {
                                    email: email,
                                    password: password
                                },
                                select: {
                                    id: true,
                                }
                            });
                            const { accessToken, refreshToken } = generateToken({ id: newUser.id, email: email });

                            return res.status(200).json(
                                {
                                    email: req.body.email,
                                    accessToken,
                                    refreshToken
                                })
                        } catch (e) {
                            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                                // If the email exists in DB, return a message write that the email address is already in use
                                //https://www.prisma.io/docs/reference/api-reference/error-reference  err status code examples
                                if (e.code === 'P2002') {
                                    return res.status(200).json({ isEmailExist: true, message: "Email already in use" })
                                }
                            }
                            throw e
                        }
                    } else {
                        //Email already in use, membership cannot be created on this email
                        return res.status(200).json({ isEmailExist: true, message: "Email already in use" })
                    }
                }
            } else {
                return res.status(200).json({ message: "Tüm alanlar zorunludur" })
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
