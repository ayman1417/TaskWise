import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import MyProjects from "./Pages/MyProjects";
import ToDo from "./Pages/ToDo";
import Account from "./Pages/Account";
import SettingLayOut from "./Components/settings/SettingLayOut";
import Notification from "./Pages/Notification";
import Cv from "./Pages/Cv";
import Calendar from "./Pages/Calendar";
import Layout from "./Components/LayOut";
import CreatePoject from "./Pages/CreatePoject";
import TaskLayOut from "./Components/TaskLayOut";
import Project from "./Pages/Project";
import CreateTask from "./Pages/CreateTask";
import CreateNote from "./Pages/CreateNote";
import EditeProject from "./Pages/EditeProject";
import EditeNote from "./Pages/EditeNote";
import EditeTask from "./Pages/EditeTask";
import OneToDO from './Pages/OneToDo';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/createproject" element={<CreatePoject />} />
          <Route path="/todo/onetodo/:id" element={<OneToDO />} />
          
          {/* setting rout */}
          <Route path="/setting" element={<SettingLayOut />}>
            <Route path="/setting/account" element={<Account />} />
            <Route path="/setting/notification" element={<Notification />} />
            <Route path="/setting/cv" element={<Cv />} />
          </Route>
          <Route path="/project/:projectId" element={<TaskLayOut />}>
            <Route
              path="/project/:projectId/createtask"
              element={<CreateTask />}
            />
            <Route
              path="/project/:projectId/createnote"
              element={<CreateNote />}
            />
            <Route path="/project/:projectId" element={<Project />} />
            <Route
              path="/project/:projectId/editeproject"
              element={<EditeProject />}
            />
            <Route
              path="/project/:projectId/editenote/:noteID"
              element={<EditeNote />}
            />
            <Route
              path="/project/:projectId/showenote/:noteID"
              element={<EditeNote />}
            />
            <Route
              path="/project/:projectId/editetask/:taskID"
              element={<EditeTask />}
            />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
