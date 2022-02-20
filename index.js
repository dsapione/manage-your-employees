const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
			return;
		}
	})
}

const departmentQuestions = [
	{
		type: 'input',
		name: 'department',
		message: "What is the name of the department?"
	}
];

const roleQuestions = [
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
		// choices: [different departments from sql]
	}
];

const employeeQuestions = [
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
		// choices: [different titles from sql]
	},
	{
		type: 'list',
		name: 'manager',
		message: "Who is the employee's manager?",
		// choices: [current employees names from sql]
	}
];

const updateEmployeeRoleQuestions = [
	{
		type: 'list',
		name: 'employeeName',
		message: "Which employee's role do you want to update?",
		// choices: [current employee names from sql]
	},
	{
		type: 'list',
		name: 'employeeRoleUpdate',
		message: "What role do you want to assign to the selected employee?",
		// choices: [different titles from sql]
	}
];

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
		});
		callQuestion();
	});
};

const addRole = () => {
	inquirer.prompt(roleQuestions).then(answers => {
		const sql = `INSERT INTO role (title, salary, department_id)
		VALUES (?,?,?)`;
		const params = [answers.role, answers.salary, answers.departmentRole];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Added ${answers.role} to the database`);				
		});
		callQuestion();
	});
};

const addEmployee = () => {
	inquirer.prompt(employeeQuestions).then(answers => {
		const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
		VALUES (?,?,?,?)`;
		const params = [answers.firstName, answers.lastName, answers.employeeRole, answers.manager];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Added ${answers.firstName, answers.lastName} to the database`);				
		});
		callQuestion();
	});
};

const updateEmployeeRole = () => {
	inquirer.prompt(updateEmployeeRoleQuestions).then(answers => {
		const sql = `UPDATE employee SET role_id = ?
								WHERE id = ?`;
		const params = [answers.employeeRoleUpdate, answers.employeeName];

		db.query(sql, params, (err, result) => {
			if (err) {
				return err;
			} 
			console.log(`Updated employee's role`);				
		});
		callQuestion();
	});
};

const viewEmployees = () => {
	const sql = `SELECT * FROM employee`;
  db.query(sql, (err, employees) => {
		console.table(employees)
  });
	callQuestion();
};

const viewRoles = () => {
	const sql = `SELECT * FROM role`;
  db.query(sql, (err, roles) => {
		console.table(roles)
  });
	callQuestion();
};

const viewDepartments = () => {
	const sql = `SELECT * FROM department`;
  db.query(sql, (err, departments) => {
		console.table(departments)
  });
	callQuestion();
};

// Function call to initialize app
callQuestion();