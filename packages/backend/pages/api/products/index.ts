// pages/api/products/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;
    case 'POST':
      try {
        const { name, description, price } = req.body;
        if (!name || price === undefined) {
          return res.status(400).json({ error: 'Name and price are required' });
        }
        const newProduct = await prisma.product.create({
          data: {
            name,
            description,
            price,
          },
        });
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
