import React from 'react';
import './Header.css'; // Import your CSS file
import logo from '../../assets/logo.png';
import { useUserContext } from '../../context/UserContext';
import LoginButton from '../Login/Login'
import { GoogleLogout } from 'react-google-login'
// In your component


const Header = () => {
    const { isSignedIn, logout } = useUserContext();

    const onLogoutSuccess = async () => {
        await logout();
        // Handle logout logic here
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>

            <div id="signinbutton">
                {!isSignedIn ? (
                    <LoginButton />
                ) : (
                    <GoogleLogout
                        clientId="your-client-id"
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
                    // style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
                    // You may need to style this button directly or through a custom class
                    />
                )}
            </div>

        </header>
    );
};

export default Header;