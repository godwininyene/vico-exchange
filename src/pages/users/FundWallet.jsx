import { useState, useEffect } from "react";
import { FiCopy, FiZap, FiCheckCircle } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../lib/axios";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import monnify_logo from "./../../assets/images/monnify_logo.svg";
import { BsBank } from "react-icons/bs";

const FundWallet = () => {
    const navigate = useNavigate();
    const [virtualAccount, setVirtualAccount] = useState(null);
    const [loadingAccount, setLoadingAccount] = useState(false);

    // Instant Checkout State
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [amount, setAmount] = useState("");
    const [checkoutError, setCheckoutError] = useState("");
    const [loadingCheckout, setLoadingCheckout] = useState(false);

    // Virtual Account Generation State
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [generatingAccount, setGeneratingAccount] = useState(false);
    const [bvn, setBvn] = useState("");
    const [nin, setNin] = useState("");
    const [backendError, setBackendError] = useState("");

    const fetchVirtualAccount = async () => {
        setLoadingAccount(true);
        try {
            const res = await axios.get("api/v1/virtual-accounts");
            if (res.data.status === "success") {
                setVirtualAccount(res.data.data.account);
            }
        } catch {
            console.log("No virtual account linked yet.");
        } finally {
            setLoadingAccount(false);
        }
    };

    useEffect(() => {
        fetchVirtualAccount();
    }, []);

    const copyAccountNumber = () => {
        if (!virtualAccount?.accountNumber) return;
        navigator.clipboard.writeText(virtualAccount.accountNumber);
        toast.success("Account number copied!");
    };

    const initiateCheckout = async () => {
        if (!amount || Number(amount) <= 0) {
            setCheckoutError("Please enter a valid amount");
            return;
        }

        setLoadingCheckout(true);
        setCheckoutError("");

        try {
            const res = await axios.post("/api/v1/payments/initiate", {
                amount: Number(amount),
            });

            if (res.data.status === "success") {
                window.location.href = res.data.data.checkoutUrl;
            }
        } catch (error) {
            setCheckoutError(
                error.response?.data?.message || "Payment initiation failed"
            );
        } finally {
            setLoadingCheckout(false);
        }
    };

    const generateVirtualAccount = async () => {
        setBackendError("");

        if (!bvn && !nin) {
            setBackendError("Please enter either your BVN or NIN");
            return;
        }

        setGeneratingAccount(true);

        try {
            const payload = {};
            if (bvn) payload.bvn = bvn.trim();
            if (nin) payload.nin = nin.trim();

            const res = await axios.post("api/v1/virtual-accounts", payload);

            if (res.data.status === "success") {
                setVirtualAccount(res.data.data);
                toast.success("Personal bank account created successfully!");
                setShowAccountModal(false);
                setBvn("");
                setNin("");
            }
        } catch (error) {
            const message =
                error.response?.data?.message || "Failed to generate personal account";
            setBackendError(message);
            toast.error(message);
        } finally {
            setGeneratingAccount(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">

            {/* ── Page header */}
            <div className="bg-gradient-to-r from-primary-dark to-primary-light px-4 pt-8 pb-16">
                <div className="container mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <BiArrowBack size={18} /> Back
                    </button>
                    <h1 className="text-2xl font-bold text-white">Add Money to Wallet</h1>
                    <p className="text-white/70 text-sm mt-1">
                        Choose how you want to add money to your VTU wallet.
                    </p>
                </div>
            </div>

            <div className="space-y-6  px-4 -mt-6">
                {/* METHOD 1: INSTANT CHECKOUT (Primary Option) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-primary-light/30 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary-light text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1">
                        <FiZap size={10} /> Fast & No Verification
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        ⚡ Option 1: Instant Checkout
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Add money instantly using normal online checkout. Perfect if you do not want to provide verification details.
                    </p>

                    <ul className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500" /> Supports ATM Cards, Quick Bank Transfer, or USSD
                        </li>
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500" /> <strong>Zero</strong> BVN or NIN required
                        </li>
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500" /> Funds reflect instantly on success
                        </li>
                    </ul>

                    <button
                        onClick={() => setShowCheckoutModal(true)}
                        className="w-full mt-6 bg-primary-dark hover:bg-primary-light text-white font-bold py-3 px-4 rounded-xl shadow transition text-center cursor-pointer"
                    >
                        Pay with Instant Checkout
                    </button>

                    <p className="text-[11px] text-gray-700 dark:text-gray-400 mt-2 text-center">
                        * A standard ₦50 processing fee applies to this payment.
                    </p>
                </div>

                {/* METHOD 2: PERSONAL BANK ACCOUNT */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h2 className="flex items-center gap-1 text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                         <BsBank /> Option 2: Personal Bank Account Number
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {virtualAccount
                            ? "Transfer directly to your personal details below to instantly credit your Winsubz wallet at any time."
                            : "Create a permanent Moniepoint account linked to your wallet. Perfect for quick transfers without needing to open the checkout gateway every time."
                        }
                    </p>

                    {loadingAccount ? (
                        <div className="flex justify-center py-6">
                            <Loader size={6} />
                        </div>
                    ) : virtualAccount ? (
                        /* Alread generated view */
                        <div className="mt-5 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                            <div>
                                <p className="text-xs text-gray-400">Bank Name</p>
                                <p className="font-semibold text-gray-800 dark:text-white">{virtualAccount.bankName}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 mb-1">Account Number</p>
                                <div className="flex items-center justify-between bg-white dark:bg-gray-800 border rounded-lg p-2.5">
                                    <span className="font-mono font-bold text-base text-gray-900 dark:text-white tracking-wider">
                                        {virtualAccount.accountNumber}
                                    </span>
                                    <button
                                        onClick={copyAccountNumber}
                                        className="flex items-center gap-1 text-primary-dark text-sm font-medium"
                                    >
                                        <FiCopy size={16} />
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Account Name</p>
                                <p className="font-medium text-gray-700 dark:text-gray-300">{virtualAccount.accountName}</p>
                            </div>

                            <p className="text-[11px] text-gray-700 dark:text-gray-400 mt-2 text-center sm:text-left">
                                * A standard ₦50 processing fee applies to transfers made directly to this bank account.
                            </p>
                        </div>
                    ) : (
                        /* Not generated view */
                        <div className="mt-4">
                            <div className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 p-3.5 rounded-xl text-xs space-y-1.5 mb-5 border border-blue-100 dark:border-blue-900/50">
                                <p className="font-semibold">💡 Why choose this?</p>
                                <p>Instead of creating a transaction manually every time, you can just save this account inside your local banking app (Kuda, GTBank, OPay, etc.) and transfer to it whenever you want automated wallet updates.</p>
                            </div>

                            <button
                                onClick={() => setShowAccountModal(true)}
                                className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition text-center"
                            >
                                Get My Personal Account Number
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL 1: CHECKOUT AMOUNT MODAL */}
            <Modal
                isOpen={showCheckoutModal}
                closeModal={() => setShowCheckoutModal(false)}
                header="Fund via Instant Checkout"
            >
                <div className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Enter the amount you wish to add. You can settle the transaction seamlessly using your debit card, standard mobile transfer, or USSD code.
                    </p>

                    <InputField
                        label="Amount (₦)"
                        name="amount"
                        type="number"
                        placeholder="e.g. 2000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    {checkoutError && (
                        <p className="text-red-500 text-xs font-medium mt-2">{checkoutError}</p>
                    )}

                    <button
                        onClick={initiateCheckout}
                        disabled={loadingCheckout}
                        className="cursor-pointer w-full mt-5 bg-primary-dark text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
                    >
                        {loadingCheckout ? "Opening Payment Gateway..." : "Proceed to Secure Payment"}
                    </button>

                    <div className="mt-5 flex justify-center items-center gap-1.5 opacity-60 text-xs text-gray-500 dark:text-gray-400">
                        <span>Secured via</span>
                        <img src={monnify_logo} alt="Monnify" className="h-4" />
                        <span>(Moniepoint MFB)</span>
                    </div>
                </div>
            </Modal>

            {/* MODAL 2: ACCOUNT GENERATION MODAL */}
            <Modal
                isOpen={showAccountModal}
                closeModal={() => setShowAccountModal(false)}
                header="Get Personal Bank Account"
            >
                <div className="p-6">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        Your personal account is powered by a licensed financial institution (Moniepoint).
                        The verification is required by CBN regulations and helps keep your account secure.
                        Winsubz does not store or use your BVN/NIN for any other purpose.
                    </p>

                    <p className="text-xs bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50 p-2.5 rounded-lg font-medium mb-4">
                        ⚠️ Paste either your BVN <strong>OR</strong> your NIN. You only need to supply one.
                    </p>

                    <InputField
                        label="BVN (Bank Verification Number)"
                        name="bvn"
                        placeholder="Enter 11-digit BVN"
                        value={bvn}
                        onChange={(e) => setBvn(e.target.value)}
                    />

                    <p className="text-center text-gray-400 my-2 text-xs font-bold">OR</p>

                    <InputField
                        label="NIN (National Identification Number)"
                        name="nin"
                        placeholder="Enter 11-digit NIN"
                        value={nin}
                        onChange={(e) => setNin(e.target.value)}
                    />

                    {backendError && (
                        <p className="text-red-500 text-xs font-medium mt-3">{backendError}</p>
                    )}

                    <button
                        onClick={generateVirtualAccount}
                        disabled={generatingAccount}
                        className="cursor-pointer w-full mt-5 bg-gray-900 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
                    >
                        {generatingAccount ? "Generating Details..." : "Verify & Generate Account"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default FundWallet;