import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function Logout(props) {
  
    function logout() {
    localStorage.removeItem("token");
      window.location.pathname = props.path;
  }

  return (
    <Link onClick={logout}  className='block rounded-2xl hover:bg-sideBarHover'>
      <div className="grid grid-cols-3 py-4">
        <div className="ml-3 col-span-1 w-5 ">{ props.icon }</div>
        <div className="col-span-2  text-gray-400">{ props.title }</div>
      </div>
    </Link>
  );
}

Logout.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};