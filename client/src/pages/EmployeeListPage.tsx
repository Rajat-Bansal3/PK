import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  EmployeeStatus: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<keyof Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        // console.log(response)
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSort = (field: keyof Employee) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(employee.FirstName) ||
      searchRegex.test(String(employee.EmployeeID)) ||
      searchRegex.test(employee.EmployeeStatus)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy && sortOrder) {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue > bValue
        ? -1
        : 1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Employee List</h2>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="p-2 border rounded-md w-full"
          placeholder="Search by Name, EmployeeID, or Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort("EmployeeID")}
            >
              EmployeeID
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort("FirstName")}
            >
              Name
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort("EmployeeStatus")}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.EmployeeID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                <Link to={`/employee/${employee.EmployeeID}`}>
                  {employee.EmployeeID}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/employee/${employee.EmployeeID}`}>
                  {`${employee.FirstName} ${employee.LastName}`}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">{employee.EmployeeStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
