import axios from "../lib/axios";
import OneSignal from "react-onesignal";
export const logout = async (navigate) => {
    try {
        await OneSignal.logout(); //
        const res = await axios.get('/api/v1/users/logout');
        if (res.data.status === 'success') {
            localStorage.removeItem("user");
            navigate('/login');
        }
    } catch (err) {
        console.log(err);
    }
};
