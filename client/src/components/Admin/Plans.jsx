import React, { useState } from 'react';
import './Tables.css';
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

    };
    const handleEdit = (plan) => {
        setEditingPlan(plan); // Set the entire plan object for editing
        // You don't need to toggle `showCreateForm` because the form will now be inline
    };
    const toggleCreateForm = () => {
        if (showCreateForm) {
            setEditingPlan(null); // Reset editing plan when closing the form
        } else {
            setEditingPlan({}); // Set to an empty object to indicate creating a new plan
        }
        setShowCreateForm(!showCreateForm); // Toggle the visibility of the form
    };

    return (
        <div className="admin-panel">
            <h2>Manage Product</h2>
            <button onClick={toggleCreateForm}>Add Product</button>
            {showCreateForm && !editingPlan._id && (
                <CreatePlanForm
                    createPlan={createPlan}
                    onClose={() => setShowCreateForm(false)}
                />
            )}
            <table className="table-bordered">
                <thead>
                    {/* Table headers */}
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <React.Fragment key={plan._id}>
                            {editingPlan && editingPlan._id === plan._id ? (
                                <tr>
                                    <td colSpan="6">
                                        <CreatePlanForm
                                            updatePlan={updatePlan}
                                            editingPlan={editingPlan}
                                            onClose={() => setEditingPlan(null)}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{plan.title}</td>
                                    {/* Other plan data cells */}
                                    <td>
                                        <button onClick={() => handleEdit(plan)}>Edit</button>
                                        <button onClick={() => handleDelete(plan._id)}>Delete</button>
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

export default Plans;


// const handleEdit = (planId) => {
//     const planToEdit = plans.find(plan => plan._id === planId);
//     setEditingPlan(planToEdit);
//     setShowCreateForm(true);
//     console.log(`Editing plan with ID: ${planId}`);
// };

// const shortenDescription = (description) => {
//     return description.length > 50 ? `${description.substring(0, 50)}...` : description;
// };