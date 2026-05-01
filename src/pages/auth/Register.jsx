import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import logo from './../../assets/images/logo.png'
import bg from './../../assets/images/about-03.jpg';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FiLogIn } from "react-icons/fi";
import axios from '../../lib/axios';
import { toast } from 'react-toastify';

export default function Register() {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const refId = searchParams.get('refid');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        setErrors({})

        try {
            const formData = new FormData(e.target);
            const dataToSend = Object.fromEntries(formData);

            if (refId) {
                dataToSend.referralId = refId;
            }

            const res = await axios.post('api/v1/users/signup', dataToSend);

            if (res.data.status === 'success') {
                toast.success('Account created successfully! You will be redirected shortly');

                localStorage.setItem("user", JSON.stringify(res.data.data.user));

                e.target.reset()

                setTimeout(() => {
                    navigate('/user/dashboard')
                }, 3000)
            }

        } catch (err) {

            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: 'An unexpected error occurred' });
                console.log('Unexpected Error:', err);
            }

            toast.error(err.response?.data?.message || 'Error creating account');
            console.log(err);

        } finally {
            setProcessing(false)
        }
    };


    useEffect(() => {
        if (window.innerWidth >= 768) {
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = '';
            };
        }
    }, []);

    return (
        <>
            {/* Left Content */}
            <div
                className="hidden md:block bg-cover bg-center h-screen fixed left-0 top-0 w-1/2"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] text-primary">
                    <div className='h-full flex flex-col justify-center'>
                        <div className='text-center px-10'>

                            <Link to='/' className='flex items-center flex-col'>
                                <img src={logo} alt="" className={`h-16 inline-block`} />
                                <span className='text-white text-3xl'>
                                    Winsubz
                                </span>
                            </Link>

                            <h1 className='text-white text-3xl font-black pt-5'>
                                Buy Airtime, Data, Pay Bills & Subscribe Cable — Instantly.
                            </h1>

                            <p className='text-gray-200 mt-3'>
                                Your trusted digital platform for fast and reliable
                                airtime top-ups, cheap data bundles, electricity bill
                                payments, and cable TV subscriptions. Secure,
                                affordable and delivered instantly.
                            </p>

                        </div>
                    </div>
                </div>
            </div>


            {/* Right Content */}
            <div className="md:fixed right-0 top-0 w-full md:w-1/2 h-screen overflow-y-auto bg-[rgb(244,244,244)] dark:bg-slate-950">

                <div className="min-h-full flex items-center justify-center px-4 py-10">

                    <div className="w-full md:max-w-md mx-auto">

                        <div className='lg:hidden text-center'>
                            <Link to='/'>
                                <img src={logo} alt="Winsubz Logo" className={`h-16 mb-4 inline-block`} />
                            </Link>
                        </div>


                        <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg'>

                            <h3 className='font-bold text-2xl mb-1 dark:text-white'>
                                Create your account
                            </h3>

                            <p className='text-sm font-medium leading-[1.6] mb-8 dark:text-white'>
                                Enter your personal details to create account.
                            </p>


                            {errors.general &&
                                <div className="mb-7 font-medium text-sm text-red-600">
                                    {errors.general}
                                </div>
                            }


                            <form onSubmit={handleSubmit}>

                                <InputField
                                    label='First Name'
                                    placeholder="Enter your firstname"
                                    name={'firstName'}
                                    error={errors.firstName}
                                />

                                <InputField
                                    label='Last Name'
                                    name={'lastName'}
                                    placeholder="Enter your lastname"
                                    error={errors.lastName}
                                />

                                <InputField
                                    type='email'
                                    label='Email'
                                    name={'email'}
                                    placeholder="Enter your email"
                                    error={errors.email}
                                />

                                <InputField
                                    label='Phone'
                                    name={'phone'}
                                    placeholder="Enter your phone number"
                                    error={errors.phone}
                                />

                                <InputField
                                    type='password'
                                    name={'password'}
                                    label='Password'
                                    placeholder="Enter your password"
                                    error={errors.password}
                                />

                                <InputField
                                    type='password'
                                    name={'passwordConfirm'}
                                    label='Confirm Password'
                                    placeholder="Confirm your password"
                                    error={errors.passwordConfirm}
                                />


                                <div className='text-center mt-4'>
                                    <Button
                                        className='w-full'
                                        icon={<FiLogIn />}
                                        iconPosition='right'
                                        type='submit'
                                        isLoading={processing}
                                        disabled={processing}
                                    >
                                        Create Account
                                    </Button>
                                </div>


                                <p className='text-sm mt-4 text-center dark:text-slate-300'>
                                    Already have an account?{' '}
                                    <Link
                                        to='/login'
                                        className='text-blue-600 dark:text-blue-400'
                                    >
                                        Login here
                                    </Link>
                                </p>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}