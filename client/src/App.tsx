// App.tsx
import { Routes, Route, Link } from "react-router-dom";
import { FaPencilAlt, FaList } from "react-icons/fa";

import EmployeeForm from "./components/forms/EmployeeForm";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeDetail from "./pages/EmployeeDetail";
import EditEmployeePage from "./pages/EditEmployeePage";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center w-full">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-xl mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Employee Registration System
        </h1>
        <nav className="mb-4 w-full m-auto flex-2 justify-evenly ">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-black text-xl flex items-center">
                <span className="mr-2">
                  <FaPencilAlt />
                </span>
                Registration
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className="text-black text-xl flex items-center"
              >
                <span className="mr-2">
                  <FaList />
                </span>
                List
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/" element={<EmployeeForm />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/employee-edit/:id" element={<EditEmployeePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
