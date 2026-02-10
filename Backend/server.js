import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import notesRouter from './routes/NotesTaking_Routes.js'

const PORT = process.env.PORT || 3000;
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("There is Error ",err);
})

app.get('/',(req,res) => {
    res.status(200).json({message: "Everything is good"});
})
app.use('/notesapp', notesRouter);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
