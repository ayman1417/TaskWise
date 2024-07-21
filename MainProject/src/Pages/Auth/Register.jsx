// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { REGISTER, baseURL } from "../../API/API";
import Loading from "../../Components/Loading/Loading";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //loading state
  const [loading, setLoading] = useState(false);

  //err handling
  const [err, setErr] = useState("");

  //handle form change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //handel form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, data);
      const token = res.data.token;
      localStorage.setItem("token", token); // Save the token to localStorage
      setLoading(false);
      window.location.pathname = "/login";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 442) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server ERR");
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen bg-gradient-to-t from-Gradient to-primary h-screen flex flex-row items-center ">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl text-white my-4">Hello Friend</h1>
            <form onSubmit={handleSubmit}>
              <label className="text-white">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name..."
                value={data.name}
                onChange={handleChange}
                className="bg-white text-black w-full py-2 px-3 rounded mt-2 focus:outline-none focus:ring focus:border-secondary"
              />
              <label className="text-white mt-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email..."
                value={data.email}
                onChange={handleChange}
                className="bg-white text-black w-full py-2 px-3 rounded mt-2 focus:outline-none focus:ring focus:border-secondary"
              />
              <label className="text-white mt-4">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password..."
                value={data.password}
                onChange={handleChange}
                className="bg-white text-black w-full py-2 px-3 rounded mt-2 focus:outline-none focus:ring focus:border-secondary"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white w-full py-2 mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300"
              >
                Register Now
              </button>
              <div className="mt-4 text-white">
                <span>
                  Already have an account?{" "}
                  <Link to="/login" className="text-secondary">
                    Login
                  </Link>
                </span>
              </div>
              {err !== "" && (
                <span className="block text-sm text-red-500 mt-2">{err}</span>
              )}
            </form>
          </div>
        </div>
        <div className="max-w-md w-full mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-7xl text-secondary mb-4 font-title">
              Task Wise
            </h1>
            <p className="text-2xl text-white">
              Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Praesentium iure qui voluptatum
              voluptatem vitae blanditiis in quis iste quo corporis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
