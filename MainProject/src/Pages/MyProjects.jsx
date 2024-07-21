import SingleProject from "../Components/SingleProject/SingleProject"
import CreateProjectButton from "../Components/CreateProject/CreateProjectButton"
import { useEffect, useState } from "react";
import { PROJECT, baseURL } from "../API/API";
import axios from 'axios';

export default function MyProjects() {

  const [projects, SetProjectss] = useState(null);
  const [status, SetStatus] = useState(false);


  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/${PROJECT}`, {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });
        if (response.status == 200) {
          SetProjectss(response.data);
          SetStatus(true);
        } else {
          SetStatus(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProjects();
  } ,[]);


  return (
    <div >
      {/* <h1 className="inline-block">My Projects</h1> */}
      {/* create project button */}
      <div className="flex justify-between items-center px-5 pt-4">
        <h1 className="italic text-2xl font-bold text-primary pl-1 underline ">My Projects</h1>
        <CreateProjectButton  />
      </div>
      <div className=" flex flex-wrap gap-x-7 gap-y-5  ml-5 my-3">
        {status && projects && projects.map((item) => (
          <SingleProject 
            key={item.id}
            projectId= {item.id}
            name={item.name}
            description={item.description}
            createdIn={item.created}
            deadline={item.deadline ? item.deadline : "don't selected"}
          />
        ))}
      </div>
    </div>
  )
}
