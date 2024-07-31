import { v4 as uuid } from 'uuid'
import Student from '../models/studentData.js'
import mongoose from 'mongoose'
import User from '../models/userModel.js'

let users = []


// get all users// student
export const getStudent = async (req, res) => {

    const students = await Student.find({}).sort({ createdAt: -1 })

    res.status(200).json(students)
}
// create Student
export const postStudent = async (req, res) => {
    const { _id } = req.params

    const createdBy = _id

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Picture is required and must be less than 2 MB' });
        }
        const { name, level, email, } = req.body
        if (!createdBy || !mongoose.Types.ObjectId.isValid(createdBy)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await User.findById(createdBy)

        if (!user || !user.isAdmin) {
            console.log(user.isAdmin, user.first_name)
            return res.status(401).json({ error: 'Unauthorized User' })
        }


        const student = await Student.create({
            profile: `uploads/${req.file.filename}`,
            createdBy,
            name,
            level,
            email
        })

        res.status(201).json(student)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//get single Student

export const singleStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }
    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }


    res.json(student)
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }

    const student = await Student.findByIdAndDelete({ _id: id })
    if (!student) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }
    res.status(200).send('Student deleted')
}

export const editStudent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }

    const student = await Student.findByIdAndUpdate({ _id: id }, { ...req.body })

    if (!student) {
        return res.status(404).json({ error: `Student doesn't exist` })
    }
    res.status(200).json(student)
}