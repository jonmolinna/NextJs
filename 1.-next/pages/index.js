import React from 'react';
import Head from 'next/head';
import Container from '../components/Container';
import fetch from 'isomorphic-fetch';
import Users from '../components/Users';

const Index = ({ users }) => {
   
    return (
        <Container>
            <Head>
                <title>Home</title>
            </Head>
            <h1>Nest Js</h1>
            <Users users={users} />
        </Container>
    )
};

Index.getInitialProps = async (ctx) => {
    const res = await fetch('https://reqres.in/api/users');
    const resJson = await res.json();
    // console.log(data);
    return { users: resJson.data };
};

export default Index;