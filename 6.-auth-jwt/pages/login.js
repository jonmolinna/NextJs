import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const initialForm = {
    email: '',
    password: ''
}

const LoginPage = () => {
    const [form, setForm] = useState(initialForm);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/auth/login', form);

        if (res.status === 200) {
            router.push('/dashboard')
        }
        console.log(res.data)
        setForm(initialForm)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder='password'
                    name='password'
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    )
};

export default LoginPage;