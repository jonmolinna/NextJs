import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [user, setUser] = useState({
        email: "",
        username: ""
    });

    const router = useRouter();

    const getProfile = async () => {
        const res = await axios.get('/api/profile');
        setUser(res.data)
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push("/login")
        } catch (err) {
            console.log(err)
            router.push("/login")
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {
                    JSON.stringify(user, null, 2)
                }
            </pre>
            <button onClick={() => getProfile()}>
                get profile
            </button>
            <button onClick={() => logout()}>
                Logout
            </button>
        </div>
    )
};

export default Dashboard;