import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";

export const useBankAccounts = () => {
  const [userBanks, setUserBanks] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const fetchBankAccounts = async () => {
    try {
      const res = await axios.get("api/v1/bankAccounts");
      if (res.data.status === "success") {
        setUserBanks(res.data.data.accounts);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load bank accounts");
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return { userBanks, loadingAccounts, fetchBankAccounts, setUserBanks };
};

export const useCompanyAccount = () => {
  const [bankData, setBankData] = useState(null);
  const [loadingCompanyAccount, setLoadingCompanyAccount] = useState(true);

  const fetchCompanyAccount = async () => {
    try {
      const res = await axios.get("api/v1/bankAccounts/company");
      if (res.data.status === "success") {
        setBankData(res.data.data.account);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch company account");
      console.log(err);
    } finally {
      setLoadingCompanyAccount(false);
    }
  };

  useEffect(() => {
    fetchCompanyAccount();
  }, []);

  return { bankData, loadingCompanyAccount, setBankData, fetchCompanyAccount };
};
