import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');
    try {
        jwt.verify(token, process.env.SECRET_KEY || 'defaultkey');
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
};