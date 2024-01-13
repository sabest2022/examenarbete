import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link>
            {/* Add more links as needed */}
        </nav>
    );
};

export default Navbar;
