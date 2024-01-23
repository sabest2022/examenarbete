import React from 'react';
import Plans from './Plans';
import OrderList from './OrderList';
import UserList from './UserList';
import './Admin.css'
// import Services from '../../pages/Services/Services';
// Services

const Admin = () => {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-sections">
                <div>

                    <Plans />
                </div>
                <div>

                    <OrderList />
                </div>
                <div>

                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default Admin;
