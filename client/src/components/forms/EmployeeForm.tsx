// EmployeeForm.tsx
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface EmployeeFormData {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  DateOfBirth?: string;
  Gender?: string;
  Email?: string;
  PhoneNumber?: string;
  Address?: string;
  HireDate: string;
  TerminationDate?: string;
  Position?: string;
  DepartmentID?: number;
  Salary?: number;
  ManagerID?: number;
  EmployeeStatus?: string;
  SocialSecurityNumber?: string;
  EmergencyContact?: string;
  EmployeeType?: string;
  WorkLocation?: string;
  WorkEmail?: string;
}

const EmployeeForm: React.FC = () => {
  const currDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    return formattedDate;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>();

  const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
    try {
      // Format date strings to remove the time portion
      const formattedData = {
        ...data,
        DateOfBirth: data.DateOfBirth
          ? new Date(data.DateOfBirth).toISOString().split("T")[0]
          : null,
        HireDate: new Date(data.HireDate).toISOString().split("T")[0],
        TerminationDate: data.TerminationDate
          ? new Date(data.TerminationDate).toISOString().split("T")[0]
          : null,
      };

      const response = await axios.post(
        "http://localhost:3000/employee-register",
        formattedData
      );
      console.log("Server response:", response.data);
      toast.success("Employee added successfully", { position: "top-right" });
      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.success("Server error, try again later", { position: "top-right" });
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="FirstName"
          >
            First Name
          </label>
          <input
            type="text"
            {...register("FirstName", { required: "First name is required" })}
            className="border p-2 w-full"
          />
          {errors.FirstName && (
            <span className="text-red-500">{errors.FirstName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Last Name
          </label>
          <input
            type="text"
            {...register("LastName", { required: "Last name is required" })}
            className="border p-2 w-full"
          />
          {errors.LastName && (
            <span className="text-red-500">{errors.LastName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="DateOfBirth"
          >
            Date of Birth
          </label>
          <input
            type="date"
            defaultValue={currDate()}
            {...register("DateOfBirth")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Gender"
          >
            Gender
          </label>
          <select {...register("Gender")} className="border p-2 w-full">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            type="email"
            {...register("Email", { required: "Email is required" })}
            className="border p-2 w-full"
          />
          {errors.Email && (
            <span className="text-red-500">{errors.Email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PhoneNumber"
          >
            Phone Number
          </label>
          <input
            type="tel"
            {...register("PhoneNumber")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Address"
          >
            Address
          </label>
          <textarea {...register("Address")} className="border p-2 w-full" />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="HireDate"
          >
            Hire Date
          </label>
          <input
            type="date"
            defaultValue={currDate()}
            {...register("HireDate")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="TerminationDate"
          >
            Termination Date
          </label>
          <input
            type="date"
            defaultValue={currDate()}
            {...register("TerminationDate")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Position"
          >
            Position
          </label>
          <input
            type="text"
            {...register("Position")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="DepartmentID"
          >
            Department ID
          </label>
          <input
            type="number"
            {...register("DepartmentID")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Salary"
          >
            Salary
          </label>
          <input
            type="number"
            {...register("Salary")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ManagerID"
          >
            Manager ID
          </label>
          <input
            type="number"
            {...register("ManagerID")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="EmployeeStatus"
          >
            Employee Status
          </label>
          <select {...register("EmployeeStatus")} className="border p-2 w-full">
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Terminated">Terminated</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="SocialSecurityNumber"
          >
            Social Security Number
          </label>
          <input
            type="text"
            {...register("SocialSecurityNumber")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="EmergencyContact"
          >
            Emergency Contact
          </label>
          <input
            type="text"
            {...register("EmergencyContact")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="EmployeeType"
          >
            Employee Type
          </label>
          <input
            type="text"
            {...register("EmployeeType")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="WorkLocation"
          >
            Work Location
          </label>
          <input
            type="text"
            {...register("WorkLocation")}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="WorkEmail"
          >
            Work Email
          </label>
          <input
            type="email"
            {...register("WorkEmail", { required: "Work Email is required" })}
            className="border p-2 w-full"
          />
          {errors.WorkEmail && (
            <span className="text-red-500">{errors.WorkEmail.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeForm;
