import { useState } from "react";
import PropTypes from "prop-types";

export default function UploadElement(props) {
  const [, setElement] = useState("");
  console.log("hello")
  const handleElement = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setElement(file);

    const formData = new FormData();
    formData.append(props.type, file);

    // Call the parent callback to handle file upload
    props.onFileUpload(file);
  };

  return (
    <div>
      <input
        id="upload"
        className="hidden"
        type="file"
        name="file"
        onChange={handleElement}
      />
      <label
        htmlFor="upload"
        className="inline-block cursor-pointer font-bold hover:bg-card bg-primary px-6 text-tertiary py-2 rounded-lg"
      >
        {props.text}
      </label>
    </div>
  );
}

UploadElement.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onFileUpload: PropTypes.func.isRequired,
};
