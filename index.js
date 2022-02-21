const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// initial question for the app.
const callQuestion = () => {
	inquirer.prompt({
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
	}).then(({ action }) => {
		if (action === 'Add Department') {
			addDepartment();
		} else if (action === 'Add Role') {
			addRole();
		} else if (action === 'Add Employee') {
			addEmployee();
		} else if (action === 'Update Employee Role') {
			updateEmployeeRole();
		} else if (action === 'View All Employees') {
			viewEmployees();
		} else if (action === 'View All Roles') {
			viewRoles();
		} else if (action === 'View All Departments') {
			viewDepartments();
		} else if (action === 'Quit') {
			process.exit();
		}
	})
}

// questions for addidng department
const departmentQuestions = [
	{
		type: 'input',
		name: 'department',
		message: "What is the name of the department?"
	}
];

// adds depatment to department table in sql
const addDepartment = () => {
	inquirer.prompt(departmentQuestions).then(answers => {
		const sql = `INSERT INTO department (name)
		VALUES (?)`;
		const params = [answers.department];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			}
			console.log(`Added ${answers.department} to the database`);		
			callQuestion();
		});
	});
};

// adds role to the role table in sql
const addRole = async () => {
	const [departments] = await	db.promise().query(`SELECT * FROM department`)
		const deptArray = departments.map(({id, name}) => ({
		name: name,
		value: id
	})); 
	inquirer.prompt([
		{
			type: 'input',
			name: 'role',
			message: "What is the name of the role?"
		},
		{
			type: 'number',
			name: 'salary',
			message: "What is the salary of the role?"
		},
		{
			type: 'list',
			name: 'departmentRole',
			message: "Which department does the role belong to?",
			choices: deptArray
		}
	]).then(answers => {
		const sql = `INSERT INTO role (title, salary, department_id)
		VALUES (?,?,?)`;
		const params = [answers.role, answers.salary, answers.departmentRole];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Added ${answers.role} to the database`);				
			callQuestion();
		});
	});
};

// adds employee to employee table in sql
const addEmployee = async () => {
	const [roles] = await db.promise().query(`SELECT * FROM role`)
	const [employees] = await db.promise().query(`SELECT * FROM employee`)

	const roleArray = roles.map(({id, title}) => ({
		name: title,
		value: id
	}));
	const employeeArray = employees.map(({id, first_name, last_name}) => ({
		name: first_name + ' ' + last_name,
		value: id
	}));

	inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: "What is the employee's first name?"
		},
		{
			type: 'input',
			name: 'lastName',
			message: "What is the employee's last name?"
		},
		{
			type: 'list',
			name: 'employeeRole',
			message: "What is the employee's role?",
			choices: roleArray
		},
		{
			type: 'list',
			name: 'manager',
			message: "Who is the employee's manager?",
			choices: employeeArray
		}
	]).then(answers => {
		const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
		VALUES (?,?,?,?)`;
		const params = [answers.firstName, answers.lastName, answers.employeeRole, answers.manager];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Added ${answers.firstName, answers.lastName} to the database`);				
			callQuestion();
		});
	});
};

// updates employee role in sql
const updateEmployeeRole = async () => {
	const [roles] = await db.promise().query(`SELECT * FROM role`)
	const [employees] = await db.promise().query(`SELECT * FROM employee`)

	const roleArray = roles.map(({id, title}) => ({
		name: title,
		value: id
	}));
	const employeeArray = employees.map(({id, first_name, last_name}) => ({
		name: first_name + ' ' + last_name,
		value: id
	}));
	inquirer.prompt([
		{
			type: 'list',
			name: 'employeeName',
			message: "Which employee's role do you want to update?",
			choices: employeeArray
		},
		{
			type: 'list',
			name: 'employeeRoleUpdate',
			message: "What role do you want to assign to the selected employee?",
			choices: roleArray
		}
	]).then(answers => {
		const sql = `UPDATE employee SET role_id = ?
								WHERE id = ?`;
		const params = [answers.employeeRoleUpdate, answers.employeeName];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Updated employee's role`);				
			callQuestion();
		});
	});
};

// prints employee table from schema.sql
const viewEmployees = () => {
	const sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, role.title AS title,department.name AS department, role.salary AS salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager on employee.manager_id = manager.id`;
  db.query(sql, (err, employees) => {
		console.log(err)
		console.table(employees)
		callQuestion();
  });
};

// prints role table from schema.sql
const viewRoles = () => {
	const sql = `SELECT * FROM role`;
  db.query(sql, (err, roles) => {
		console.table(roles)
		callQuestion();
  });
};

// prints department table from schema.sql
const viewDepartments = () => {
	const sql = `SELECT * FROM department`;
  db.query(sql, (err, departments) => {
		console.table(departments)
		callQuestion();
  });
};

// Function call to initialize app
callQuestion();