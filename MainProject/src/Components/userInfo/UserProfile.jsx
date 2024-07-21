// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, clearUser } from "./rtk/Slices/userSlice";
import PropTypes from 'prop-types';

export default function UserProfile ({ userId }){
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch the fetchUser thunk with the userId to fetch the user data
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <h3>Projects</h3>
          <ul>
            {user.projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
          <button onClick={() => dispatch(clearUser())}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}


UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};