import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    // user:{
    //     Type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'  
    // },
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Student = mongoose.model('Student', userSchema);

export default Student;

