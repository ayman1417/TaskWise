import { useParams } from "react-router-dom";
import { PROJECT,COMMENT, baseURL } from '../API/API';
import { useSelector } from "react-redux";
import axios from 'axios';

export default function CreateNote() {
  const { projectId } = useParams();
  const user = useSelector((state) => state.user.user);

  async function submitHandle(e) {
    e.preventDefault();

    const sendObject = {
      project: projectId,
      text: e.target.taskDescription.value,
      user: {
        email: user.email,
        name: user.name,
        password: localStorage.getItem("pass")
      }
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/${COMMENT}`, sendObject, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        // Handle successful creation of note
        window.location.pathname = `${PROJECT}${projectId}`;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandle}>
        <div>
          <div>
            <h1 className="text-primary mt-5 font-bold text-xl underline italic">{`Let's Create a Note`}</h1>
          </div>
          <div className="my-3">
            <label className="font-bold" htmlFor="taskDescription">Note:</label>
            <textarea
              required
              placeholder="Note Description"
              className="w-full bg-tertiary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
              name="taskDescription"
              rows="5"
              id="taskDescription"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="font-bold text-tertiary bg-primary hover:bg-card m-3 rounded-full px-5 py-2">
            Generate Note
          </button>
        </div>
      </form>
    </div>
  );
}
