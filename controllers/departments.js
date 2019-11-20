const mysql = require("mysql");
const pool = require("../mysql/connection");
const sqlErrorHandler = require("../mysql/error");

const getDepartments = (req, res) => {
  let sql = "SELECT * FROM ??";
  let replacements = ["employees.departments"];
  sql.mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return sqlErrorHandler(err, res);
    return res.json(results);
  });
};

const employeesPerDepartment = (req, res) => {
  let sql = "SELECT ?? AS ??, ?? FROM ?? JOIN ?? WHERE ?? = ?? GROUP BY ??";
  let replacements = [
    "count(*)",
    "employees",
    "dept_name",
    "employees.dept_emp",
    "employees.departments",
    "employees.dept_emp.dept_no",
    "employees.departments.dept_no",
    "dept_name"
  ];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results => {
      if (err) return sqlErrorHandler(res, err);
      return res.json(results);
    })
  );
};
// SELECT count(*) as employees, dept_name
// FROM employees.dept_emp
// JOIN employees.departments
// WHERE
// employees.dept_emp.dept_no = employees.departments.dept_no
// group by
// dept_name

const getDepartmentManagers = (req, res) => {};

module.exports = {
  getDepartments,
  employeesPerDepartment,
  getDepartmentManagers
};
