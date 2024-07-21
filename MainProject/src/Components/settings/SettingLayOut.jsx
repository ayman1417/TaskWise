import { Outlet } from 'react-router-dom';
import Settingbar from './settingbar/Settingbar';
export default function SettingLayOut() {
  // const location = useLocation();
  // location.pathname
  return (
    <div>
      <div className='px-5 pt-4'>
        {/* <h1 className='italic text-2xl font-bold text-primary pl-1 underline'>Settings</h1> */}
        <Settingbar />
        {/* <div className="h-1 bg-tertiary"></div> */}
      </div>
      <div>
        <div className='block'>
            <Outlet />
          </div>
      </div>
    </div>
  )
}
