import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import logo from './../../assets/images/logo.png';
import bg from './../../assets/images/about-01.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FiKey, FiLock } from "react-icons/fi";
import axios from '../../lib/axios';

export default function PasswordReset() {
    const location = useLocation();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Get email from navigation state or default to empty
    const emailFromState = location.state?.email || '';
    
    const [formData, setFormData] = useState({
        email: emailFromState,
        token: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    // Prevent scrolling on desktop
    useEffect(() => {
        if (window.innerWidth >= 768) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError('');
        setSuccess('');
        
        // Validate passwords match
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            setProcessing(false);
            return;
        }
        
        try {
            const response = await axios.post('api/v1/users/reset-password', formData);
            if (response.data.status === 'success') {
                setSuccess('Password successfully reset! Redirecting to login...');
                
                // Navigate to login page after a short delay
                setTimeout(() => {
                    navigate('/login', { state: { message: 'Password reset successful. Please login with your new password.' } });
                }, 2500);
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('No response received from the server.');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            {/* Left hand content Start */}
            <div className="hidden md:block bg-cover bg-center" style={{backgroundImage: `url(${bg})`}}>
                <div className="h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-20 text-primary">
                    <div className='h-full'>
                        <div className='text-center px-10 flex flex-col justify-center items-center h-full'>
                            <Link to='/' className='flex items-center flex-col'>
                                <img src={logo} alt="" className={`h-16 inline-block`} />
                                <span className='text-white text-3xl'>
                                    VICO EXCHANGE
                                </span>
                            </Link>
                           
                            <h1 className='text-white text-3xl font-black pt-5'>
                                Sell Gift Cards & Crypto with ease
                            </h1>
                            <p className='text-gray-200'>
                                Welcome to Vico Exchange – Buy and sell gift cards and cryptocurrency with ease Fast,
                                secure transactions and great rates. Start trading today
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Left hand content End */}

            {/* Right Hand Content Start */}
            <div className="md:fixed right-0 top-0 w-full md:w-1/2 h-screen overflow-y-auto bg-[rgb(244,244,244)] dark:bg-slate-950">
                <div className="min-h-full flex items-center justify-center px-4 py-10">
                    <div className="w-full md:max-w-md mx-auto">
                        <div className='lg:hidden text-center'>
                            <Link to='/'>
                                <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                            </Link>
                        </div>

                        <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg'>
                            <h3 className='font-bold text-2xl mb-1 dark:text-white'>Reset Password</h3>
                            <p className='text-sm font-medium leading-[1.6] mb-8 dark:text-white'>
                                Enter the token sent to your email and your new password.
                            </p>
                            
                            {error && (
                                <div className="mb-4 font-medium text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            
                            {success && (
                                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                                    {success}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    type='email'
                                    label='Email'
                                    name='email'
                                    placeholder="Enter your email"
                                    classNames='mb-4'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={!!emailFromState}
                                />

                                <InputField
                                    type='text'
                                    label='Reset Token'
                                    name='token'
                                    placeholder="Enter the token from your email"
                                    classNames='mb-4'
                                    value={formData.token}
                                    onChange={handleChange}
                                    required
                                    icon={<FiKey />}
                                />

                                <InputField
                                    type='password'
                                    label='New Password'
                                    name='password'
                                    placeholder="Enter your new password"
                                    classNames='mb-4'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    icon={<FiLock />}
                                />

                                <InputField
                                    type='password'
                                    label='Confirm New Password'
                                    name='password_confirmation'
                                    placeholder="Confirm your new password"
                                    classNames='mb-6'
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    icon={<FiLock />}
                                />

                                <div className='text-center'>
                                    <Button 
                                        className='w-full'
                                        icon={<FiKey />}
                                        iconPosition='right'
                                        type='submit'
                                        isLoading={processing}
                                        disabled={processing}
                                    >
                                        Reset Password
                                    </Button>
                                </div>
                                
                                <div className='text-center mt-4'>
                                    <Link 
                                        to='/forgot-password' 
                                        className='inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline'
                                    >
                                        Request a new token
                                    </Link>
                                </div>
                                
                                <p className='block text-sm text-center mt-4 text-gray-500 dark:text-slate-100'>
                                    Remember your password?{' '}
                                    <Link to='/login' className='text-blue-600 dark:text-blue-400 hover:underline'>
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Content End */}
        </>
    );
}