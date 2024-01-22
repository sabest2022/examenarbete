import React, { useState } from 'react';
import './tables.css';
import CreatePlanForm from './AdminComponent/Plans/CreatePlanForm';
import { usePlanContext } from '../../context/PlanContext';

const Plans = () => {
    const { plans, createPlan, updatePlan, removePlan } = usePlanContext();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null); // State to track the editing plan

    if (!plans || plans.length === 0) {
        return <div>Loading plans...</div>;
    }

    const handleDelete = async (planId) => {
        await removePlan(planId);
        console.log(`Deleting plan with ID: ${planId}`);
    };

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
        setEditingPlan(null); // Reset editing plan when toggling the form
    };

    const handleEdit = (planId) => {
        const planToEdit = plans.find(plan => plan._id === planId);
        setEditingPlan(planToEdit);
        setShowCreateForm(true);
        console.log(`Editing plan with ID: ${planId}`);
    };

    const shortenDescription = (description) => {
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
    };

    return (
        <div className="admin-panel">
            <div className="form-container">
                {showCreateForm && (
                    <CreatePlanForm
                        createPlan={createPlan}
                        updatePlan={updatePlan}
                        editingPlan={editingPlan}
                        onClose={() => {
                            setEditingPlan(null);
                            setShowCreateForm(false);
                        }}
                    />
                )}
            </div>
            <button onClick={toggleCreateForm}>Add Product</button>
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
