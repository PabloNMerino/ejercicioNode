
import express from "express";
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";
import authRouter from "./authentication/route/authRoute";
import userRouter from "./users/route/userRoute";
import productRouter from "./products/route/productRoute";
import categoryRouter from "./categories/route/categoryRoute";
import cartRouter from "./shoppingCart/route/cartRoute";
import addressRouter from "./users/userAddress/route/addressRoute"
config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;


const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);

dbConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


