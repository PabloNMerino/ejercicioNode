
import express, { Request, Response } from "express";
import usersRouter from './routes/userRoute'
import adminRouter from './routes/adminRoute'

const PORT = 3000;
const HOST = 'localhost';


const app = express();

app.use(express.json());
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


