import { v4 as uuid } from 'uuid'
import Student from '../models/userData.js'
import mongoose from 'mongoose'

let users = []


// get all users// student
export const getUser = async (req, res) => {

    const students = await Student.find({}).sort({ createdAt: -1 })

    res.status(200).json(students)
}
// create user
export const postUser = async (req, res) => {
    const { name, level, email } = req.body

    // users.push({...user, id:uuid()})
    try {
        const student = await Student.create({ name, level, email })

        res.status(200).json(student)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//get single user

export const singleUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `user doesn't exist` })
    }
    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({ error: `user doesn't exist` })
    }


    res.json(student)
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `user doesn't exist` })
    }

    const student = await Student.findByIdAndDelete({ _id: id })
    if (!student) {
        return res.status(404).json({ error: `user doesn't exist` })
    }
    res.status(200).send('User deleted')
}

export const editUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `user doesn't exist` })
    }

    const student = await Student.findByIdAndUpdate({ _id: id }, { ...req.body })

    if (!student) {
        return res.status(404).json({ error: `user doesn't exist` })
    }
    res.status(200).json(student)
}