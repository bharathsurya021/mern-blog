import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import colors from 'colors'
const app = express();
dotenv.config()
app.use(express.json());
connectDB()

app.get('/', (req, res) => {
	res.send('Hello World from app.js!');
});


export default app;
