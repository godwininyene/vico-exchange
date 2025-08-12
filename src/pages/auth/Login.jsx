import { useEffect } from 'react';
import InputField from '../../components/InputField';
import logo from './../../assets/images/logo.png'
import bg from './../../assets/images/about-01.jpg';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { FiLogIn } from "react-icons/fi";

export default function Login({ status, }) {

    // Prevent scrolling on desktop
    useEffect(() => {
        if (window.innerWidth >= 768) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>

            {/* Left hand content Start */}
            <div className=" hidden md:block bg-cover bg-center"  style={{backgroundImage: `url(${bg})`}}>
                <div className="h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-20 text-primary">
                    <div className='h-full '>
                        <div className='text-center px-10 flex flex-col justify-center items-center h-full'>
                            <Link to='/' className='flex items-center flex-col'>
                                <img src={logo} alt="" className={`h-16  inline-block`} />
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
                    <div className="w-full md:max-w-md mx-auto ">
                        <div className='lg:hidden text-center'>
                            <Link to='/'>
                                <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                            </Link>
                            
                        </div>


                        <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800   rounded-lg shadow-lg'>
                            <h3 className='font-bold text-2xl mb-1 dark:text-white'>Login</h3>
                            <p className='text-sm font-medium leading-[1.6] mb-8 dark:text-white'>Enter your login credentials to continue.</p>
                            {status && <div className="mb-7 font-medium text-sm text-green-600">{status}</div>}
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    type='email'
                                    label='Email'
                                    placeholder="Enter your email"
                                    classNames='mb-4'
                                />

                                <InputField
                                    type='password'
                                    label='Password'
                                    placeholder="Enter your password"
                                    classNames='mb-4'
                                />

                                <div className='text-center'>
                                    <Button 
                                        className='w-full'
                                        icon={<FiLogIn />}
                                        iconPosition='right'
                                        type='submit'
                                    >
                                        Login
                                    </Button>
                                </div>
                                <p className='inline-block text-sm text-right mt-2'>
                                        <Link to='' className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Forgot your password?</Link>
                                </p>
                                <p className='block text-sm  mt-2'>
                                    <Link to='/signup' className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Don't have and Account? Register</Link>
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