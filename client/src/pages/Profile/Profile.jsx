import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUserForm from '../../components/Admin/AdminComponent/User/CreateUserform';
import './Profile.css';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
        // window.location.href = "your-first-page-url";
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Assuming currentUser has an _id field
                const response = await axios.get(`http://localhost:3000/api/users/username/${currentUser._id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [currentUser._id]);

    // Function to handle user updates
    const handleUpdateUser = async (updatedUserData) => {
        try {
            console.log("handleUpdateUser Triggers");
            const response = await axios.put(`http://localhost:3000/api/users/${currentUser._id}`, updatedUserData);
            setUser(response.data); // Update the user data
            console.log(response.data);
            setEditing(false); // Close the edit form
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {user && (
                editing ? (
                    // Render the EditUserForm when editing
                    <CreateUserForm
                        updateUser={handleUpdateUser}
                        editingUser={user}
                        onClose={() => setEditing(false)}
                    />
                ) : (
                    // Display user information
                    <div className="user-profile-info">
                        <img src={user.imageUrl} alt={user.name} style={{ width: "50px" }} />
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Telephone: {user.telephone}</p>
                        <p>Balance: {user.balance}</p>

                        <button onClick={() => setEditing(true)}>Edit Profile</button>
                        <button className='backHome' onClick={handleBackClick}>Back to Home</button>

                    </div>
                )
            )}
        </div>
    );
};

export default UserProfile;
