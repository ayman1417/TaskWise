import { useEffect, useState } from 'react';
import { Link, useParams,  } from "react-router-dom"
import { useSelector } from "react-redux";
import {baseURL,PROJECT} from '../API/API'
import TaskProjectComponent from "../Components/TaskProjectComponent/TaskProjectComponent";
import NoteComponents from "../Components/NoteComponents/NoteComponents";
import axios from 'axios';

export default function Project() {
  const [isAdmin, SetIsAdmin] = useState(false);
  const [navbarTasks, setNavbarTasks] = useState(true);
  const [navbarNotes, setNavbarNotes] = useState(false);
  const { projectId } = useParams();
  // console.log("projectId",projectId);
  const [projectData, setProjectData] = useState(null);
  function showTasks() {
    setNavbarTasks(true);
    setNavbarNotes(false);
  }
  function showNotes() {
    setNavbarTasks(false);
    setNavbarNotes(true);
  }
  const user = useSelector((state) => state.user.user); 

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
        setProjectData(response.data);
        if (response.data.leader.id === user.id) {
          SetIsAdmin(true)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getProjectData();
  }, [])

  if (projectData == null) {
    return;
  }
  return (
    < div className = "" >
      <div className="my-3">
        <h1><span className='font-bold'>Created:</span> { projectData.created }</h1>
      </div>
      <div className="my-3">
        <h1><span className='font-bold'>Deadline:</span> { projectData.deadline?projectData.deadline:"don't selected" }</h1>
      </div>
      <div className="my-3">
        <h1 className='font-bold'>Description:</h1>
        <p className="bg-tertiary px-3 py-2 rounded-lg">{projectData.description}</p>
      </div>
      {/* notes and tasks */ }
      <div className="flex mx-3 py-3 justify-start gap-5">
            <button onClick={showTasks} className={`font-bold text-2xl ${navbarTasks?"underline":""} hover:text-logoColor text-primary`}>Tasks </button>
            <button onClick={showNotes} className={`font-bold text-2xl ${navbarNotes?"underline":""} hover:text-logoColor text-primary`}>Notes </button>
      </div>
      <div className="mb-3 grid grid-cols-12 ">
          <div className={` ${navbarTasks?'col-span-12 ':"hidden"} rounded-lg bg-white`}>
              {/* task header */} 
              <div>
                {
                  // isLeader&& mx-3
              <div className={`flex  py-3 w-full justify-end`}>
                    <Link to={`/project/${projectId}/createtask`} className= {`${isAdmin?'':'hidden'} bg-primary hover:bg-card font-bold text-tertiary mr-1 px-5 py-2 rounded-lg`}>Add Task</Link>
                  </div>
                }
            {/* tasks */}
                <TaskProjectComponent
                  tasks ={projectData.tasks ? projectData.tasks : []}
                  isAdminProject = {isAdmin}
                  />                    
          </div>
          
            </div>
          <div className={`  ${navbarNotes?'col-span-12 ':"hidden "}rounded-lg bg-white`}>
              {/* Note header */}
              <div className="flex mx-3 py-3 w-full justify-end">
                  <Link to={`/project/${projectId}/createnote`} className="mr-4 bg-primary hover:bg-card text-tertiary font-bold px-5 py-2 rounded-lg" >Add Note</Link>
              </div>
              {/* notes */}
              < NoteComponents  
                comments={projectData.comments ? projectData.comments : []}
                userId={user.id}
                isAdminProject = {isAdmin}
              />
          </div>
      </div>
      
    </ div>
  )
}
