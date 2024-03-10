import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployeePage = () => {
//   const currDate = () => {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
//     const day = currentDate.getDate();

//     const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
//       day < 10 ? "0" + day : day
//     }`;
//     return formattedDate;
//   };

  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName: "",
    DateofBirth: "",
    Gender: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    HireDate: "",
    TerminationDate: "",
    Position: "",
    DepartmentID: 0,
    Salary: 0,
    ManagerID: 0,
    EmployeeStatus: "",
    SocialSecurityNumber: "",
    EmergencyContact: "",
    EmployeeType: "",
    WorkLocation: "",
    WorkEmail: "",
  });

  const history = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employee/${id}`
        );
        setEmployee(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Send API request to update employee details
      await axios.put(`http://localhost:3000/update-employee/${id}`, employee);

      // Redirect to employee list after successful update
      history("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Edit Employee</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          First Name:
        </label>
        <input
          type="text"
          name="FirstName"
          value={employee.FirstName}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Last Name:
        </label>
        <input
          type="text"
          name="LastName"
          value={employee.LastName}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date of Birth:
        </label>
        <input
          type="text"
          name="DateOfBirth"
          value={employee.DateofBirth}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gender:
        </label>
        <input
          type="text"
          name="Gender"
          value={employee.Gender}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="text"
          name="Email"
          value={employee.Email}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number:
        </label>
        <input
          type="text"
          name="PhoneNumber"
          value={employee.PhoneNumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address:
        </label>
        <input
          type="text"
          name="Address"
          value={employee.Address}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Hire Date:
        </label>
        <input
          type="text"
          name="HireDate"
          value={employee.HireDate.slice(0, 10)}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Termination Date:
        </label>
        <input
          type="text"
          name="TerminationDate"
          value={employee.TerminationDate.slice(0, 10)}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Position:
        </label>
        <input
          type="text"
          name="Position"
          value={employee.Position}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Department ID:
        </label>
        <input
          type="number"
          name="DepartmentID"
          value={employee.DepartmentID}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Salary:
        </label>
        <input
          type="number"
          name="Salary"
          value={employee.Salary}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Manager ID:
        </label>
        <input
          type="number"
          name="ManagerID"
          value={employee.ManagerID}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Employee Status:
        </label>
        <input
          type="text"
          name="EmployeeStatus"
          value={employee.EmployeeStatus}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Social Security Number:
        </label>
        <input
          type="text"
          name="SocialSecurityNumber"
          value={employee.SocialSecurityNumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Emergency Contact:
        </label>
        <input
          type="text"
          name="EmergencyContact"
          value={employee.EmergencyContact}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Employee Type:
        </label>
        <input
          type="text"
          name="EmployeeType"
          value={employee.EmployeeType}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Work Location:
        </label>
        <input
          type="text"
          name="WorkLocation"
          value={employee.WorkLocation}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Work Email:
        </label>
        <input
          type="text"
          name="WorkEmail"
          value={employee.WorkEmail}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Save button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditEmployeePage;
