import "./useimagedesc.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, } from "react-redux";

export default function UserImageDesc(props) {
  const user = useSelector((state) => state.user.user);
  //   const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUser());
  // },[user])
  return (
    <div className="p-0 m-0 my-3 mt-8  flex flex-wrap items-center gap-1">
      <Link to="/setting/account">
        <div className=" flex items-center justify-center w-12 h-12 rounded-full bg-gray-300">
          <img
            src={user ? user.picture : ""}
            alt="User Avatar"
            className="rounded-full object-cover w-full h-full "
          />
        </div>
      </Link>
      <div className=" pl-1 text-gray-400 ">
        <Link to="/setting/account">
          <h1
            className={` break-words text-base hover:${props.hover} ${props.textColor} transition-colors duration-300 ease-in-out`}
          >
            {user ? user.name : ""}
          </h1>
          <h3
            className={` break-words text-xs hover:${props.hover} ${props.textColor} transition-colors duration-300 ease-in-out`}
          >
            {user ? user.email : ""}
          </h3>
        </Link>
      </div>
    </div>
  );
}
/*
. This error typically occurs when you're using ESLint with the 
  eslint-plugin-react package, which enforces best practices and
  helps catch potential issues in React applications, such as missing 
  prop validations.
*/
UserImageDesc.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  hover: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
