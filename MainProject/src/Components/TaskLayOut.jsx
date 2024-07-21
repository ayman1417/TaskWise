import { Outlet } from 'react-router-dom';
import {baseURL,PROJECT} from '../API/API.js'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SidbarLeaderMember from './sidebarLeaderMember/SidbarLeaderMember';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function TaskLayOut() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  
  async function editeProject() {
    window.location.pathname = `project/${projectId}/editeproject`;
  }
  const user = useSelector((state) => state.user.user); 

  async function deleteProject() {
      try {
        const token  = localStorage.getItem("token");
        const response = await axios.delete(`${baseURL}/${PROJECT}${projectId}`, {
          headers: {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status == 204) {
          window.location.pathname = '/myprojects'
        }
      } catch(err) {
          console.log(err.message);
      }
    }
  

  useEffect(() => {
    async function getProjectData() {
      try {
        const token  = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/${PROJECT}${projectId}`, {
          headers: {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProjectData(response.data);
        console.log(projectData.members_detail);
      } catch(err) {
          // console.log(err.message);
      }
    }
    getProjectData();
  }, [])
  

  return (
    <>
      {
        projectData  &&
        <div className="p-5  rounded-md ">
          <div>
            <h1 className=' text-2xl font-bold text-primary pl-1 '> <span className='underline italic'>Project:</span> {projectData.name}</h1>
          </div>
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-4'>
              <Outlet />
              </div>
              
            <div className='fixed right-7'>
              <div className='bg-rightBar rounded-t-lg px-3 pb-3'>
                <h1 className='py-2 italic font-bold text-primary'>Project Members:</h1>
                <SidbarLeaderMember
                  titleHeader="Leaders"
                  members={[projectData.leader]}
                />
              </div>
              <div className='bg-rightBar rounded-b-lg  px-3 pb-3'>
                <SidbarLeaderMember
                  titleHeader="Members"
                  members={projectData.members_detail}
                />
                </div>
                {
                  user.id && projectData.leader.id && user.id === projectData.leader.id &&
                  <div className='bg-rightBar mt-5 py-3 rounded-lg px-3 pb-3'>
                    <button onClick={deleteProject} className='font-bold bg-primary hover:bg-card hover:text-rightBar w-full py-2 rounded-lg text-gray-400'>Delete Project</button>
                    <button onClick={editeProject} className='font-bold bg-primary hover:bg-card w-full mt-3 py-2 rounded-lg text-gray-400'>Edite Project</button>
                  </div>
                }
            </div>
          
          </div>

        </div>
      }
  </>
  )
}
