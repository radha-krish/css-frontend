import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("https://css-backend-wvn4.onrender.com/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, remember }),
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                localStorage.setItem("admin-token", data.token);
                navigate("/admin");
            }
        } catch (error) {
            console.error("Error during login", error);
            toast.error("Internal Server Error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("https://css-backend-wvn4.onrender.com/api/user/send-otp", {
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
                setShowResetForm(true);
                setEmailError('');
            }
        } catch (error) {
            console.error("Error during forgot password", error);
            toast.error("Internal Server Error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        // Validate OTP
        if (otp.length !== 6 || isNaN(otp)) {
            setOtpError('OTP must be exactly 6 digits.');
            return;
        }

        // Validate new password
        if (!newPassword) {
            toast.error('New password is required.');
            return;
        }

        // Password validation rules
        const passwordLengthValid = newPassword.length >= 8;
        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(newPassword);

        if (!passwordLengthValid) {
            toast.error('New password must be at least 8 characters long.');
            return;
        }
        if (!hasUppercase) {
            toast.error('New password must contain at least one uppercase letter.');
            return;
        }
        if (!hasLowercase) {
            toast.error('New password must contain at least one lowercase letter.');
            return;
        }
        if (!hasNumber) {
            toast.error('New password must contain at least one number.');
            return;
        }
        if (!hasSpecialChar) {
            toast.error('New password must contain at least one special character.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("https://css-backend-wvn4.onrender.com/api/user/verify-otp-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                setShowForgotPassword(false);
                setShowResetForm(false);
                navigate('/admin/login');
            }
        } catch (error) {
            console.error("Error during password reset", error);
            toast.error("Internal Server Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 md:rounded-lg md:shadow-lg w-full max-w-md lg:max-w-4xl flex flex-col lg:flex-row relative">
                {/* Image Section */}
                <div className="md:block md:w-1/2">
                    <img 
                        src="https://sales.webtel.in/images/Login-page-character1.png" 
                        alt="Login Illustration"
                        className="object-cover w-full h-full rounded-l-lg"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <div className="flex items-center border rounded-lg shadow-sm">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="p-3 flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {passwordVisible ? (
                                        <AiFillEyeInvisible className="text-gray-500" />
                                    ) : (
                                        <AiFillEye className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <label className="ml-2 text-gray-700 text-sm">Remember me</label>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(true)}
                                    className={`text-sm text-gray-800 hover:underline ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={isLoading}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-gray-700 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? <ClipLoader size={24} color="#ffffff" /> : 'Login'}
                        </button>
                    </form>
                </div>

                {/* Forgot Password Popup */}
                {showForgotPassword && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
                            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleForgotPassword();
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                    />
                                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full bg-gray-700 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <ClipLoader size={24} color="#ffffff" /> : 'Send OTP'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reset Password Popup */}
                {showResetForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
                            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleResetPassword();
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter OTP"
                                        maxLength="6"
                                        disabled={isLoading}
                                    />
                                    {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter new password"
                                        disabled={isLoading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full bg-gray-700 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <ClipLoader size={24} color="#ffffff" /> : 'Reset Password'}
                                </button>
                                <button
                                    type="button"
                                    onClick={function (){setShowResetForm(false)
                                        setShowForgotPassword(false);
                                    }}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
