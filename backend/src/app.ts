import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import connectDB from './config/database'
import userRoutes from './routes/userRoutes'
import deviceRoutes from './routes/deviceRoutes'
import dotenv from 'dotenv'


dotenv.config()
const app = express()

// Middleware setup
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())

// MongoDB Connection
connectDB()

// API Routes
app.use('/users', userRoutes)
app.use('/devices', deviceRoutes)

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send({ message: 'Something went wrong!'})
})

// Ports for localhost
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});