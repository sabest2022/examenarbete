import React from 'react';
import Plans from './Plans';
import OrderList from './OrderList';
import UserList from './UserList';
import Services from '../../pages/Services/Services';
Services

const Admin = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
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
