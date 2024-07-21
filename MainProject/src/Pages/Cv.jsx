import { useState, useEffect } from "react";
import axios from "axios";
import UploadElement from "../Components/UploadElement/UploadElement";
import { MANAGE, baseURL } from "../API/API.js";

export default function Cv() {
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const getcv = async () => {
      const token = localStorage.getItem("token"); // Replace with your actual token
      try {
        const response = await axios.get(`${baseURL}/${MANAGE}`, {
          headers: {
            Authorization: "Token " + token,
          },
        });
        console.log(response.data);
        setCvFile(response.data.resume_file);
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };

    getcv();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleFileUpload = async (file) => {
    const token = localStorage.getItem("token"); // Replace with your actual token

    const formData = new FormData();
    formData.append("resume_file", file);

    try {
      const response = await axios.patch(`${baseURL}/${MANAGE}`, formData, {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("File uploaded successfully:", response.data);
      setCvFile(response.data.resume_file); // Set the URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const isPdf = (url) => {
    return url && url.endsWith(".pdf");
  };

  return (
    <div>
      <div className="flex items-center justify-between px-5 mb-3">
        <h1 className="text-xl font-bold">CV File</h1>
        <UploadElement
          type="pdf"
          text="Upload Your CV"
          onFileUpload={handleFileUpload}
        />
      </div>

      <div className="h-1 mx-5 bg-tertiary"></div>
      {/* show your CV */}
      <div>
        <h1 className="text-2xl font-bold text-center italic text-primary my-4">View your CV</h1>
        {cvFile ? (
          isPdf(cvFile) ? (
            <a className="mx-5 bg-primary text-tertiary font-bold px-5 py-3 rounded-lg hover:bg-card" href={cvFile} download>
              Download CV
            </a>
          ) : (
            <img src={cvFile} alt="Uploaded CV" />
          )
        ) : (
          <p className="mx-5 bg-primary text-tertiary font-bold  px-5 py-3 rounded-lg" style={{width:"16%"}} >No CV uploaded yet</p>
        )}
      </div>
    </div>
  );
}
