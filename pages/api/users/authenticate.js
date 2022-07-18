const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from 'helpers/api';
import generateToken from 'functions/generateToken';
import prisma from 'lib/prisma';
import { Prisma } from '@prisma/client';

const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
const users = require('data/users.json');

export default apiHandler(handler);


function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticate() {
        const { email, password } = req.body;

        try {

            const user = await prisma.User.findUnique({
                where: { email: email },
                select: { id: true, email: true, cards: true, password: true },
            });
            if (!user) return res.status(200).json({ isValuesCorrect: false, message: 'Girmiş olduğunuz emaile ait kullanıcı bulunamadı' })
            if (password !== user.password) return res.status(200).json({ message: 'Hatalı Şifre Girdiniz' })


            //if  user exists , email and password are correct then return user obj
            // create a jwt token that is valid for 7 days
            const { accessToken, refreshToken } = generateToken({ id: user.id, email: user.email })
            return res.status(200).json({
                id: user.id,
                email: user.email,
                accessToken,
                refreshToken
            });


        } catch (e) {
            //api error
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // If the email exists in DB, return a message write that the email address is already in use
                //https://www.prisma.io/docs/reference/api-reference/error-reference  err status code examples
                res.status(200).json({ message: e.message })
                /*
                   if (e.code === 'P2002') {
                       return res.status(200).json({ isEmailExist: true, message: "Email already in use" })
                   }
                    */
            }
            throw e
        }

    }
}
