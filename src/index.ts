import express from "express";
import { createConnection } from "typeorm";
import { Banker } from "./entities/banker";
import { Client } from "./entities/client";
import { Transaction } from "./entities/transaction";
import { connectBankerToClientRouter } from "./routes/connect-banker-to-client";
import { createBankerRouter } from "./routes/create-banker";
import { createClientRouter } from "./routes/create-client";
import { createTransactionRouter } from "./routes/create-transaction";
import { deleteClientRouter } from "./routes/delete-client";
import { fetchClientsRouter } from "./routes/fetch-client";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: undefined,
      database: 'typeorm',
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    console.log('Connected to Postgres');

    app.use(express.json());

    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientsRouter);

    app.listen(8080, () =>{
      console.log('Now running on port 8080');
    })
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();