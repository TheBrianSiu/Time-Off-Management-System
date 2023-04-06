import { useState } from "react";
import validator from "validator";

const Form = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Begindate, setBegindate] = useState("");
  const [Enddate, setEnddate] = useState("");
  const [Empid, setEmpid] = useState("");
  const [PTO_time, setPTO_time] = useState(true);
  const [Sick_time, setSick_time] = useState(false);
  const [Hours, setHours] = useState("");
  const [Message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Submit");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // trim begin date and end date
  const trimer = (string) =>{
    // let newdate = string.replace('T', ' ');
    // return newdate;
    return string;
  }

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
    if(PTO_time && Sick_time === false){
      tempErrors["Selecttime"] = false;
    }
    if (!isNaN(Begindate)) {
      tempErrors["Begindate"] = true;
      isValid = false;
    }
    if (!isNaN(Enddate)) {
      tempErrors["Enddate"] = true;
      isValid = false;
    }
    if (isNaN(parseInt(Empid,10))) {
      tempErrors["Empid"] = true;
      isValid = false;
    }
    if (Hours.length <= 0) {
      tempErrors["Hours"] = true;
      isValid = false;
    }

    if (Message.length <= 0) {
      tempErrors["Message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(PTO_time);
    console.log(Sick_time);
    let isValidForm = handleValidation();
    console.log(isValidForm);
    if (isValidForm) {
      setButtonText("Sending");
      const res = async () =>{
        try{
          const response = await fetch("https://localhost:44337/Record/add/records", {
            body: JSON.stringify({
              empid: Empid,
              firstname: Firstname,
              lastname: Lastname,
              begindate: Begindate,
              enddate: Enddate,
              hours: Hours,
              pto: PTO_time,
              sick: Sick_time,
              message: Message,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
          if(!response.ok){
            // input error
            return error;
          }
          console.log(response);
          return response.ok;
        }catch(error){
          // api failure
          console.log("connection failure")
          setShowFailureMessage("false")
          setButtonText("send")
          throw error;
        }
      };

      const { error } = await res();

      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Sent");
        setFirstname("");
        setLastname("");
        setBegindate("");
        setEnddate("");
        setEmpid("");
        setHours("");
        setMessage("");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Sent");

      setFirstname("");
      setLastname("");
      setBegindate("");
      setEnddate("");
      setEmpid("");
      setHours("");
      setMessage("");
      setButtonText("send");
      setShowSuccessMessage(true);

      console.log(Firstname, Lastname, Begindate, Enddate, Empid, Hours, Message);
    }
  };
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg content-center" onSubmit={handleSubmit}>
        <h1 className="text-5xl font-bold mt-0 mb-6 text-center">
          Submission
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              onChange={(e) => setFirstname(e.target.value)}
              value={Firstname}
            />
            {errors?.Firstname && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastname(e.target.value)}
              value={Lastname}
            />
            {errors?.Lastname && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-empid"
            >
              Employee ID
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-empid"
              type="number"
              placeholder="1000"
              onChange={(e) => setEmpid(e.target.value)}
              value={Empid}
            />
            {errors?.Empid && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-hours"
            >
              Take-off hours
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="Hours"
              type="number"
              step="0.01"
              placeholder="1.0"
              onChange={(e) => setHours(e.target.value)}
              value={Hours}
            />
            {errors?.Hours && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-start-time"
            >
              begin date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-start-time"
              type="datetime-local"
              placeholder="Jane"
              onChange={(e) => setBegindate(trimer(e.target.value))}
              value={Begindate}
            />
            {errors?.Begindate && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-end-time"
            >
              End date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-end-time"
              type="datetime-local"
              onChange={(e) => setEnddate(trimer(e.target.value))}
              value={Enddate}
            />
            {errors?.Enddate && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-selection"
            >
              Select time
            </label>
            <select className=" bg-gray-200 border border-gray-200 text-gray-700 text-sm rounded py-3 px-4 focus:ring-grey-700 focus:border-grey-700 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-800 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500" 
            id="grid-selection" 
            onChange={e => e.target.value === "PTO" ? setPTO_time(true) && setSick_time(false) : setSick_time(true) && setPTO_time(false)}
            >
              <option selected value="PTO">Paid Time Off (PTO)</option>
              <option value="Sick">Sick Leave</option>
            </select>
            {errors?.Time && (
              <p className="text-red-500 text-xs italic">
                Please select this field.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Reason
            </label>
            <textarea
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
            ></textarea>
            <p className="text-gray-600 text-xs italic">
              Please briefy write down the reason
            </p>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              {buttonText}
            </button>
          </div>
          <div className="md:w-2/3">
            {showSuccessMessage && (
              <p className="text-grey-500 text-xs italic">Submiited.</p>
            )}
            {showFailureMessage && (
              <p className="text-red-500 text-sm italic">
                Please make sure your input is valid !
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
  };

export default Form;
