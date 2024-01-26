import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './Contact.css';


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send the data to a server
        // For now, just logging to the console
        console.log(formData);

        const endpoint = 'http://localhost:3000/api/contact'; // Replace with your actual endpoint

        axios.post(endpoint, formData)
            .then(response => {
                console.log(response.data);
                // Handle success, such as showing a success message
                // Reset the form data
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                // Handle errors, such as showing an error message
            });


        // Show a success message or handle the response as needed
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Send</button>
        </form>
    );
};

const Contact = () => {
    return (
        <div className="home">
            <Header />
            <main className="home-content">
                {/* Replaced HomeSection with ContactForm */}
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
