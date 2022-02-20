const inquirer = require('inquirer');
const cTable = require('console.table');

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
		name: 'title',
		message: "What is the name of the department?"
	}
];

const roleQuestions = [
	{
		type: 'input',
		name: 'title',
		message: "What is the name of the role?"
	},
	{
		type: 'number',
		name: 'title',
		message: "What is the salary of the role?"
	},
	{
		type: 'input',
		name: 'title',
		message: "Which department does the role belong to?"
	}
];

const employeeQuestions = [
	{
		type: 'input',
		name: 'title',
		message: "What is the employee's first name?"
	},
	{
		type: 'input',
		name: 'title',
		message: "What is the employee's last name?"
	},
	{
		type: 'input',
		name: 'title',
		message: "What is the employee's role?"
	},
	{
		type: 'input',
		name: 'title',
		message: "Who is the employee's manager?"
	}
];

const updateEmployeeRoleQuestions = [
	{
		type: 'input',
		name: 'title',
		message: "Which employee's role do you want to update?"
	},
	{
		type: 'input',
		name: 'title',
		message: "What role do you want to assign to the selected employee?"
	}
];

const addDepartment = () => {
	inquirer.prompt(departmentQuestions).then(answers => {
		// sql code
		callQuestion();
	})
};

const addRole = () => {
	inquirer.prompt(roleQuestions).then(answers => {
		// sql code
		callQuestion();
	})
};

const addEmployee = () => {
	inquirer.prompt(employeeQuestions).then(answers => {
		// sql code
		callQuestion();
	})
};

const updateEmployeeRole = () => {
	inquirer.prompt(updateEmployeeRoleQuestions).then(answers => {
		// sql code
		callQuestion();
	})
};

const questions = [

	{
		type: 'input',
		name: 'title',
		message: "What would you like to do?"
	},
	{
		type: 'input',
		name: 'email',
		message: 'What is your email?'
	},
	{
		type: 'input',
		name: 'github',
		message: 'What is your GitHub username?'
	},
	{
		type: 'input',
		name: 'description',
		message: 'Please write a brief description of your project.'
	},
	{
		type: 'confirm',
		name: 'confirmAbout',
		message: 'Will this project have a license?',
		default: true
	},
	{
		type: 'list',
		name: 'license',
		message: 'What license will be used?',
		choices: ['MIT', 'ISC', 'Apache'],
		when: ({ confirmAbout }) => {
			if (confirmAbout) {
				return true;
			} else {
				return false;
			}
		}
	},
]

// Function call to initialize app
callQuestion();