import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL, PROJECT, RECOMMEND, Task } from "../API/API.js";
import moment from "moment";
import axios from "axios";

export default function CreateTask() {
  const { projectId } = useParams();

  const [projectMembers, setProjectMembers] = useState([]);
  const [selectMember, setSelectMember] = useState([]);
  const [selectMemberBool, setSelectMemberBool] = useState(false);
  const [writeAi, setWriteAi] = useState(false);
  const [aiText, setAiText] = useState("");
  const [aiload, setAiload] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function projectData() {
      try {
        const response = await axios.get(`${baseURL}/${PROJECT}${projectId}`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProjectMembers([...response.data.members_detail,response.data.leader]);
      } catch (err) {
        console.log(err.message);
      }
    }
    projectData();
  }, [projectId, token]);

  async function aiRecommendHandler() {
    const objectAi = {
      project_id: projectId,
      task: aiText,
    };
    if (aiText.trim().length === 0) {
      setWriteAi(true);
    } else {
      try {
        setAiload(true)
        setWriteAi(false);
        const response = await axios.post(`${baseURL}/${RECOMMEND}`, objectAi, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          // setAiText("");
          setAiResponse(response.data.recommendation);
          setAiload(false)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const now = moment();
    if (selectMember.length !== 0) {
      setSelectMemberBool(false);
      const sendObject = {
        name: e.target.name.value,
        description: e.target.taskDescription.value,
        project: projectId,
        finished: false,
        deadline: e.target.taskDeadline.value,
        user: selectMember[0].id,
        created: now.toISOString(),
        modified: now.toISOString(),
      };
      try {
        const response = await axios.post(`${baseURL}/${Task}`, sendObject, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          window.location.pathname = `${PROJECT}${projectId}`;
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setSelectMemberBool(true);
    }
  }

  function addHandlerMember(index, id) {
    const selected = projectMembers[index];
    const newProjectMembers = projectMembers.filter((item) => item.id !== id);

    if (selectMember.length !== 0) {
      setProjectMembers([...newProjectMembers, selectMember[0]]);
    } else {
      setProjectMembers([...newProjectMembers]);
    }
    setSelectMember([selected]);
  }

  if (projectMembers.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <div>
          <p className="my-3 text-sm font-bold text-gray-500">
            We will recommend the best{" "}
            <span className="underline italic text-logoColor">members</span> for
            do this task!
          </p>
          <h1 className="text-primary font-bold text-xl underline italic">
            {`Let's Create a Task`}
          </h1>
        </div>
                  <label htmlFor="AIrecommendation">TaskWise AI:</label>
          <label
            className={`${
              writeAi ? "" : "hidden"
            } mx-5 text-red-500 text-sm italic font-bold`}
          >
            Write AI Description first
          </label>
          <div className="grid grid-cols-12">
            <div className="col-span-11">
              <textarea
                placeholder="Message TaskWise AI..."
                className="w-full bg-tertiary h-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
                name="AiRecommendation"
                rows={"2"}
                id="AIrecommendation"
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
            ></textarea>
            </div>
            <div className="ml-2 col-span-1">
              <button
                type="button"
                onClick={aiRecommendHandler}
                className="bg-primary hover:bg-card font-bold rounded-lg w-full h-full text-tertiary"
              >
                Find
              </button>
            </div>
          </div>
          <h1 className="mt-3">TaskWise AI Recommendation:</h1>
          <div>
            <textarea
              placeholder="TaskWise AI Response..."
              className="w-full bg-tertiary h-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
              name="AiRecommendationResponse"
              rows={"5"}
              id="AIrecommendationResponse"
              value={`${aiload?"Loading...":aiResponse}`}
              readOnly
            ></textarea>
          </div>

        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="taskName">Task name:</label>
            <input
              required
              placeholder="Task Name..."
              className="w-full bg-tertiary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
              name="name"
              id="taskName"
            />
          </div>
          <div className="my-3">
            <label htmlFor="taskDescription">Task description:</label>
            <textarea
              placeholder="Task Description"
              className="w-full bg-tertiary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-card"
              name="taskDescription"
              rows={"2"}
              id="taskDescription"
            ></textarea>
          </div>
          {/* AI section */}
          <h1 className="mt-3">Select One Member:</h1>
          <div className="p-3 grid rounded-lg grid-cols-10 bg-tertiary">
            <div className="col-span-5 px-3 rounded-lg">
              <div>
                <h1>Remember Project Members:</h1>
                { projectMembers.length!=0 && projectMembers.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 mt-2 rounded-lg bg-white"
                  >
                    <div className="col-span-6 py-1 px-2">{item.name}</div>
                    <div className="col-span-1">
                      <button
                        type="button"
                        className="bg-primary text-tertiary hover:bg-card py-1 px-2 rounded-xl"
                        onClick={() => addHandlerMember(index, item.id)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-5 px-3 rounded-lg">
              <div>
                <h1>
                  Selected Members:{" "}
                  <span
                    className={`${
                      selectMemberBool ? "" : "hidden"
                    } text-xs text-red-500`}
                  >
                    should select one member
                  </span>
                </h1>
                {selectMember.map((item) => (
                  <div key={item.id} className="mt-2 mr-2 rounded-lg bg-white">
                    <div className="py-1 px-2">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Recommendation section end */}
          <div className="mt-3">
            <h1 className="">Task Deadline:</h1>
            <input
              name="taskDeadline"
              className="w-full bg-tertiary rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-card"
              type="datetime-local"
                required
            />
          </div>
          <div className="flex justify-center">
            <button className="font-bold text-tertiary bg-primary hover:bg-card m-3 rounded-full px-5 py-2">
              Generate Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
