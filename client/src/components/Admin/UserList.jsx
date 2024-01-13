import React from 'react';

const UserList = () => {
    // Placeholder users array
    const users = [
        { id: 1, name: 'User 1', role: 'Customer' },
        { id: 2, name: 'User 2', role: 'Admin' }
        // Add more users here
    ];

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - Role: {user.role}
                        <button>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
