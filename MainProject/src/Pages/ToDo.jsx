import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../rtk/Slices/userSlice";
import moment from "moment";

import { TODOList, baseURL } from "../API/API";
import { Link } from "react-router-dom";

export default function ToDo() {
  const [CanEdit, setEdit] = useState(false);
  const [EditListId, SetEditListId] = useState(null);
  const [NewList, setNewList] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [Lists, SetLists] = useState([]);
  const [IsHovered, setIsHovered] = useState(false);
  const [ListDetails, setListDetails] = useState(null);
  const [HoveredListId, setHoveredListId] = useState(null);

  const now = moment();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  const MakeList = async () => {
    if (NewList.trim() === "") return;
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${baseURL}${TODOList}`,
        { name: NewList },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("New ToDoList created:", response.data);

      SetLists([...Lists, response.data]);
      setNewList("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating ToDoList:", error);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}${TODOList}`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        SetLists(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchLists();
  }, []);

  const EditList = async () => {
    if (NewList.trim() === "") return;
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${baseURL}${TODOList}${EditListId}/`,
        { name: NewList },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ToDoList updated:", response.data);

      SetLists((prevLists) =>
        prevLists.map((list) =>
          list.id === EditListId ? { ...list, name: NewList } : list
        )
      );
      setNewList("");
      SetEditListId(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating ToDoList:", error);
      setIsOpen(false);
    }
  };

  const handleSave = () => {
    if (EditListId !== null) {
      EditList();
    } else {
      MakeList();
    }
    setEdit(false);
    SetEditListId(null);
    setNewList("");
    setIsOpen(false);
  };

  const handleCanEdit = () => {
    setEdit(true);
  };

  const handleChange = (event) => {
    setNewList(event.target.value);
  };

  const handleEdit = (listId, listName) => {
    SetEditListId(listId);
    setNewList(listName);
    setIsOpen(true);
  };

  const handleMouseEnter = async (listId) => {
    setHoveredListId(listId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}${TODOList}${listId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setListDetails(response.data);
      setIsHovered(true);
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredListId(null);
    setListDetails(null);
  };

  const handleDelete = async (listId) => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}${TODOList}${listId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      SetLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error deleting ToDoList:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNewList("");
  };

  return (
    <div className="bg-white mx-4 mt-2 rounded-lg pb-7">
      <div className="flex flex-col space-x-30">
        <h1 className="text-black text-xl p-1">Let's Reach Our Goals.</h1>

        <div
          className="max-w-xl w-full bg-card p-6 rounded-lg shadow-lg relative"
          style={{ height: "600px" }}
        >
          <div className="flex items-center space-x-2">
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
            <h1 className="text-secondary text-3xl font-bold">To-Do Lists</h1>
          </div>
          <div
            className="task-container To_do_H overflow-y-auto p-3"
            style={{ maxHeight: "100%", height: "calc(100% - 60px)" }}
          >
            {Lists.map((L) => (
              <div className="flex relative" key={L.id}>
                <div
                  className="flex-grow flex-shrink-0 bg-yellow-500 hover:bg-secondary rounded text-center text-white text-lg px-10 py-2 my-2 ml-auto relative"
                  onMouseEnter={() => handleMouseEnter(L.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link className="block w-full" to={`/todo/onetodo/${L.id}`}>
                    {L.name}
                  </Link>
                </div>
                {CanEdit && (
                  <div className="flex">
                    <button
                      className="bg-yellow-500 hover:bg-secondary rounded text-white mx-5 p-1 px-4 my-2"
                      onClick={() => handleEdit(L.id, L.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-secondary rounded text-white my-2 px-2 p-1"
                      onClick={() => handleDelete(L.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          
          {IsHovered && ListDetails && (
            <div className="absolute right-12 top-0 wCard hCard bg-card border border-secondary-300 shadow-lg p-10 rounded-lg hover-details">
              <h2 className="text-lg font-bold text-white">
                {ListDetails.name}
              </h2>
              <p className="text-sm text-white">Description of the list</p>
            </div>
          )}

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
                    onChange={handleChange}
                    value={NewList}
                    placeholder="List Name"
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
        <div className="flex   space-x-10 ">
            <div className="    But    -my-24      ">
              <button
                type="button"
                className="    bg-yellow-500 text-white text-lg font-bold w-64 m-2 mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300 px-4 py-1 "
                onClick={openModal}
              >
                Add
              </button>
              {CanEdit ? (
                <button
                  className="   bg-yellow-500 text-white text-lg font-bold w-64  mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300 px-4 py-1 "
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="   bg-yellow-500 text-white text-lg font-bold w-64   mt-4 rounded hover:bg-secondary focus:outline-none focus:ring focus:border-blue-300 px-4 py-1"
                  onClick={handleCanEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </div>


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
          .hover-details {
            right: -600px;
            animation: slideIn 0.3s forwards;
          }
          @keyframes slideIn {
            from {
              right: -450px;
            }
            to {
              right: 100;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
