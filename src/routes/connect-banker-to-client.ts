import express from "express";
import { Banker } from "../entities/banker";
import { Client } from "../entities/client";

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
  const { bankerId, clientId } = req.params;
  const client = await Client.findOne({
    where: {
      id: parseInt(clientId)
    }
  });

  const banker = await Banker.findOne({
    where: {
      id: parseInt(bankerId),
    },
    relations: {
      clients: true,
    }
  });

  if (banker && client) {
    banker.clients = [...banker.clients, client];
    await banker.save();
    return res.json({
      msg: 'banker connected to client',
    });
  } else {
    return res.json({
      msg: 'banker or client not found',
    });
  }
});

export { router as connectBankerToClientRouter };
