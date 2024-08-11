import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// Ensure uploads directory exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: { fileSize: 1024 * 1024 * 3 }
})


export const isAdmin = async (req, res, next) => {

    // console.log(req.user)
    
        try {
            const userId = req.user._id; 
            
                // console.log(userId)
            // Check if userId is a valid ObjectId
            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Unathorized user' });
            }
    
            if (!user.isAdmin) {
                return res.status(403).json({ message: 'Only admins can perform this action' });
            }
    
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
}

export default upload;