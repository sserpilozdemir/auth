import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/sequelize.js';


const generateTokens = (user) => {
    const accessToken = jwt.sign({
        email: user.email,
        password: user.password
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });

    const refreshToken = jwt.sign({
        email: user.email,
        password: user.password
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
    return { accessToken, refreshToken };
};


const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
};

const authenticateUser = async (email, password) => {
    console.log("I AM HERE!");
    try {
        const user = await User.findOne({
            where: { email }
        });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Authentication failed!');
        }
        return user;
    } catch (err) {
        res.status(500).json({ message: err.message })
    };

}

export { generateTokens, verifyRefreshToken, authenticateUser }