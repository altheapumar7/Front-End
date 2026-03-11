import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
           
          
const response = await axios.post('http://127.0.0.1/api/register.php', formData);
            console.log("Response from server:", response.data);

            if (response.data.status === "success" || response.data.success) {
                alert("Account Created Successfully!");
                navigate('/login'); 
            } else {
                setMessage(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Axios Error:", error);
            setMessage("Cannot connect to the server. Please check XAMPP or URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold text-[#1e293b] mb-2 text-center">Join ACAD PORTAL</h2>
                <p className="text-gray-500 text-center mb-8">Create your account to get started</p>
                
                {message && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm border border-red-100">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            name="username" 
                            type="text" 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                            placeholder="Enter username" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                            placeholder="Enter email" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-xl transform transition-active active:scale-95 shadow-lg shadow-blue-200`}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;