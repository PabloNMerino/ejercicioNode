
import express from "express";
import productsRouter from './routes/productRoute'
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;


const app = express();

app.use(express.json());
app.use('/product', productsRouter);

dbConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


