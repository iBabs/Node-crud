import express from 'express'
import {deleteStudent, editStudent, getStudent, postStudent, singleStudent} from '../controllers/studentControl.js'
import upload, {isAdmin}  from '../middleware/mediaUpload.js'
import protect from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/students', getStudent)
router.post('/student',protect,isAdmin,upload.single('profile'),postStudent)
router.get('/student/:id', singleStudent)
router.delete('/student/:id', protect,isAdmin,deleteStudent)
router.put('/student/:id', editStudent)

// Module.exports = router

export default router
