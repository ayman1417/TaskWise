import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './SideBar/SideBar.jsx';
import WelcomUser from './welcomUser/WelcomUser.jsx';
import { fetchUser } from "../../rtk/Slices/userSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser()); 
  }, [dispatch]);
  const userInfo = useSelector((state) => state.user.user); 

  return (
    <div className="bg-tertiary">
      {!hideSidebar && (
        <div className="fixed top-0 left-0 h-full w-1/6 bg-primary px-5 pt-5">
          <Sidebar />
        </div>
      )}
      <div className={!hideSidebar ? "ml-1/6" : "ml-0"} style={{ marginLeft: hideSidebar ? '0' : '16.666%' }}>
        <WelcomUser name={userInfo ? userInfo.name : "User Name"} className='inline-block' />
        <div className='bg-white mx-4 mt-2 mb-4 rounded-lg pb-3' style={{ minHeight: "90vh" }}>
          <div className='block'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}


