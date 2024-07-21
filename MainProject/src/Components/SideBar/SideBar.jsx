import style from './sidbar.module.css'
import { Link } from "react-router-dom";
import UserImageDesc from '../UserImageDesc/UserImageDesc.jsx'
import { sidebarData } from './sidebarData.jsx'
import SidBarParts from '../SibarParts/SidBarParts.jsx';
import Logout from '../Logout/Logout.jsx';

export default function SideBar() {
  return (
    <div className={` ${style.n} break-words`}>
      {/* logo */}
      <div className='flex justify-center'>
        <div className='w-24'>
          <Link to="/" >
            <div className="group">
            <svg className="m-0 rounded-md w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1343.26 870.19">
                <path className="fill-current text-logoColor group-hover:text-secondary transition-colors duration-300 ease-in-out" d="M2086.41,486.91H1343.64c-61.09,0-116.53,17.81-157.15,46.71h19.42c37.14-23.14,85.2-37.11,137.73-37.11h742.77c116.92,0,212.05,69.38,212.05,154.61v541.76c0,85.23-95.13,154.61-212.05,154.61H1343.64c-116.92,0-212.06-69.38-212.06-154.61V668.45h-13.16v524.43c0,90.56,101.06,164.21,225.22,164.21h742.77c124.16,0,225.22-73.65,225.22-164.21V651.12C2311.63,560.56,2210.57,486.91,2086.41,486.91Z" transform="translate(-968.37 -486.91)" />
                <path className="fill-current text-logoColor group-hover:text-secondary transition-colors duration-300 ease-in-out" d="M1578,1283.21c-64.46-21-112.12-64.58-124.37-116.87V726.08A278,278,0,0,1,1488,720a284.15,284.15,0,0,1,33.58-1.92,293.1,293.1,0,0,1,64.19,7.06v414.52c0,32.36,36,58.63,80.45,58.63,2,0,4.08,0,6.12-.2,41.55-2.25,74.27-27.56,74.27-58.43a117.64,117.64,0,0,1,1.51-18.73V726a294.2,294.2,0,0,1,132.27-.77v414.43h1.51c0,32.36,36,58.63,80.45,58.63s80.39-26.27,80.39-58.63h3.09V725.17a293.1,293.1,0,0,1,64.19-7.06q12.54,0,24.69,1a284,284,0,0,1,43.32,7v413.61c0,65.25-54.51,121.29-132.2,145a290.91,290.91,0,0,1-165.44.48,235.26,235.26,0,0,1-66.1-31.16,237.09,237.09,0,0,1-66.17,31.16,282.65,282.65,0,0,1-78.74,11.72h-.33c-.06,0-.06,0-.13,0h-2.7a288,288,0,0,1-80.45-11.29" transform="translate(-968.37 -486.91)" />
                <path className="fill-current text-logoColor group-hover:text-secondary transition-colors duration-300 ease-in-out" d="M2181.79,604.94a153.79,153.79,0,0,1-6.51,44.32H1384.39V1148c0,45.61,26.6,86.67,69.19,115.43,22.72,15.36,50.1,27.22,80.39,34.33a289.34,289.34,0,0,1-66.1,7.54c-4.81,0-9.55-.1-14.29-.34-112.51-5.38-201.46-73.61-201.46-157,0-2.79.07-5.52.27-8.26h-.27V649.26H974.89a154,154,0,0,1,2.56-96.42H2172.71A154.88,154.88,0,0,1,2181.79,604.94Z" transform="translate(-968.37 -486.91)" />
            </svg>
          </div>
          </Link>
        </div>
      </div>
      
      {/* use info */}
      <UserImageDesc 
        hover='text-logoColor'
        textColor=' '
          imageURL='../../../public-resources/download.jpeg'
          name='Raerd yassin'
          email='raed@gamil.com' />

      {/* the line */}
      <div className="h-1 bg-logoColor"></div>

      {/* button move to another page */}
      <div>
        {
          sidebarData.map((item) => {
          return <SidBarParts key={item.id} icon={item.icon} title={item.title} path={item.path} />
          })
        }
        <Logout
          icon={<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#808080" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>}
          title="Logout"
          path = '/login'
        />
      </div>
      
    </div>
  )
}
