import { fetchUser } from "../../../rtk/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);
  // console.log("task", user ? user.tasks : "");

  if (!user) {
    return null; // Return null if user is not loaded yet
  }
  console.log("user",user)
  return (
    <div className="mx-5 my-6 py-3">
      <h1 className="text-2xl font-bold text-primary italic underline">Home</h1>
      <div className="flex flex-wrap gap-6 my-4">
        {user.tasks.map((item) => (
          <div key={item.id} className="bg-tertiary px-3 py-2 rounded-lg" style={{ width: "48%" }}>
            <Link to={`/project/${item.project.id}`} className="flex justify-center font-bold hover:text-card line-clamp-1">
              <h1>{item.project.name}</h1>
            </Link>
              <h1><span className="font-semibold">Task Name:</span> {item.name}</h1>
            <h1 className="font-semibold">Description: </h1>
            <p className="ml-2 line-clamp-3">{item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt corporis sit ipsam explicabo aperiam reprehenderit iusto quaerat asperiores ut, totam eum dicta necessitatibus debitis quidem quo placeat officiis ullam earum. </p>
            <h1><span className="font-semibold">Created:</span> {item.created}</h1>
            <h1><span className="font-semibold">Deadline:</span> {item.deadline ? item.deadline : "Not selected"}</h1>
            <h1><span className="font-semibold">Finished:</span> {item.finished ? "Yes" : "No"}</h1>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Home;
