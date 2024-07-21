// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN, baseURL } from "../../API/API";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

function Login() {
  const [data, setData] = useState({
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
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: data.email,
        password: data.password,
      });
      //token
      const token = res.data.token;
      localStorage.setItem("token", token); // Save the token to localStorage
      localStorage.setItem("pass",data.password);
      setLoading(false);
      window.location.pathname = "/";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
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
            <h1 className="text-3xl text-white mb-6">Welcome</h1>
            <form onSubmit={handleSubmit}>
              <label className="text-white">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email..."
                value={data.email}
                onChange={handleChange}
                className="bg-white text-black w-full py-2 px-3 rounded mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label className="text-white mt-4">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password..."
                value={data.password}
                onChange={handleChange}
                className="bg-white text-black w-full py-2 px-3 rounded mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white w-full py-2 mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
              <div className="mt-6 text-white">
                <span>
                  New Here?{" "}
                  <Link to="/register" className="text-secondary">
                    Create an Account
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
}

export default Login;
