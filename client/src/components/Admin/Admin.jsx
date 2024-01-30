import Plans from './Plans';
import OrderList from './OrderList';
import UserList from './UserList';
import LoginButton from '../Login/Login';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import './Admin.css'


const Admin = () => {
    const { isSignedIn, logout, currentUser } = useUserContext();

    const onLogoutSuccess = async () => {
        await logout();
        // Add additional logic here if needed
    };

    const getFirstName = (fullName) => {
        const names = fullName.split(' ');
        return names[0]; // Return the first name
    };

    if (!isSignedIn) {
        return <LoginButton />; // Make sure LoginButton is defined or imported
    }

    if (!currentUser.isAdmin) {
        return <div>Access Denied: You must be an admin to view this page.</div>;
    }

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="user-info">
                <Link to="/profile" className="user-profile-link">
                    <img src={currentUser.imageUrl} alt="User Profile" className="user-profile-image" />
                    <span className="profile-hover-text">User Profile</span>
                    <p className="welcome">Welcome, {getFirstName(currentUser.name)}!</p>
                </Link>
                <GoogleLogout
                    clientId="your-client-id"
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                // Styling for logout button if needed
                />
            </div>
            <div className="dashboard-sections">
                <Plans />
                <OrderList />
                <UserList />
            </div>
        </div>
    );
};

export default Admin;
