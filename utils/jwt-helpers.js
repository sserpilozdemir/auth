import jwt from 'jsonwebtoken';


const jwtTokens = ({ email, password }) => {
    const user = { email, password };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '50m' });
    return ({ accessToken, refreshToken });
};


export { jwtTokens }