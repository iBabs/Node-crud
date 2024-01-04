import express from 'express'

const router = express.Router()

import {deleteUser, editUser, getUser, postUser, singleUser} from '../controllers/userControl.js'


router.get('/users', getUser)
router.post('/user', postUser)
router.get('/user/:id', singleUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', editUser)

// Module.exports = router

export default router
