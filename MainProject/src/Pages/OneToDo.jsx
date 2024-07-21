import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../rtk/Slices/userSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import userSlice, { userInfo } from "../../rtk/Slices/userSlice";
import { baseURL } from "../API/API";
import { TODO } from "../API/API";
export default function OneToDO() {
  const [ToDoItems, setToDoItems] = useState([]);
  const [CanEdit, setEdit] = useState(false);
  const [EditToDoId, setEditToDoId] = useState(null);

  const [IsOpen, setIsOpen] = useState(false);
  const [Done, setDone] = useState([]);
  const [Empty_ToDo, setEmpty_ToDo] = useState(true);
  const [Empty_Done, setEmpty_Done] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const [NewToDoItem, setNewToDoItem] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");

  const now = moment();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);
  const LID = useParams();

  useEffect(() => {
    const fetchToDoItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/${TODO}`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        setToDoItems(response.data);
      } catch (error) {
        console.error("Error fetching ToDoItems:", error);
      }
    };

    fetchToDoItem();
  }, []);

  const MakeToItem = async () => {
    if (
      NewToDoItem.trim() === "" ||
      Description.trim() === "" ||
      Date.trim() === ""
    ) {
      return;
    }
    const formattedDate = moment(Date).format("YYYY-MM-DD");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/${TODO}`,
        {
          todo_list: LID.id,
          title: NewToDoItem,
          description: Description,
          due_date: formattedDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("New ToDoList created:", response.data);

      setToDoItems([...ToDoItems, response.data]);
      setNewToDoItem("");
      setDescription("");
      setDate("");
      setEmpty_ToDo(false);
      setEmpty_ToDo(true);
      // SetLIST(true);
    } catch (error) {
      console.error("Error creating ToDoList:", error);
    }
  };

  const EditToDo = async () => {
    if (NewToDoItem.trim() === "") return;
    if (Description.trim() === "") return;
    if (Date.trim() === "") return;
    const formattedDate = moment(Date).format("YYYY-MM-DD");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/${TODO}${EditToDoId}/`,
        {
          todo_list: LID.id,
          title: NewToDoItem,
          description: Description,
          due_date: formattedDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ToDoList updated:", response.data);

      setToDoItems((prevToDo) =>
        prevToDo.map((ToDo) =>
          ToDo.id === EditToDoId
            ? {
                ...ToDo,

                title: NewToDoItem,
                description: Description,
                due_date: Date,
              }
            : ToDo
        )
      );
      setNewToDoItem("");
      setDescription("");
      setDate("");
      setEditToDoId(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating ToDoList:", error);
      setIsOpen(false);
    }
  };

  /*  Api */

  const handleSave = () => {
    if (EditToDoId !== null) {
      EditToDo();
    } else {
      MakeToItem();
    }
    setEdit(false);
    setEditToDoId(null);
    setNewTask("");
    setDescription("");
    setDate("");
    setIsOpen(false);
  };

  const handleCanEdit = () => {
    setEdit(true);
  };

  //////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /*  Done */
  const handleDone = async (TodoID) => {
    try {
      const token = localStorage.getItem("token");
      const ToDoMove = ToDoItems.find((Todo) => Todo.id === TodoID);

      if (!ToDoMove) {
        console.error("Task not found.");
        return;
      }

      const response = await axios.patch(
        `${baseURL}/${TODO}${TodoID}/`,
        {
          completed: true,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setToDoItems((prevToDoItems) =>
        prevToDoItems.filter((todo) => todo.id !== TodoID)
      );
      setDone([...Done, ToDoMove]);
      setEmpty_Done(false);
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleTitle = (event) => {
    setNewToDoItem(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  /*  EDIT */
  const handleEdit = (taskId, taskName) => {
    setEditToDoId(taskId);
    setNewToDoItem(taskName);
    setIsOpen(true);
  };

  /*  Delete */

  const handleDelete = async (ToDotId) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${baseURL}/${TODO}${ToDotId}`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setToDoItems((prevToDos) =>
        prevToDos.filter((ToDo) => ToDo.id !== ToDotId)
      );
    } catch (error) {
      console.error("Error deleting ToDoList:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  /*  MODEl */
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNewToDoItem("");
    setDate("");
    setDescription("");
  };
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredItem(null);
  };

  return (
    <div className=" bg-white mx-4 mt-2 rounded-lg pb-7">
      <div className="flex flex-col space-x-30">
        <h1 className="text-black text-xl p-1">Let's Reach Our Goals.</h1>

        {/* To Do Section */}
        <div
          className="max-w-xl w-full bg-card p-6 rounded-lg shadow-lg"
          style={{ height: "600px" }}
        >
          <div className="flex items-center p-1 space-x-2">
            <svg
              width="8%"
              height="10%"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#F69C0C"
                d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"
              />
            </svg>
            <h1 className="text-secondary text-3xl  font-bold">To-Do</h1>
          </div>
          <div
            className="task-container To_do_H overflow-y-auto p-3"
            style={{ maxHeight: "100%", height: "calc(100% - 60px)" }}
          >
            {ToDoItems.map((D) => (
              <ul
                key={D.id}
                className="overflow-hidden text-ellipsis bg-slate-50 my-3 py-2 rounded-lg shadow-lg px-1 mx-auto"
                onMouseEnter={() => handleMouseEnter(D)}
                onMouseLeave={() => handleMouseLeave()}
                style={{ position: "relative" }}
              >
                {D.title}
                
                {CanEdit && (
                  <div className="flex space-x-1">
                    <button
                      className="Pos ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-sm px-2"
                      onClick={() => handleEdit(D.id, D.title)}
                    >
                      Edit
                    </button>
                    <button
                      className="Pos ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-sm px-2"
                      onClick={() => handleDone(D.id)}
                    >
                      Done
                    </button>
                    <button
                      className="Pos ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-sm px-2"
                      onClick={() => handleDelete(D.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Tooltip */}
                {isHovered && (
                  <div className="tooltip">
                    <p>Title: {hoveredItem.title}</p>
                    <p>Description: {hoveredItem.description}</p>
                    <p>
                      Date:{" "}
                      {moment(hoveredItem.due_date).format("MMMM Do YYYY")}
                    </p>
                  </div>
                )}
              </ul>
            ))}
          </div>

          {/* Add Save Edit */}
          <div className="flex space-x-2 mt-4">
            <button
              type="button"
              className="mx_Button my-9 ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-base  px-10 py-1 "
              onClick={openModal}
            >
              Add
            </button>
            {CanEdit ? (
              <button
                className="mx_Button my-9 ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-base  px-9 py-1"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="mx_Button my-9 ml-auto bg-yellow-500 hover:bg-secondary rounded text-white text-base  px-10 py-1"
                onClick={handleCanEdit}
              >
                Edit
              </button>
            )}
          </div>

          {/* New To-Do Section */}
          {IsOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close-button" onClick={closeModal}>
                  &times;
                </span>
                <div className="input-container">
                  <input
                    autoFocus
                    className="input-field"
                    type="text"
                    onChange={handleTitle}
                    placeholder="Title"
                  />
                  <input
                    className="input-field"
                    type="text"
                    onChange={handleDescription}
                    placeholder="Description"
                  />
                  <input
                    className="input-field"
                    type="date"
                    onChange={handleDate}
                  />
                  <button
                    className="bg-yellow-500 text-white text-lg font-bold w-full py-2 mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300"
                    onClick={handleSave}
                  >
                    {CanEdit ? "Save" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Done Section */}
        <div
          className="absolute my-9 right-5 max-w-xl w-full bg-secondary p-5 rounded-lg shadow-lg"
          style={{ height: "590px" }}
        >
          <div className="flex items-center space-x-1">
            <svg
              width="30px"
              height="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#0B5B5B"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
            <h1 className="text-card text-3xl  p-1 font-bold">Done</h1>
          </div>
          {Empty_Done && (
            <h1 className="text-white text-3xl">There Is No Done Yet</h1>
          )}
          <div
            className="done-container Done_H overflow-y-auto p-3"
            style={{ maxHeight: "100%", height: "calc(100% - 60px)" }}
          >
            {Done.map((tooDoo) => (
              <ul
                key={tooDoo.id}
                className="flex items-center justify-between overflow-hidden text-ellipsis bg-slate-50 my-3 py-2 rounded-lg shadow-lg px-1 mx-auto"
              >
                <span>{tooDoo.title}</span>
                <svg
                  className="ml-3"
                  width="50px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#0B5B5B"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>
              </ul>
            ))}
          </div>
        </div>

        {/* Injected CSS for Modal */}
        <style jsx>{`
          .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
          }
          .modal-content {
            background-color: #fefefe;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            margin: auto;
            position: relative;
          }
          .close-button {
            color: #094b4b;
            font-size: 28px;
            font-weight: bold;
            position: absolute;
            top: 1px;
            right: 15px;
            cursor: pointer;
          }
          .input-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .input-field {
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
          .tooltip {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 999;
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
