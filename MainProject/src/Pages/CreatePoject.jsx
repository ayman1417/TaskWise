import AddFieldForm from "../Components/AddFieldForm/AddFieldForm";
import { useSelector } from "react-redux";
import moment from 'moment';
import { baseURL, PROJECT } from "../API/API";
import axios from 'axios';
import { useState } from "react";

export default function CreateProject() {
  const userInfo = useSelector((state) => state.user.user);
  const [emailError, SetEmailError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const now = moment();
    const createProjectData = {
      name: e.target[0].value,
      description: e.target[1].value,
      created: now.toISOString(),
      deadline: e.target[2].value,
      members: [],
      leader: {
        email: userInfo.email,
        name: userInfo.name,
        password: localStorage.getItem('pass'),
      }
    };

    // get member data
    for (let i = 3; i < e.target.length; i++) {
      let memberValue = e.target[i].value;
      if (memberValue.trim() !== '') {
        createProjectData.members.push(memberValue);
      }
    }

    console.log(createProjectData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/${PROJECT}`,
        createProjectData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
      });
      if (response.status === 201) {
        // console.log("data", response.data);
        const id = response.data.id;
        window.location.pathname = `/project/${encodeURIComponent(id)}`;
        for (let i = 0; i < e.target.length; i++) {
          e.target[i].value = "";
        }
        SetEmailError("")
      }
    } catch (error) {
      SetEmailError(`There is User/s with email/s does not exist`)
      console.log(error.message);
    }
  }

  return (
    <div className="px-5 py-4">
      <h1 className="italic mb-3 text-2xl font-bold text-primary pl-1 underline">Create Project</h1>
      <div className="bg-tertiary rounded-lg shadow-xl shadow-right">
        <form className="p-5 grid" onSubmit={handleSubmit}>
          <label htmlFor="1" className="font-bold">Project Name:</label>
          <input required className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Name..." id='1' type="text" name="projectName" />
          
          <label className="mt-1 font-bold" htmlFor="2">Project Description:</label>
          <textarea className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Description..." id='2' rows='7' name="projectDescription"></textarea>

          <label htmlFor="20" className="font-bold">Deadline:</label>
          <input required className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Name..." id='20' type="datetime-local" name="deadline" />
          
          <div>
            <h1 > <span className='font-bold underline'>Members:</span> <span className="ml-5 text-red-500 italic text-xs" >{emailError?emailError:"" }</span></h1>
          </div>
          <AddFieldForm membersCreated={[]} fieldName='member' />
          
          <div className="flex justify-center">
            <button className="mt-2 font-bold text-tertiary hover:bg-card bg-primary px-10 py-2 rounded-full">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}