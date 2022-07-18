import { apiHandler } from 'helpers/api';
import prisma from 'lib/prisma';

export default apiHandler(handler);

function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getAllCategories(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}

async function getAllCategories(req, res) {

    const userId = req.body.userid
    const [{Category}] = await prisma.User.findMany({
        where: { id: userId },
        select: {
            Category: true
        }
    })
    //console.log(Category)
    if (Category.length > 0) {
        return res.status(200).json(Category)
    } else {
        return res.status(500).json({ message: 'Kayıtlı Kategori Bulunamadı' });
    }

}
