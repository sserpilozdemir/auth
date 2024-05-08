import { User } from '../models/sequelize.js';
import { authenticateUser, generateTokens, verifyRefreshToken } from '../services/authService.js';


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

    try {
        const user = await authenticateUser(req.body.email, req.body.password);
        const tokens = generateTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.status(201).json({ message: 'Login Successful!', tokens });
    } catch (err) {
        console.log("2 THIS IS ERR: ", err)
        res.status(500).json({ message: err.message })
    }
};

const refreshTokenHandler = async (req, res) => {
    try {
        const user = await verifyRefreshToken(req.body.refreshToken);
        const tokens = generateTokens(user);
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ message: 'Invalid Refresh Token' });
    }
};

export default { registerUser, userLogin, refreshTokenHandler };