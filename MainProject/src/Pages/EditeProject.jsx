import AddFieldForm from "../Components/AddFieldForm/AddFieldForm"
import moment from 'moment';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { baseURL, PROJECT } from '../API/API'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



export default function EditeProject() {
  const [defaultEmails, setDefaultEmails] = useState([]);
  const [go, setGo] = useState(true);
  const [emailError, SetEmailError] = useState("");

  const { projectId } = useParams();
  
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: [],
  });



  useEffect(() => {
    async function getProjectData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/${PROJECT}${projectId}`, {
          headers: {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        let formattedDeadline = null;
        if (response.data.deadline !== null) {
          formattedDeadline = moment(response.data.deadline).format("YYYY-MM-DDTHH:mm");
        }
        setProjectData({
          name: response.data.name,
          description: response.data.description,
          deadline: formattedDeadline,
          members: response.data.members_detail.map(member => member.email),
        });
        setDefaultEmails(() => {
          let values = [];
          for (let i = 0; i < response.data.members_detail.length; i++){
            values.push({ email: response.data.members_detail[i].email });
          }
          return values;
        });
      } catch (err) {
        // console.log(err.message);
      }
      setGo(false)
    }
    getProjectData();
  },[projectId]);

  const userInfo = useSelector((state) => state.user.user);

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
        console.log("data", response.data);
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
    const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  if (go) {
    return;
  }

  return (
    <div className="px-5 py-4">
      <h1 className="italic mb-3 text-2xl font-bold text-primary pl-1 underline ">Create Project</h1>

      {/* <div className="h-1  my-2 bg-tertiary"></div> */}

      <div className="bg-tertiary  rounded-lg shadow-xl shadow-right ">
        <form className="p-5 grid" onSubmit={handleSubmit} >
          <label  htmlFor="1"  className="font-bold">Project Name:</label>
          <input required  value={projectData.name}  onChange={handleChange} className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Name..." id='1' type="text" name="name" />
          
          <label className="mt-1 font-bold" htmlFor="2">Project Description:</label>
          <textarea value={projectData.description} onChange={handleChange} className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Description..." id='2' rows='7' name="description">
          </textarea>

          <label htmlFor="20" className="font-bold">Deadline:</label>
          <input required value={projectData.deadline?projectData.deadline:''} onChange={handleChange} className="mt-1 mb-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-card" placeholder="Enter Project Name..." id='20' type="datetime-local" name="deadline" />

          
        {/* Leaders */}
        {/* <div>
          <h1 className='font-bold underline'>Leaders:</h1>
        </div>
        <AddFieldForm fieldName='Leader' /> */}
          
        {/* Members */}
        <div>
          <h1 > <span className='font-bold underline'>Members:</span> <span className="ml-5 text-red-500 italic text-xs" >{emailError?emailError:"" }</span></h1>        </div>
          <AddFieldForm membersCreated={defaultEmails} fieldName='member'/>
          
          <div className="flex justify-center">
            <button className="mt-2 font-bold text-tertiary hover:bg-card  bg-primary px-10 py-2  rounded-full ">Edite Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}
