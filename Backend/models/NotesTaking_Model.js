import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    timeStamp: {
        type: Date, 
        default: Date.now
    }
})

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;