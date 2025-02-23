import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import config from '../config';
const EventRegister = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        team_name: '',
        member_names: ['', '', '', ''],
        course_year: ['', '', '', ''],
        contact_no: ['', '', '', ''],
        additional_doc_drivelink: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchActiveEvent = async () => {
            try {
                const response = await axios.get(`${config.Backend_Api}/api/events/all/`);
                const activeEvent = response.data.find(event => event.status === 'active');
                if (!activeEvent) {
                    toast.error('No active events found. Stay tuned for upcoming events!');
                    navigate('/');
                    return;
                }
                setEvent(activeEvent);
            } catch (error) {
                toast.error('Error fetching event details');
            } finally {
                setLoading(false);
            }
        };

        fetchActiveEvent();
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (['member_names', 'course_year', 'contact_no'].includes(name)) {
            const updatedArray = [...formData[name]];
            updatedArray[index] = value;
            setFormData({ ...formData, [name]: updatedArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post(`${config.Backend_Api}/api/events/register/`, formData);
            if (response.data.created) {
                toast.success(`Registration successful! Your registration ID is ${response.data.registration_id}`);
                // Store registration flag in localStorage
                localStorage.setItem('registrationDone', 'true');
                // Clear form after successful registration
                setFormData({
                    email: '',
                    team_name: '',
                    member_names: ['', '', '', ''],
                    course_year: ['', '', '', ''],
                    contact_no: ['', '', '', ''],
                    additional_doc_drivelink: ''
                });
                // Redirect to home page
                navigate('/');
            } else {
                toast.error('This email is already registered for the event');
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Add check for existing registration
    useEffect(() => {
        const registrationDone = localStorage.getItem('registrationDone');
        if (registrationDone === 'true') {
            toast.error('You have already registered for this event');
            navigate('/');
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-blue-600"
                >
                    <FaSpinner className="w-16 h-16" />
                </motion.div>
            </div>
        );
    }

    if (!event) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8">
                    <ol className="flex space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                        <li>/</li>
                        <li className="text-blue-600 dark:text-blue-400">Event Registration</li>
                    </ol>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        {event.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">{event.description}</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Team Name:</label>
                                <input
                                    type="text"
                                    name="team_name"
                                    value={formData.team_name}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Member {index + 1}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name:</label>
                                            <input
                                                type="text"
                                                name="member_names"
                                                value={formData.member_names[index]}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course & Year:</label>
                                            <input
                                                type="text"
                                                name="course_year"
                                                value={formData.course_year[index]}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number:</label>
                                            <input
                                                type="tel"
                                                name="contact_no"
                                                value={formData.contact_no[index]}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Document Drive Link:</label>
                            <input
                                type="url"
                                name="additional_doc_drivelink"
                                value={formData.additional_doc_drivelink}
                                onChange={(e) => handleInputChange(e)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                        >
                            {submitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <FaSpinner className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EventRegister;
