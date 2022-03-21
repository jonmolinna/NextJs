import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

const Container = (props) => {
    return (
        <div>
            <Head>
                <title>Next js Project</title>
                {/* Bootstrap */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
            </Head>
            <Navigation />
            <div className='container p-4'>
                { props.children }
            </div>
        </div>
    )
};

export default Container;