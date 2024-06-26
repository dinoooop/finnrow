import jwt from "jsonwebtoken"
import User from '../models/user.js';
import { vr } from "../helpers/vr.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId).select('-password');
        req.userId = user._id;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// general validation
export const genVal = async (req, res, next) => {
    const val = vr.validate(req.body)
    if (val.allErrorsFalse) {
        next()
    } else {
        res.status(401).json({ errors: val.updatedErrors });
    }
}
