import mongoose from "mongoose";
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    })


    userSchema.statics.signUp = async function (first_name, last_name, email, password) {
        if(!first_name || !last_name || !email || !password) {
            throw new Error('All fields are required')
        }
        if(!validator.isEmail(email)) {
            throw new Error('Invalid email')
        }
        if(!validator.isStrongPassword(password)) {
            throw new Error('Password must be at least 8 characters long and have at least one lowercase, one uppercase, one number, and one special character')
        }

        const user = new User({first_name, last_name, email, password})
    }

const User = mongoose.model('User', userSchema)

export default User