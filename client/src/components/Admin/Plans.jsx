import React from 'react';
import './tables.css';

import { usePlanContext } from '../../context/PlanContext';

const Plans = () => {
    const { plans } = usePlanContext();

    if (!plans || plans.length === 0) {
        return <div>Loading plans...</div>; // or some other placeholder
    }

    const handleEdit = (planId) => {
        // Implement your edit logic here
        console.log(`Editing plan with ID: ${planId}`);
    };

    const handleDelete = (planId) => {
        // Implement your delete logic here
        console.log(`Deleting plan with ID: ${planId}`);
    };

    const handleAdd = () => {
        // Implement your add logic here
        console.log('Adding new plan');
    };

    const shortenDescription = (description) => {
        // Display only the first 50 characters of the description
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
    };


    return (
        <div className="admin-panel">
            <h2>All Products</h2>
            <button onClick={handleAdd}>Add Product</button>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Responsive</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan._id}>
                            <td>{plan.title}</td>
                            <td>{shortenDescription(plan.description)}</td>
                            <td>{plan.responsive ? 'Yes' : 'No'}</td>
                            <td>{plan.pages}</td>
                            <td>{plan.price} kr</td>
                            <td>
                                <button onClick={() => handleEdit(plan._id)}>Edit</button>
                                <button onClick={() => handleDelete(plan._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default Plans;
