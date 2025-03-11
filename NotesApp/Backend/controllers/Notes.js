import NotesModel from "../models/Notes.js";


const CreateNotes=async(req,res)=>{
    try {
        const userId=req.userId
        const {title}=req.body;
        if(!title){
            return res.status(303).json({success:false,message:"Title are required"})
        }
        const CreateNotes= new NotesModel({
            title,userId:userId
        })
        await CreateNotes.save()
        res.status(200).json({success:true,message:"Notes created Successfully",Notes:CreateNotes})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})

    }
}
const UpdateNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const NotesId = req.params.id;
        const { title, pin } = req.body;

        const FindeNotes = await NotesModel.findById(NotesId);
        console.log('Before Update:', FindeNotes); // ✅ Log before update

        if (!FindeNotes) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        const NotesUserId = FindeNotes.userId.toString();

        if (userId.toString() !== NotesUserId) {
            return res.status(403).json({ success: false, message: "Unauthorized user" });
        }

        let updatedNote;

        if (typeof pin !== "undefined") {  
            await NotesModel.findByIdAndUpdate(NotesId, { pin: !FindeNotes.pin });

            updatedNote = await NotesModel.findById(NotesId);
            console.log('After Pin Update:', updatedNote);

            return res.status(200).json({ success: true, message: "Pin Updated Successfully", updatedNote });
        }

        if (title) {
            await NotesModel.findByIdAndUpdate(NotesId, { title });

            updatedNote = await NotesModel.findById(NotesId);
            console.log("After Title Update:", updatedNote);

            return res.status(200).json({ success: true, message: "Note Updated Successfully", updatedNote });
        }

        return res.status(400).json({ success: false, message: "No update fields provided" });

    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const Delete=async(req,res)=>{
    try {
        const userId=req.userId
        const NotesId=req.params.id
        const FindeNotes=await NotesModel.findById(NotesId)

        if (userId.toString() !== FindeNotes.userId.toString()) {
       return res.status(404).json({success:false,message:"Unauthorized user",})
            
        }
        const Delete=await NotesModel.findByIdAndDelete(NotesId)


              res.status(200).json({success:true,message:"Notes Deleted Successfully",Delete})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})
    }
}

const GetNotesTitle=async(req,res)=>{
    try {
        const title=req.params.title
        
        const Notes = await NotesModel.findOne({ title: title });
        if (!Notes) {
            return res.status(404).json({ success: false, message: "No data found" });
        }
        res.status(200).json({success:true,Notes})
        } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})  
    }
}

const GetNotes=async(req,res)=>{
    try {
        const userId=req.userId
        
        const pinnedNotes = await NotesModel.find({ userId, pin: true });
        const unpinnedNotes = await NotesModel.find({ userId, pin: false });

        const Notes = [...pinnedNotes, ...unpinnedNotes];



        res.status(200).json({success:true,Notes})
        } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})  
    }
}
export {CreateNotes,UpdateNotes,Delete,GetNotes,GetNotesTitle}