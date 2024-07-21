import UserImageDesc from "../Components/UserImageDesc/UserImageDesc";
import UploadElement from "../Components/UploadElement/UploadElement";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../rtk/Slices/userSlice";
import { useEffect, useState } from "react";
import { MANAGE, baseURL } from "../API/API.js";
import axios from "axios";

// import Loading from "../Components/Loading/Loading";
export default function Account() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [change, setChange] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setFormData({
      name: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [change, dispatch]);

  const user = useSelector((state) => state.user.user);

  async function handleSubmit(e) {
    e.preventDefault();
    let finalFromData = new FormData();
    let go = false;

    if (formData.name.trim() !== "") {
      finalFromData.append("name", formData.name.trim());
      go = true;
    }
    if (formData.email.trim() !== "") {
      finalFromData.append("email", formData.email.trim());
      go = true;
    }
    if (
      (formData.newPassword.trim() !== "" &&
        formData.confirmPassword.trim() === "") ||
      (formData.newPassword.trim() === "" &&
        formData.confirmPassword.trim() !== "") ||
      (formData.newPassword.trim() !== "" &&
        formData.confirmPassword.trim() !== "")
    ) {
      if (formData.newPassword.trim() === formData.confirmPassword.trim()) {
        finalFromData.append("password", formData.newPassword.trim());
        go = true;
        setPasswordError(false);
      } else {
        setPasswordError(true);
        return;
      }
    }
    if (!go) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${baseURL}/${MANAGE}`,
        finalFromData,
        {
          headers: {
            Authorization: "Token " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        setEmailError(true);
      } else {
        setEmailError(false);
        setChange(!change);
        e.target.reset();
      }
    } catch {
      console.log("Network Error");
    }
  }
  const handleFileUpload = async (file) => {
    const token = localStorage.getItem("token"); // Replace with your actual token

    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await axios.patch(`${baseURL}/${MANAGE}`, formData, {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      dispatch(fetchUser());
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div style={{ width: "22%" }} className="mt-0 inline-block px-5">
            <UserImageDesc
              textColor="text-black"
              hover="text-logoColor"
              imageURL="../../../public-resources/download.jpeg"
              name="Raerd yassin"
              email="raed@gamil.com"
            />
          </div>
          <div className="mr-5">
            <UploadElement
              type="image"
              text="Upload Profile Picture"
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>

        <div className="h-1 mx-5 bg-tertiary"></div>

        <div className="bg-tertiary m-5 rounded-lg shadow-xl shadow-right">
          <form className="p-5 grid" onSubmit={handleSubmit}>
            <label className="font-bold" htmlFor="1">Name:</label>
            <input
              onChange={handleChange}
              className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card"
              placeholder={user ? user.name : "Enter your FirstName..."}
              id="1"
              type="text"
              name="name"
            />

            <div className="flex justify-items-start gap-2">
              <label className="mt-1 font-bold" htmlFor="3">
                Email:
              </label>
              <span className="text-red-500 mt-1 inline-block text-sm italic">
                {emailError && "This email already exists"}
              </span>
            </div>
            <input
              onChange={handleChange}
              className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card"
              placeholder={user ? user.email : "Enter your Email..."}
              id="3"
              type="email"
              name="email"
            />

            <label className="mt-1 font-bold" htmlFor="5">
              New Password:
            </label>
            <input
              autoComplete="new-password"
              onChange={handleChange}
              className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card"
              placeholder="Enter New Password..."
              id="5"
              type="password"
              name="newPassword"
            />

            <div className="flex justify-items-start gap-2">
              <label className="mt-1 inline-block font-bold" htmlFor="6">
                Confirm Password:
              </label>
              <span className="text-red-500 mt-1 inline-block text-sm italic">
                {passwordError && "Passwords do not match"}
              </span>
            </div>
            <input
              autoComplete="new-password"
              onChange={handleChange}
              className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card"
              placeholder="Enter New Password..."
              id="6"
              type="password"
              name="confirmPassword"
            />

            <div className="flex justify-center">
              <button className="mt-2 font-bold text-tertiary hover:bg-card bg-primary px-10 py-2 rounded-full">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
