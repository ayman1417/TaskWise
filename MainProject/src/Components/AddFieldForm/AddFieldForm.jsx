import { useState } from 'react';
import PropTypes from 'prop-types';
export default function AddFieldForm( props) {
  // initialize the form fields state
  const [fields, setFields] = useState(props.membersCreated);

  // additiing a new field
  const addField = () => {
    setFields([...fields, { email: '' }]);
  };

  // removaling a field
  const removeField = (index) => {
    if (fields.length != 1 || props.fieldName ==="member") {
      const newFields = fields.filter((field, i) => i !== index);
      setFields(newFields);
    }
  };

  // Handle input change for dynamic fields
  const handleInputChange = (index, event) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, email: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };


  return (
      <div>
        {fields.map((field, index) => (
          <div key={index} className=" mt-1 shadow-md">
            <label className="block  italic text-sm" htmlFor={`field-${index}-${props.fieldName}`}>
              {props.fieldName} {index + 1}:
            </label>
            <div className="flex items-center">
              <input
                required
                name={`${props.fieldName}${index}`}
                id={`field-${index}-${props.fieldName}`}
                type="email"
                value={field.email}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 mb-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-card w-full"
                placeholder={`Enter ${props.fieldName} ${index + 1} Name... `}
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="mx-2 px-3 py-2 rounded-lg font-bold bg-card text-tertiary hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          // style={{:"50%"}}
          type="button"
          onClick={addField}
          className="mt-2 mb-4 font-bold ml-13  text-tertiary hover:bg-card px-4 py-2 bg-primary rounded-lg"
        >
          Add {props.fieldName}
        </button>
      </div>

  )
}
AddFieldForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  membersCreated: PropTypes.array.isRequired,
};