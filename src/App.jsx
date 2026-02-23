import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'

//Base Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

//Layouts
import GuestLayout from './layouts/GuestLayout'
import BaseLayout from './layouts/BaseLayout'
import AuthenticatedLayout from './layouts/AuthenticatedLayout'


//Authentication Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import PasswordReset from './pages/auth/PasswordReset'

//Others
import NotFound from './pages/NotFound';
import Error from './components/Error'
import { requireAuth } from './utils/protect';

//User pages
import UserDashboard from '././pages/users/Dashboard'
import BuyGiftcard from './pages/users/BuyGiftcard'
import SellGiftcard from './pages/users/SellGiftcard'
import BuyCrypto from './pages/users/BuyCrypto'
import BuyData from './pages/users/BuyData'
import BuyAirtime from './pages/users/BuyAirtime'
import BuyElectricity from './pages/users/BuyElectricity'
import BuyCableSubscription from './pages/users/BuyCableSubscription'
import SellCrypto from './pages/users/SellCrypto'
import Transactions from './pages/users/Transactions'
import VtuTransactions from './pages/users/VtuTransactions'
import Profile from './pages/users/Profile'

//Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminTransactions from './pages/admin/Transactions'
import AdminVtuTransactions from './pages/admin/VtuTransactions'
import Users from './pages/admin/Users'
import Giftcards from './pages/admin/Giftcards'
import Coins from './pages/admin/Coins'
import AdminSettings from './pages/admin/Settings'


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {/* Base routes */}
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Home />}/>
        <Route path='about' element={<About />} />
        <Route path='services' element={<Services />} />
        <Route path='contact' element={<Contact />} />
      </Route>

      {/* Authentication routes */}
      <Route path='/' element={<GuestLayout />}>
        <Route path='signup' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/password-reset' element={<PasswordReset />} />
      </Route>


      {/* Authenticated Routes */}
      <Route path="/" element={<AuthenticatedLayout />} errorElement={<Error />}>
        {/* Admin Related Routes */}
        <Route path="admin" loader={async({ request }) => await requireAuth(request, 'admin')}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='transactions' element={<AdminTransactions />} />
          <Route path='vtu-transactions' element={<AdminVtuTransactions/>} />
          <Route path='giftcards' element={<Giftcards />} />
          <Route path='coins' element={<Coins />} />
          <Route path='settings' element={<AdminSettings />} />
        </Route>

        {/* User Related Routes */}
        <Route path="user" loader={({ request }) => requireAuth(request, 'user')}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path='buy-giftcard' element={<BuyGiftcard />} />
          <Route path='sell-giftcard' element={<SellGiftcard />} />
          <Route path='buy-crypto' element={<BuyCrypto />} />
          <Route path='buy-data' element={<BuyData />} />
          <Route path='buy-airtime' element={<BuyAirtime />} />
          <Route path='buy-electricity-token' element={<BuyElectricity />} />
          <Route path='buy-cable-tv' element={<BuyCableSubscription />}/>
          <Route path='sell-crypto' element={<SellCrypto />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='vtu-transactions' element={<VtuTransactions/>}/>
          <Route path='profile' element={<Profile />} />
        </Route>
      </Route>
      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App
