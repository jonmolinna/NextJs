import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-fetch';
import Container from '../../components/Container';

const User = ({ user }) => {
    const router = useRouter();
    const { id } = router.query;
    // console.log(id);
    console.log(user);

    return (
        <Container>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <img src={user.avatar} alt={user.first_name} />
                        </div>
                        <div className='card-body text-center'>
                            <h3>
                                { user.id }. { user.first_name } { user.last_name }
                            </h3>
                            <p>Email: { user.email }</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
};

User.getInitialProps = async (ctx) => {
    // console.log('YOOOO', ctx.query.id);
    const res = await fetch(`https://reqres.in/api/users/${ctx.query.id}`);
    const resJson = await res.json();
    return { user: resJson.data };
};

export default User;