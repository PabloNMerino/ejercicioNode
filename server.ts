
import express from "express";
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";
import authRouter from "./authentication/route/authRoute";
import userRouter from "./users/route/userRoute";
import productRouter from "./products/route/productRoute";
import categoryRouter from "./categories/route/categoryRoute";
import addressRouter from "./users/userAddress/route/addressRoute";
import orderRouter from "./orders/route/orderRoute";
config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;


const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use("/category", categoryRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);


dbConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


