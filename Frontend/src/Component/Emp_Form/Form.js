import { useState } from "react";

const Form = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Phours, setphours] = useState("");
  const [Shours, setshours] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Submit");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);


  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (Firstname.length <= 0) {
      tempErrors["Firstname"] = true;
      isValid = false;
    }
    if (Lastname.length <= 0) {
      tempErrors["Lastname"] = true;
      isValid = false;
    }
    if (Phours <= 0) {
      tempErrors["Phours"] = true;
      isValid = false;
    }
    if (Shours <= 0) {
      tempErrors["Shours"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();
    console.log(isValidForm);
    
    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("https://localhost:44337/Employees/api/EmployeeContext/add", {
        body: JSON.stringify({
          firstname: Firstname,
          lastname: Lastname,
          pto_hours: Phours,
          sick_hours: Shours,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Sent");

        setFirstname("");
        setLastname("");
        setshours("");
        setphours("");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Sent");

      setFirstname("");
      setLastname("");
      setshours("");
      setphours("");
      setButtonText("send");
      setShowSuccessMessage(false);

      console.log(Firstname, Lastname, Phours, Shours);
    }
  };
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg content-center" onSubmit={handleSubmit}>
      <h1 className="text-5xl font-bold mt-0 mb-6 text-center">Add Employee</h1>
      <div className="flex flex-wrap -mx-3 mb-6 ">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            onChange={(e)=> setFirstname(e.target.value)}
            value={Firstname}
          />
          {errors?.Firstname && <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> }
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            onChange={(e)=> setLastname(e.target.value)}
            value={Lastname}
          />
            {errors?.Lastname && <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> }
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Total PTO hours
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="Hours"
            type="number"
            step="0.01"
            onChange={(e)=> setphours(e.target.value)}
            value={Phours}
          />
          {errors?.Phours && <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> }
          <p className="text-gray-600 text-xs italic">
            His/Her total vocation hours 
          </p>
        </div>
        
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Total sick leave hours
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="Hours"
            type="number"
            step="0.01"
            onChange={(e)=> setshours(e.target.value)}
            value={Shours}
          />
          {errors?.Shours && <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> }
          <p className="text-gray-600 text-xs italic">
            His/Her total sick hours 
          </p>
        </div>
        
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            {buttonText}
          </button>
          {showSuccessMessage && <p className="text-grey-500 text-xs italic">
            Submiited.
          </p> }
          {showFailureMessage && <p className="text-red-500 text-xs italic">
            Please try it again !
          </p> }
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </form>
      </div>
  );
};

export default Form;
