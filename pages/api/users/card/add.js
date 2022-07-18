// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client';
import { apiHandler } from 'helpers/api';
import prisma from 'lib/prisma';

export default apiHandler(handler);


function handler(req, res) {

    switch (req.method) {
        case 'POST':
            return addCardToDB(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
//500 inital error reason authorId
async function addCardToDB(req, res) {
console.log(req.body)
    try {
        if (req.body.front_text == '' && req.body.back_text == '') {
            return res.status(500).json({ message: 'Kartınızın Ön ve Arka Yazısı Boş' })
        }
        if (req.body.front_text == '') return res.status(500).json({ message: 'Kartınızın Ön Yazısı Boş' })
        if (req.body.back_text == '') return res.status(500).json({ message: 'Kartınızın Arka Yazısı Boş' })

        const newCard = await prisma.Card.create({
            data: {
                front_text: req.body.front_text,
                back_text: req.body.back_text,
                authorId: req.body.userid,
                categoryId: req.body.categoryId
            }
        });
        return res.status(200).json(newCard);
    } catch (e) {
        return res.status(500).json(e)
    }
}