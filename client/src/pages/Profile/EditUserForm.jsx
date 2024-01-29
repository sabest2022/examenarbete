import React, { useState, useEffect } from 'react';
import './EditUserForm.css';

const EditUserForm = ({ updateUser, editingUser, onClose }) => {
    const initialFormState = {
        name: '',
        email: '',
        imageUrl: 'defaultValue', // Assuming this is a default value you might have
        telephone: '',
        isAdmin: false,
        deliveryAddress: {
            street: '',
            city: '',
            zipcode: '',
            country: ''
        }
    };

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        if (editingUser) {
            setFormState({
                ...initialFormState, // Reset to initial form state
                ...editingUser, // Spread editingUser properties
                deliveryAddress: editingUser.deliveryAddress || initialFormState.deliveryAddress // Ensure deliveryAddress is not undefined
            });
        }
    }, [editingUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (Object.keys(initialFormState.deliveryAddress).includes(name)) {
            // Handle nested deliveryAddress fields
            setFormState(prevState => ({
                ...prevState,
                deliveryAddress: {
                    ...prevState.deliveryAddress,
                    [name]: value
                }
            }));
        } else {
            // Handle regular fields
            setFormState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await updateUser(editingUser._id, formState);
            }
            onClose(); // Close form and reset state in parent component
        } catch (error) {
            console.error(`Error updating user:`, error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='create-plan-form'>
            <label>
                Name
                <input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="Name" readOnly />
            </label>

            <label>
                Telephone
                <input type="number" name="telephone" value={formState.telephone} onChange={handleInputChange} placeholder="Telephone" />
            </label>

            <label>
                Street
                <input type="text" name="street" value={formState.deliveryAddress[0]?.street || ''} onChange={handleInputChange} placeholder="Street" />
            </label>
            <label>
                City
                <input type="text" name="city" value={formState.deliveryAddress[0]?.city} onChange={handleInputChange} placeholder="City" />
            </label>
            <label>
                Zipcode
                <input type="text" name="zipcode" value={formState.deliveryAddress[0]?.zipcode} onChange={handleInputChange} placeholder="Zipcode" />
            </label>
            <button type="submit">Update Profile</button>
        </form>

    )
};

export default EditUserForm;
