import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeFormData } from "../components/forms/EmployeeForm";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeFormData | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employee/${id}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8 text-lg">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="text-center mt-8 text-red-500 text-lg">
        Error loading employee details
      </div>
    );
  }

  // Function to format the date as dd/mm/yyyy
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return "N/A"; // Or any other default value for undefined dates
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleEdit = () => {
    // Navigate to the edit page (replace '/edit' with your actual edit route)
    navigate(`/employee-edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      // Send API request to delete employee
      await axios.delete(`http://localhost:3000/delete-employee/${id}`);
      // Redirect to employee list after successful deletion (replace '/employees' with your actual list route)
      navigate("/employees");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4 text-center">Employee Details</h2>

      <table className="w-full border-collapse table-auto mx-auto">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Employee ID:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.EmployeeID}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              First Name:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.FirstName}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Last Name:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.LastName}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Date of Birth:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {formatDate(employee.DateOfBirth)}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">Gender:</td>
            <td className="py-2 px-4 border-b text-left">{employee.Gender}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">Email:</td>
            <td className="py-2 px-4 border-b text-left">{employee.Email}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Phone Number:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.PhoneNumber}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Address:
            </td>
            <td className="py-2 px-4 border-b text-left">{employee.Address}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Hire Date:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {formatDate(employee.HireDate)}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Termination Date:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {formatDate(employee.TerminationDate)}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Position:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.Position}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Department ID:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.DepartmentID}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">Salary:</td>
            <td className="py-2 px-4 border-b text-left">{employee.Salary}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Manager ID:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.ManagerID}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Employee Status:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.EmployeeStatus}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Social Security Number:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.SocialSecurityNumber}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Emergency Contact:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.EmergencyContact}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Employee Type:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.EmployeeType}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Work Location:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.WorkLocation}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b text-right font-bold">
              Work Email:
            </td>
            <td className="py-2 px-4 border-b text-left">
              {employee.WorkEmail}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-full"
        onClick={handleEdit}
      >
        Edit
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 w-full"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default EmployeeDetail;
