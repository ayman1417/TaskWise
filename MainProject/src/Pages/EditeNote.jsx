import { useParams } from "react-router-dom";
import { COMMENT,PROJECT, baseURL } from '../API/API';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function EditNote() {

  const { projectId, noteID } = useParams();
  const [show, setShow] = useState(true);
  const [commentData, setCommentData] = useState({ text: '' });

  const user = useSelector((state) => state.user.user);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getComments() {
      try {
        const response = await axios.get(`${baseURL}/${COMMENT}${noteID}/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          setCommentData(response.data);
          setShow(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getComments();
  }, []);

  async function submitHandle(e) {
    e.preventDefault();

    const sendObject = {
      project: projectId,
      text: commentData.text,
      user: {
        email: user.email,
        name: user.name,
        password: localStorage.getItem("pass")
      }
    };
    try {
      const response = await axios.patch(`${baseURL}/${COMMENT}${noteID}/`,
        sendObject, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        // Handle successful creation of note
        window.location.pathname = `${PROJECT}${projectId}`;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (show) {
    return ;
  }

  return (
    <div>
      <form onSubmit={submitHandle}>
        <div>
          <div>
            <h1 className="text-primary mt-5 font-bold text-xl underline italic">{`Let's Edit a Note`}</h1>
          </div>
          <div className="my-3">
            <label className="font-bold" htmlFor="taskDescription">Note:</label>
            <textarea
              required
              value={commentData.text}
              placeholder="Note Description"
              className="w-full bg-tertiary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
              name="text"
              rows="5"
              id="taskDescription"
              onChange={(e) => setCommentData({ ...commentData, text: e.target.value })}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="font-bold text-tertiary bg-primary hover:bg-card m-3 rounded-full px-5 py-2">
            Edit Note
          </button>
        </div>
      </form>
    </div>
  );
}
