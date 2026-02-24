import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import logo from './../../assets/images/logo.png';
import bg from './../../assets/images/about-01.jpg';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { FiMail } from "react-icons/fi";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

export default function ForgotPassword() {
    const [searchParams] = useSearchParams();
    const message = searchParams.get("message") || null;
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const navigate = useNavigate();

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

        try {
            const response = await axios.post('api/v1/users/forgot-password', formData);
            if (response.data.status === 'success') {
                setSuccess(`A password reset token has been sent to ${email}`);
                setTimeout(() => {
                    navigate('/password-reset', { state: { email } });
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
            <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-20 text-primary">
                    <div className='h-full'>
                        <div className='text-center px-10 flex flex-col justify-center items-center h-full'>
                            <Link to='/' className='flex items-center flex-col'>
                                <img src={logo} alt="" className={`h-16 inline-block`} />
                                <span className='text-white text-3xl'>
                                    WinSubz
                                </span>
                            </Link>

                            <h1 className='text-white text-3xl font-black pt-5'>
                                Trade Crypto & Gift Cards. Buy Airtime & Data — Instantly.
                            </h1>
                            <p className='text-gray-200'>
                                Your all-in-one platform for crypto exchange,
                                gift card trading, VTU top-ups, and cable subscriptions.
                                Fast payouts, fair rates, zero stress.
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
                                Enter your email address and we'll send you a token to reset your password.
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

                            {message && (
                                <div className="mb-4 font-medium text-sm text-blue-600 dark:text-blue-400">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <InputField
                                    type='email'
                                    label='Email'
                                    name='email'
                                    placeholder="Enter your email"
                                    classNames='mb-6'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <div className='text-center'>
                                    <Button
                                        className='w-full'
                                        icon={<FiMail />}
                                        iconPosition='right'
                                        type='submit'
                                        isLoading={processing}
                                        disabled={processing}
                                    >
                                        Send Reset Token
                                    </Button>
                                </div>

                                <div className='text-center mt-4'>
                                    <Link
                                        to='/login'
                                        className='inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline'
                                    >
                                        Back to Login
                                    </Link>
                                </div>

                                <p className='block text-sm text-center mt-4 text-gray-500 dark:text-slate-100'>
                                    Don't have an account?{' '}
                                    <Link to='/signup' className='text-blue-600 dark:text-blue-400 hover:underline'>
                                        Register
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