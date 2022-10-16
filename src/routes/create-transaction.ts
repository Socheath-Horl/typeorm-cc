import express from "express";
import { Client } from "../entities/client";
import { Transaction, TransactionType } from "../entities/transaction";

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } =req.body;
  const client = await Client.findOne({
    where: {
      id: parseInt(clientId),
    },
    relations: {
      transactions: true,
    }
  });

  if (!client) {
    return res.json({
      msg: 'client not found',
    });
  }

  const transaction = await Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionType.DEPOSIT) {
    client.balance = Number(client.balance) + parseFloat(amount);
    client.transactions = [...(client.transactions), transaction];
  } else if (type === TransactionType.WITHDRAW) {
    client.balance = Number(client.balance) - parseFloat(amount);
    client.transactions = [...(client.transactions), transaction];
  }

  await client.save();

  return res.json(client);
});

export { router as createTransactionRouter };
