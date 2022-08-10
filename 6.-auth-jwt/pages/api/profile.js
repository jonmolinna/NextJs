import { verify } from 'jsonwebtoken';

export default function profileHanlder(req, res) {
    // console.log(req.cookies)
    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ error: 'no token' })
    }

    try {
        const user = verify(myTokenName, 'SECRET');
        return res.json({ email: user.email, username: user.username })
    } catch (error) {
        return res.status(401).json({ error: "Invalid token " })
    }
};