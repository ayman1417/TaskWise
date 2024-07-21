import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Task,baseURL } from '../../API/API';
import axios from 'axios';
export default function TaskProjectComponent(props) {
  const { projectId } = useParams();
  const [isAdmin] = useState(props.isAdminProject);
  const [tasks, setTasks] = useState(props.tasks);
  if (props.tasks.length === 0) {
    return (
      <h1 className='text-2xl font-bold text-red-400'>There is Tasks in this project</h1>
    );
  }
  function editeHandler(id) {
    window.location.pathname = `/project/${projectId}/editetask/${id}`
  }
  async function deleteHandler(id) {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${baseURL}/${Task}${id}`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
      if (response.status == 204) {
        let allTasks = tasks;
        allTasks = allTasks.filter((item) => item.id !== id)
        setTasks(allTasks);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className='flex flex-wrap  gap-4'>
      {
        tasks.slice().reverse().map((item) => (
          <div key={item.id} className='bg-tertiary rounded-lg   px-4 py-3' style={{width:"49%"}}>
            <div>
              <h1 className='text-sm'><span className='font-bold'>Created:</span> {item.created}</h1>
              <h1 className='text-sm'><span className='font-bold '>Deadline:</span> {item.deadline ? item.deadline : "don't selected"}</h1>
            </div>
            <div>
              <h1 className='font-bold text-sm'>Description:</h1>
              <textarea className={`w-full px-3 py-2 bg-tertiary`} readOnly value={item.description} rows={"4"}></textarea>
              {/* <p className='ml-3 text-sm line-clamp-3'>{item.description}</p> */}
            </div>
            <div>
              <span className='font-bold'>Task for:</span>
              <div>
                {
                  // the member
                  <div> <span className='text-logoColor ml-3'>&#8226;</span> {item.user.name} </div>
                }
              </div>
            </div>
            {
              isAdmin &&
              <div className=''>
                <button onClick={()=>editeHandler(item.id)} className='bg-primary hover:bg-card px-3 py-1 rounded-lg text-tertiary'>Edit</button>
                <button onClick={()=>deleteHandler(item.id)} className=' mx-5 mt-2 bg-primary hover:bg-card px-3 py-1 rounded-lg text-tertiary'>Delete</button>
                <button></button>
              </div>
            }
          </div>
        ))
      }
    </div>
  )
}

TaskProjectComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    description: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  isAdminProject: PropTypes.bool.isRequired,
};
