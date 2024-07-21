import { Link } from "react-router-dom"
export default function CreateProjectButton() {
  return (
    <div className="">
      <Link to='/createproject' className=" hover:bg-card ml-2 bg-primary text-gray-100 font-bold py-2 px-4 rounded">
        Create New Project  
      </Link>
    </div>
  )
}

