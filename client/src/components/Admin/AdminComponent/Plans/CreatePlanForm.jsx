import React, { useState, useEffect } from 'react';
import './CreatePlanForm.css';
const CreatePlanForm = ({ createPlan, updatePlan, editingPlan, onClose }) => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        responsive: false,
        pages: '',
        price: ''
    });

    useEffect(() => {
        if (editingPlan) {
            setFormState({
                title: editingPlan.title,
                description: editingPlan.description,
                responsive: editingPlan.responsive,
                pages: editingPlan.pages,
                price: editingPlan.price
            });
        } else {
            setFormState({ title: '', description: '', responsive: false, pages: '', price: '' }); // Reset for new plan
        }
    }, [editingPlan]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPlan) {
                await updatePlan(editingPlan._id, formState);
            } else {
                await createPlan(formState);
            }
            onClose(); // Close form and reset state in parent component
        } catch (error) {
            console.error(`Error ${editingPlan ? 'updating' : 'creating'} plan:`, error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='create-plan-form'>
            <label>
                Title <input type="text" name="title" value={formState.title} onChange={handleInputChange} placeholder="Title" />
            </label> <label> description
                <textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Description" />
            </label>
            <label>
                Responsive
                <input type="checkbox" name="responsive" checked={formState.responsive} onChange={handleInputChange} />
            </label> <lable> pages
                <input type="number" name="pages" value={formState.pages} onChange={handleInputChange} placeholder="Number of Pages" />
            </lable>
            <label> Price
                <input type="number" name="price" value={formState.price} onChange={handleInputChange} placeholder="Price" />
            </label>

            <button type="submit">{editingPlan ? 'Update Plan' : 'Create Plan'}</button>
        </form>
    );
};

export default CreatePlanForm;
