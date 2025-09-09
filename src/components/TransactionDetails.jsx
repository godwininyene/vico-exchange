import { FiCheck, FiX, FiDownload } from 'react-icons/fi';
import StatusBadge from "./StatusBadge";
import formatDate from '../utils/formatDate';
import ActionButton from './ActionButton';

const TransactionDetails = ({
    transaction,
    onApproveTransaction,
    onDeclineTransaction,
    isApproving = false,     
    isDeclining = false,     
}) => {
    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Transaction Information</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                            <p className="text-gray-800 dark:text-white">{transaction.user.firstName + ' ' + transaction.user.lastName} ({transaction.user.email})</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                            <p className="text-gray-800 dark:text-white">{transaction.description}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                            <p className={`font-medium ${
                                transaction.flowType === 'deposit' 
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                                {transaction.flowType === 'deposit' ? '+' : '-'}
                                {transaction.assetType === 'coin' 
                                ? `${transaction.coinDetails?.coinAmount}  ${transaction.description.split(' ')[1]}`
                                : `₦${transaction.amount.toLocaleString()}`
                                }
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">USDT Amount</p>
                            <p className={`font-medium ${
                                transaction.flowType === 'deposit' 
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                                {transaction.flowType === 'deposit' ? '+' : '-'}
                                ${transaction.usdAmount}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                            <p className="text-gray-800 dark:text-white">{formatDate(transaction.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                            <StatusBadge status={transaction.status} />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Details</h3>
                    
                    {/* Card Image for Giftcard Sell Transactions */}
                    {transaction.assetType === 'giftcard' && transaction.giftcardDetails?.cardImage && (
                        <>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Gift Card Image</p>
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                                <img 
                                    src={transaction.giftcardDetails.cardImage} 
                                    alt="Gift card" 
                                    className="w-full h-auto rounded max-h-64 object-contain"
                                />
                                <div className="mt-4 flex justify-end">
                                    <a 
                                        href={transaction.giftcardDetails.cardImage} 
                                        download
                                        className="flex items-center text-primary-dark dark:text-primary-light hover:underline"
                                    >
                                        <FiDownload className="mr-1" /> Download Card Image
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Payment Proof for other transactions */}
                    {transaction.paymentProof ? (
                        <>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Payment Proof</p>
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <img 
                                    src={transaction.paymentProof} 
                                    alt="Payment proof" 
                                    className="w-full h-auto rounded max-h-64 object-contain"
                                />
                                <div className="mt-4 flex justify-end">
                                    <a 
                                        href={transaction.paymentProof} 
                                        download
                                        className="flex items-center text-primary-dark dark:text-primary-light hover:underline"
                                    >
                                        <FiDownload className="mr-1" /> Download Payment Proof
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        transaction.assetType !== 'giftcard' && (
                            <p className="text-gray-500 dark:text-gray-400">No payment proof required for this transaction</p>
                        )
                    )}

                    {/* Card Number for Giftcard Transactions */}
                    {transaction.assetType === 'giftcard' && transaction.giftcardDetails?.cardNum && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Card Number</p>
                            <p className="text-gray-800 dark:text-white font-mono">{transaction.giftcardDetails.cardNum}</p>
                        </div>
                    )}

                    {/* Wallet Address for Coin Buy Transactions */}
                    {transaction.assetType === 'coin' && transaction.coinDetails?.receivingWalletAddress && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receiving Wallet Address</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                <p className="text-sm text-gray-800 dark:text-white">
                                    <span className="font-medium">Network:</span> {transaction.coinDetails.receivingWalletAddress.network}
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white break-all">
                                    <span className="font-medium">Address:</span> {transaction.coinDetails.receivingWalletAddress.address}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Receiving Account for Deposit Transactions */}
                    {transaction.flowType === 'deposit' && transaction.receivingAccount && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receiving Bank Account</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                <p className="text-sm text-gray-800 dark:text-white">
                                    <span className="font-medium">Bank:</span> {transaction.receivingAccount.bank}
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white">
                                    <span className="font-medium">Account Number:</span> {transaction.receivingAccount.number}
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white">
                                    <span className="font-medium">Account Name:</span> {transaction.receivingAccount.name}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
                {transaction.status === 'pending' && (
                  <>
                    <ActionButton
                      onClick={onApproveTransaction}
                      loading={isApproving}
                      disabled={isDeclining || isApproving}
                      icon={FiCheck}
                      variant="success"
                    >
                      Approve Transaction
                    </ActionButton>
                    <ActionButton
                      onClick={onDeclineTransaction}
                      loading={isDeclining}
                      disabled={isApproving || isDeclining}
                      icon={FiX}
                      variant="danger"
                    >
                      Decline Transaction
                    </ActionButton>
                  </>
                )}
                {transaction.status === 'completed' && (
                  <ActionButton
                    onClick={onDeclineTransaction}
                    loading={isDeclining}
                    disabled={isDeclining}
                    icon={FiX}
                    variant="danger"
                  >
                    Reverse Transaction
                  </ActionButton>
                )}
                {transaction.status === 'failed' && (
                  <ActionButton
                    onClick={onApproveTransaction}
                    loading={isApproving}
                    disabled={isApproving}
                    icon={FiCheck}
                    variant="success"
                  >
                    Approve Transaction
                  </ActionButton>
                )}
            </div>
        </div>
    );
};

export default TransactionDetails;