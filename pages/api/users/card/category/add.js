// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client';
import { apiHandler } from 'helpers/api';
import prisma from 'lib/prisma';


export default apiHandler(handler);


function handler(req, res) {

  switch (req.method) {
    case 'POST':
      return addCategoryToDB(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

}

async function addCategoryToDB(req, res) {

  try {
    const CategoryExist = await prisma.Category.findMany({
      where: {
        AND: [
          { name: req.body.name },
          { authorId: req.body.userid }
        ]
      },
    })

    if (CategoryExist.length === 0) {
      const newCategory = await prisma.Category.create({
        data: {
          name: req.body.name,
          authorId: req.body.userid
        },
      });

      return res.status(200).json(newCategory);

    } else {
      return res.status(500).json({ message: 'Aynı İsme Sahip Kategoriniz Zaten Mevcut' })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json(e)
    }
  }
}