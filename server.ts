
import express from "express";
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";
import { authRouter, userRouter, productRouter } from "./routes";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;


const app = express();

app.use(express.json());
app.use('/product', productRouter);
app.use("/user", userRouter);
app.use('/auth', authRouter);

dbConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


