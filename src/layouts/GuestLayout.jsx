import { Outlet } from "react-router-dom";


export default function GuestLay() {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 min-h-screen`}>
          <Outlet />
        </div>
    );
}