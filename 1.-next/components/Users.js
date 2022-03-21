import React from 'react';
import Router from 'next/router';

const Users = ({ users }) => {
    console.log('YOOO', users);

    return (
        <ul className='list-group'>
            {
                users.map(user => (
                    <li 
                        key={user.id} 
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        onClick={e => Router.push('/users/[id]', `/users/${user.id}`)}
                    >
                        <div>
                            <h5>{user.first_name} {user.last_name}</h5>
                            <p>Email: {user.email}</p>
                        </div>
                        <img src={user.avatar} alt={user.first_name} style={{borderRadius: '50% '}} />
                    </li>
                ))
            }
        </ul>
    )
};

export default Users