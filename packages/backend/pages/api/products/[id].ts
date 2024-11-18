// pages/api/products/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const productId = parseInt(id as string);

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
      }
      break;
    case 'PUT':
      try {
        const { name, description, price } = req.body;
        if (!name || price === undefined) {
          return res.status(400).json({ error: 'Name and price are required' });
        }
        const updatedProduct = await prisma.product.update({
          where: { id: productId },
          data: {
            name,
            description,
            price,
          },
        });
        res.status(200).json(updatedProduct);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          res.status(404).json({ error: 'Product not found' });
        } else {
          res.status(500).json({ error: 'Failed to update product' });
        }
      }
      break;
    case 'DELETE':
      try {
        await prisma.product.delete({
          where: { id: productId },
        });
        res.status(204).end();
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          res.status(404).json({ error: 'Product not found' });
        } else {
          res.status(500).json({ error: 'Failed to delete product' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
