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
            message: 'No token provided'
        });
    }

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token)
        // console.log(_id)

        if(!_id) {
            return res.status(401).json({
                status: 'error',
                message: 'User Unauthorized'
            });}

        // const _id = id;

        const user = await User.findById({_id});

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized user or Invalid user ID'
            });
        }
        
        
        req.user = user;

         
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            message: err.message === 'jwt expired' ? 'Token Expired' : 'Invalid Token'
        });
    }



}


export default protect;