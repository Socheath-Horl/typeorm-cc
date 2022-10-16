import express from "express";
import { Client } from "../entities/client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get('/api/client', async (req, res) => {
  const clients = await createQueryBuilder('client')
    .select('client.first_name')
    .from(Client, 'client')
    .leftJoinAndSelect(
      'client.transactions',
      'transaction'
    )
    .where('client.balance >= :minBalance AND client.balance <= :maxBalance', { minBalance: 10000, maxBalance: 100000 })
    .getMany();

    return res.json(clients);
});

export { router as fetchClientsRouter };
