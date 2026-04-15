import Notes from '../models/NotesTaking_Model.js'

export const createNote = async(req,res) => {
    try{
        const data = req.body;
        if(!data.title || !data.content){
            return res.status(400).json({message: "Title and Content are required"});
        }
        const note = await Notes.create({
            title: data.title,
            content: data.content,
            userId: req.user.uid
        })
        res.status(200).json({
            success: true,
            message: "Note Created",
            note
        })
    }
    catch(err){
        console.log("Error Occured ",err);
        res.status(500).json({
            success: false,
            message: "There was an error"
        })
    }
};

export const getNotes = async(req,res) => {
    try{
        const notes = await Notes.find({
            userId: req.user.uid
        }).sort({createdAt:-1});
        res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const updateNote = async(req,res) => {
    try{
        const updatedData = req.body;
        const update = await Notes.findOneAndUpdate({_id:req.params.id, userId:req.user.uid}, updatedData, {new: true});
        if(!update){
            res.status(404).json({message:"Data not updated"});
        }
        res.status(200).json({
            message:"Data Updated Succesfully",
            update
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const deleteNote = async(req,res) => {
    try{
        const deletedNote = await Notes.findOneAndDelete({_id:req.params.id, userId: req.user.uid});
        if(!deletedNote){
            res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Data Deleted Successfully"});
    }
    catch(err){
        console.log("There is Error");
        res.status(500).json({message: err.message});
    }
}