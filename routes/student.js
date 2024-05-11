import express from 'express'

const router = express.Router()

import {deleteStudent, editStudent, getStudent, postStudent, singleStudent} from '../controllers/studentControl.js'


router.get('/students', getStudent)
router.post('/student', postStudent)
router.get('/student/:id', singleStudent)
router.delete('/student/:id', deleteStudent)
router.put('/student/:id', editStudent)

// Module.exports = router

export default router
