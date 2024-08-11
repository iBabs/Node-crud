import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"
import dotenv from 'dotenv'
import { isAdmin } from "../middleware/mediaUpload.js"

dotenv.config()

const getToken = (_id) => {
    return jwt.sign({ _id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


export const registerUser = async (req, res) => {
    const { first_name, last_name, email, password, isAdmin } = req.body
    try {
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: "Please enter all entries" })
        }
        // check if user exists

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ error: "User already exists" })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            isAdmin
        })

        res.status(201).json({
            name: user.first_name,
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
            token: getToken(user._id)
        })


    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: "Can't create user" })

    }

}


export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                name: user.first_name,
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin,
                token: getToken(user._id)
            })
        } else {
            return res.status(400).json({ error: 'Invalid email or password' })
        }

    } catch (error) {
        res.status(400).json({ error: 'Invalid email or password' })
        console.log(error.message)
    }
}

// generate new token



export const getMe = async (req, res) => {
    try {
        const { _id } = req.user;

        // Correct usage of findById
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const getUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.first_name, email: user.email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
