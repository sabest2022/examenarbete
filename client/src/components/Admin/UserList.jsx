import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Telephone</th>
                        <th>Is Admin</th>
                        <th>Balance</th>
                        <th>Delivery Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><img src={user.imageUrl} alt={user.name} style={{ width: "50px" }} /></td>
                            <td>{user.telephone}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>{user.balance}</td>
                            <td>{user.deliveryAddress.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default UserList;
