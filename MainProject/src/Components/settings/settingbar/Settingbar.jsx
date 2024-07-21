import { useLocation } from 'react-router-dom';
import { settingData } from '../SettingData';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settingbar() {
  const location = useLocation();
  const [underLine, setUnderLine] = useState('');
  // location.pathname
  useEffect(() => {
      const pathSegments = location.pathname.split('/');
      setUnderLine(pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2]);
  }, [location])
  
  return (
    <div className='flex justify-items-start space-x-5 font-bold mt-5 mb-2 italic'>
      {settingData.map((item) => (
        <Link to={`${item.path}`} key={item.id}>
          <p className={`${underLine.toLowerCase() === item.title.toLowerCase() ? 'underline' : ''} hover:text-logoColor text-2xl`}>
            {item.title}
          </p>
        </Link> 
      ))}
    </div>
  );
}
