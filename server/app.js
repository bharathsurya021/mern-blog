import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import colors from 'colors'
import authRoutes from './routes/authRoutes.js'
import { errorHandler, notFound } from './middleware/errormiddleware.js';

dotenv.config()
connectDB()

const app = express();
app.use(express.json());

//routes
app.use('/api/v1/users', authRoutes)
//middlewares
app.use(errorHandler)
app.use(notFound)

app.get('/', (req, res) => {
	res.send('Hello World from app.js!');
});


export default app;
