import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import logo from './../../assets/images/logo.png'
import bg from './../../assets/images/about-01.jpg';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { FiLogIn } from "react-icons/fi";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../lib/axios';

export default function Login() {
    const [searchParams] = useSearchParams(); 
    const location = useLocation();
    let pathname = searchParams.get("redirectTo") || null;
    
    // Get message from URL search params OR from navigation state
    const searchParamMessage = searchParams.get("message") || null;
    const stateMessage = location.state?.message || null;
    const message = stateMessage || searchParamMessage;
    
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
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
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let goTo;
        setProcessing(true);
        
        try {
            const response = await axios.post('api/v1/users/login', formData);
            if(response.data.status == 'success'){
                localStorage.setItem("user", JSON.stringify(response.data.data.user));
                if(response.data.data.user.role === 'user'){
                    goTo = pathname || '/user/dashboard';
                }
                if(response.data.data.user.role === 'admin'){
                    goTo = pathname || '/admin/dashboard';
                }
                navigate(goTo);
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
                            <h3 className='font-bold text-2xl mb-1 dark:text-white'>Login</h3>
                            <p className='text-sm font-medium leading-[1.6] mb-8 dark:text-white'>Enter your login credentials to continue.</p>
                            
                            {error && (
                                <div className="mb-2 font-medium text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            
                            {message && (
                                <div className="mb-4 p-3 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                                    {message}
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
                                />

                                <InputField
                                    type='password'
                                    label='Password'
                                    name='password'
                                    placeholder="Enter your password"
                                    classNames='mb-4'
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <div className='text-center'>
                                    <Button 
                                        className='w-full'
                                        icon={<FiLogIn />}
                                        iconPosition='right'
                                        type='submit'
                                        isLoading={processing}
                                        disabled={processing}
                                    >
                                        Login
                                    </Button>
                                </div>
                                
                                <p className='inline-block text-sm text-right mt-2'>
                                    <Link to='/forgot-password' className='inline-block ml-1 text-blue-600 dark:text-blue-400'>
                                        Forgot your password?
                                    </Link>
                                </p>
                                
                                <p className='block text-sm mt-2'>
                                    <Link to='/signup' className='inline-block ml-1 text-blue-600 dark:text-blue-400'>
                                        Don't have an Account? Register
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