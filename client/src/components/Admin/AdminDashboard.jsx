import React from 'react';
import ProductList from './ProductList';
import OrderList from './OrderList';
import UserList from './UserList';
import './AdminDashboard.css'; // Make sure to create a corresponding CSS file

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-sections">
                <ProductList />
                <OrderList />
                <UserList />
            </div>
        </div>
    );
};

export default AdminDashboard;
