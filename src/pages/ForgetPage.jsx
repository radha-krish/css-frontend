import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://css-backend-wvn4.onrender.com/api/user/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                navigate('/reset-password');
            }
        } catch (error) {
            console.error("Error during forgot password", error);
            toast.error("Internal Server Error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition-colors duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
