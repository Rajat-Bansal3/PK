// EmployeeForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import z from "zod";

export const EmployeeFormDataValidation = z.object({
  FirstName: z.string().max(255).min(3),
  LastName: z.string().max(255).min(3),
  DateOfBirth: z.string().nullable(),
  Gender: z.string().nullable(),
  Email: z.string().email().nullable(),
  PhoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone Number must be 10 digits",
  }),
  Address: z.string().max(2000).nullable(),
  HireDate: z.string(),
  TerminationDate: z.string().nullable(),
  Position: z.string().max(255).nullable(),
  DepartmentID: z.number().refine((value) => /^[1-9]\d{0,2}$/.test(String(value)), {
    message: "Department ID must be a number between 1 and 999",
  }).nullable(),
  Salary: z.number().min(10000).max(10000000).nullable(),
  ManagerID: z.number().refine((value) => /^[1-9]\d{0,2}$/.test(String(value)), {
    message: "Manager ID must be a number between 1 and 999",
  }).nullable(),
  EmployeeStatus: z.string().max(255).nullable(),
  SocialSecurityNumber: z.string().max(255).nullable(),
  EmergencyContact:z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone Number must be 10 digits",
  }),
  EmployeeType: z.string().max(255).nullable(),
  WorkLocation: z.string().max(255).nullable(),
  WorkEmail: z.string().email().max(255).nullable(),
});


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
  } = useForm<EmployeeFormData>({resolver : zodResolver(EmployeeFormDataValidation)});

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
          {errors.DateOfBirth && (
            <span className="text-red-500">{errors.DateOfBirth.message}</span>
          )}
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
          {errors.Gender && (
            <span className="text-red-500">{errors.Gender.message}</span>
          )}
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
          {errors.PhoneNumber && (
            <span className="text-red-500">{errors.PhoneNumber.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Address"
          >
            Address
          </label>
          <textarea {...register("Address")} className="border p-2 w-full" />
          {errors.Address && (
            <span className="text-red-500">{errors.Address.message}</span>
          )}
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
          {errors.HireDate && (
            <span className="text-red-500">{errors.HireDate.message}</span>
          )}
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
          {errors.TerminationDate && (
            <span className="text-red-500">{errors.TerminationDate.message}</span>
          )}
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
          {errors.Position && (
            <span className="text-red-500">{errors.Position.message}</span>
          )}
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
          {errors.DepartmentID && (
            <span className="text-red-500">{errors.DepartmentID.message}</span>
          )}
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
          {errors.Salary && (
            <span className="text-red-500">{errors.Salary.message}</span>
          )}
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
          {errors.ManagerID && (
            <span className="text-red-500">{errors.ManagerID.message}</span>
          )}
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
          {errors.EmployeeStatus && (
            <span className="text-red-500">{errors.EmployeeStatus.message}</span>
          )}
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
          {errors.SocialSecurityNumber && (
            <span className="text-red-500">{errors.SocialSecurityNumber.message}</span>
          )}
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
          {errors.EmergencyContact && (
            <span className="text-red-500">{errors.EmergencyContact.message}</span>
          )}
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
          {errors.EmployeeType && (
            <span className="text-red-500">{errors.EmployeeType.message}</span>
          )}
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
          {errors.WorkLocation && (
            <span className="text-red-500">{errors.WorkLocation.message}</span>
          )}
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
          className="bg-blue-500 w-full items-center justify-center text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
        <button
          type="reset"
          className="bg-red-500 w-full items-center justify-center text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
          onClick={()=>{
            setTimeout(()=>{
              reset()
              toast.info("form reseted successfully")
            })
          }}
        >
          Reset
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeForm;
