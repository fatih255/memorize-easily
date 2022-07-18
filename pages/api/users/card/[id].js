import { groupBy } from 'functions/utils';
import { apiHandler } from 'helpers/api';
import prisma from 'lib/prisma';

export default apiHandler(handler);

function handler(req, res) {

    switch (req.method) {
        case 'DELETE':
            return removeCard(req, res);
        case 'PUT':
            return updateCard(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}

async function removeCard(req, res) {

    const { id } = req.query
    const isRemoved = await prisma.Card.delete({
        where: { id: parseInt(id) },
    })

    console.log(isRemoved)
    if (isRemoved) {
        return res.status(200).json(isRemoved)
    } else {
        return res.status(500).json({ message: 'Kart Silinirken Bir Sorun Oluştu' });
    }

}


async function updateCard(req, res) {

    const { id } = req.query;
    const { categoryId, front_text, back_text } = req.body;

    const isUpdated = await prisma.Card.update({
        where: { id: parseInt(id) },
        data: {
            categoryId: categoryId,
            front_text: front_text,
            back_text: back_text
        },
    })

    console.log(isUpdated)
    if (isUpdated) {
        return res.status(200).json(isUpdated)
    } else {
        return res.status(500).json({ message: 'Kart Silinirken Bir Sorun Oluştu' });
    }

}

