import { verify } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function logoutHanlder(req, res) {
    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ error: 'no token' })
    }

    try {
        verify(myTokenName, 'SECRET');
        const serialized = serialize('myTokenName', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });

        res.setHeader('Set-Cookie', serialized);
        res.status(200).json('Logout successfully');
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
    }
};