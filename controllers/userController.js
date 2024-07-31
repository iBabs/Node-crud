import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"
import dotenv from 'dotenv'

dotenv.config()

const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


export const registerUser = async (req, res) => {
    const { first_name, last_name, email, password, isAdmin } = req.body
    try {
        if (!first_name || !last_name || !email || !password) {
            res.status(400).json({ error: "Please enter all entries" })
        }
        // check if user exists

        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({ error: "User already exists" })
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
        res.status(400).json({ error: error.message })
    }

}


export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                name: user.first_name,
                email: user.email,
                id: user._id,
                token: getToken(user._id)
            })
        } else {
            res.status(400).json({ error: 'Invalid email or password' })
        }

    } catch (error) {
        res.status(400).json({ error: 'Invalid email or password' })
        console.log(error.message)
    }
}

// generate new token



export const getMe = async (req, res) => {
    try {
        const { _id } = req.params;

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
        res.json({name: user.first_name,email: user.email});
    }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
}
