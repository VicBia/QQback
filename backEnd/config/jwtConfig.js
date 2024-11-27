const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const generateToken = (payload, expiresIn = '3h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
