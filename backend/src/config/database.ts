import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async() => {
    try{
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri){
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        await mongoose.connect(mongoUri, {dbName: "Asurion"});
        console.log('MongoDB Connected')
    } catch (err: any){
        console.error('MongoDB Connection error: ', err.message);
        process.exit(1)
    }
}

export default connectDB;