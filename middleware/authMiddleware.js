import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protect = async (req, res, next) => {
    const { authorization } = req.headers;
    

    if (!authorization) {
        return res.status(401).json({ error: "Authorization Token Required" });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No token provided'
        });
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const { _id } = req.params;
        if (id !== _id) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden: You do not have access to this resource'
            });
        }
        req.user = user;

        // console.log(req.user)
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to authenticate token'
        });
    }



}


export default protect;