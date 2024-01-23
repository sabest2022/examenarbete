import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUserForm from './AdminComponent/User/CreateUserform';// Make sure to create this component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // State to track the editing user

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

    // Function to handle when the Edit button is clicked for a user
    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    // Function to close the edit form
    const handleCloseEdit = () => {
        setEditingUser(null);
    };

    // Function to handle user updates
    const handleUpdateUser = async (userId, updatedUserData) => {
        try {
            console.log("handleUpdateUser Triggers");
            const response = await axios.put(`http://localhost:3000/api/users/${userId}`, updatedUserData);
            // Refresh the user list or update the state as needed
            // console.log("Server Response: ", response.data);
            setEditingUser(null); // Close the edit form
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const formatAddress = (address) => {
        return `${address.street}, ${address.city}, ${address.zipcode}`;
    };

    return (
        <div>
            <h2>Manage Users</h2>
            <table className="table-bordered">
                <thead>
                    {/* Table headers */}
                </thead>
                <tbody>
                    {users.map(user => (
                        <React.Fragment key={user._id}>
                            {editingUser && editingUser._id === user._id ? (
                                // Render the EditUserForm inline when editing
                                <tr>
                                    <td colSpan="7">
                                        <CreateUserForm
                                            updateUser={handleUpdateUser}
                                            editingUser={editingUser}
                                            onClose={handleCloseEdit}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                // Normal row display
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><img src={user.imageUrl} alt={user.name} style={{ width: "50px" }} /></td>
                                    <td>{user.telephone}</td>
                                    <td>{user.balance}</td>
                                    <td>{user.deliveryAddress.map(formatAddress).join('; ')}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(user)}>Edit</button>
                                        {/* Assume you have a delete function */}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



//     return (
//         <div>
//             <h2>User List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Image</th>
//                         <th>Password</th>
//                         <th>Telephone</th>
//                         <th>Is Admin</th>
//                         <th>Balance</th>
//                         <th>Delivery Address</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>

//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td><img src={user.imageUrl} alt={user.name} style={{ width: "50px" }} /></td>
//                             <td>{user.password}</td>
//                             <td>{user.telephone}</td>
//                             <td>{user.isAdmin ? 'Yes' : 'No'}</td>
//                             <td>{user.balance}</td>
//                             <td>{user.deliveryAddress.join(', ')}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

export default UserList;
