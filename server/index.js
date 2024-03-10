const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee",
});

db.connect((e) => {
  if (e) {
    console.error("Error connecting to database:", e);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", function (req, res) {
  res.send("test");
});

app.post("/employee-register", async (req, res) => {
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Gender,
    Email,
    PhoneNumber,
    Address,
    HireDate,
    TerminationDate,
    Position,
    DepartmentID,
    Salary,
    ManagerID,
    EmployeeStatus,
    SocialSecurityNumber,
    EmergencyContact,
    EmployeeType,
    WorkLocation,
    WorkEmail,
  } = req.body;

  const insertEmployeeQuery = `
    INSERT INTO employee (
      FirstName,
      LastName,
      DateOfBirth,
      Gender,
      Email,
      PhoneNumber,
      Address,
      HireDate,
      TerminationDate,
      Position,
      DepartmentID,
      Salary,
      ManagerID,
      EmployeeStatus,
      SocialSecurityNumber,
      EmergencyContact,
      EmployeeType,
      WorkLocation,
      WorkEmail
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await db
      .promise()
      .execute(insertEmployeeQuery, [
        FirstName,
        LastName,
        DateOfBirth,
        Gender,
        Email,
        PhoneNumber,
        Address,
        HireDate,
        TerminationDate,
        Position,
        DepartmentID,
        Salary,
        ManagerID,
        EmployeeStatus,
        SocialSecurityNumber,
        EmergencyContact,
        EmployeeType,
        WorkLocation,
        WorkEmail,
      ]);

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/employees", async (req, res) => {
  const query = "SELECT * FROM employee";

  try {
    const [rows, fields] = await db.promise().query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM employee WHERE EmployeeID = ?";

  try {
    const [rows, fields] = await db.promise().query(query, [id]);

    if (rows.length === 1) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/update-employee/:id", async (req, res) => {
  const id = req.params.id;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Gender,
    Email,
    PhoneNumber,
    Address,
    HireDate,
    TerminationDate,
    Position,
    DepartmentID,
    Salary,
    ManagerID,
    EmployeeStatus,
    SocialSecurityNumber,
    EmergencyContact,
    EmployeeType,
    WorkLocation,
    WorkEmail,
  } = req.body;

  // Convert date strings to JavaScript Date objects
  const hireDate = new Date(HireDate);
  const terminationDate = TerminationDate ? new Date(TerminationDate) : null;

  // Format dates to match the database date format
  const formattedHireDate = hireDate.toISOString().split("T")[0];
  const formattedTerminationDate = terminationDate
    ? terminationDate.toISOString().split("T")[0]
    : null;

  const updateEmployeeQuery = `
    UPDATE employee
    SET
      FirstName = ?,
      LastName = ?,
      DateOfBirth = ?,
      Gender = ?,
      Email = ?,
      PhoneNumber = ?,
      Address = ?,
      HireDate = ?,
      TerminationDate = ?,
      Position = ?,
      DepartmentID = ?,
      Salary = ?,
      ManagerID = ?,
      EmployeeStatus = ?,
      SocialSecurityNumber = ?,
      EmergencyContact = ?,
      EmployeeType = ?,
      WorkLocation = ?,
      WorkEmail = ?
    WHERE EmployeeID = ?
  `;

  try {
    await db
      .promise()
      .execute(updateEmployeeQuery, [
        FirstName,
        LastName,
        DateOfBirth,
        Gender,
        Email,
        PhoneNumber,
        Address,
        formattedHireDate,
        formattedTerminationDate,
        Position,
        DepartmentID,
        Salary,
        ManagerID,
        EmployeeStatus,
        SocialSecurityNumber,
        EmergencyContact,
        EmployeeType,
        WorkLocation,
        WorkEmail,
        id,
      ]);

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/delete-employee/:id", async (req, res) => {
  const id = req.params.id;
  const deleteEmployeeQuery = "DELETE FROM employee WHERE EmployeeID = ?";

  try {
    // Execute the delete query
    await db.promise().execute(deleteEmployeeQuery, [id]);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port || 5000, () =>
  console.log(`Example app listening on port ${port}!`)
);
