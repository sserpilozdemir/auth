import { User } from '../models/sequelize.js';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../utils/jwt-helpers.js'
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const newUser = await User.create({
            username,
            password,
            email,
            role
        });
        return res.status(201).json({ message: "User registered and created on db Successfully!", user: newUser });
    } catch (err) {
        console.log("Error creating user:", err);
        res.status(500).json({ message: "Failed to create user!" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.cookies);

        const user = await User.findOne({
            attributes: ['email', 'password'],
            where: { email: email } //find user via email
        });

        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                //token
                let tokens = jwtTokens(user.email, user.password);
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                res.status(201).json({ message: "Login Successful!", tokens: tokens });
            } else {
                res.status(401).json({ message: "Invalid password!" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log("Login Error!", err);
        res.status(500).json({ message: "Login error" });
    }
};

const refreshTokenHandler = (req, res) => {

    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token is required!" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Invalid Refresh Token", error: error });
        }
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
        res.json({ accessToken });
    });
    res.status(500).json({ message: "Getting Error while refresh token!" });
};

export default { registerUser, userLogin, refreshTokenHandler };