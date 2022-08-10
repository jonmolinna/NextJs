import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

export default function loginHandler(req, res) {
    const { email, password } = req.body;

    if (email === 'admin@local.com' && password === 'admin') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email,
            username: 'admin'
        }, 'SECRET');

        const serialized = serialize('myTokenName', token, {
            httpOnly: true, // el navegador no lo va a mostrar ni por consola
            secure: process.env.NODE_ENV === 'production', // if production need SCL
            sameSite: 'strict', // frond y back del mismo dominio || none !== dominio
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/' // ruta donde se va a entregar 
        });

        res.setHeader('Set-Cookie', serialized)

        return res.json('Login success')
    };

    return res.status(401).json({ error: 'Invalid email or password' });
};