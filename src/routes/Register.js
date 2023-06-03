import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const url = new URL('http://localhost:9071/api/v1/user/register');
            url.searchParams.append('first_name', firstName);
            url.searchParams.append('last_name', lastName);
            url.searchParams.append('email', email);
            url.searchParams.append('password', password);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.ok) {
                // Registration successful
                const result = await response.text();
                console.log(result);
                // Redirect to homepage
                navigate('/');
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
