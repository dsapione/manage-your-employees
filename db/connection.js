const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Hit me with your best shot',
    database: 'tracker'
  },
  console.log(`
	╔╦╗╔═╗╔╗╔╔═╗╔═╗╔═╗         
	║║║╠═╣║║║╠═╣║ ╦║╣          
	╩ ╩╩ ╩╝╚╝╩ ╩╚═╝╚═╝
	╦ ╦╔═╗╦ ╦╦═╗               
	╚╦╝║ ║║ ║╠╦╝               
	 ╩ ╚═╝╚═╝╩╚═               
	╔═╗╔╦╗╔═╗╦  ╔═╗╦ ╦╔═╗╔═╗╔═╗
	║╣ ║║║╠═╝║  ║ ║╚╦╝║╣ ║╣ ╚═╗
	╚═╝╩ ╩╩  ╩═╝╚═╝ ╩ ╚═╝╚═╝╚═╝
	`)
);

module.exports = db;