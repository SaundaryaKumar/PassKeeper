const dotenv = require ("dotenv");
dotenv.config({path: './.env'});
const express = require('express');
const Joi = require('joi');
const app = express();
const mysql = require ("mysql");
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({

	port : process.env.DB_PORT,
	host : process.env.DB_HOST,
	password  : process.env.DB_USER,
	database : process.env.DB_PASS,
	connectionLimit : 1000

});

db.connect((error, result) => {
	if(error){
		console.log(error)
	}
	else{
		console.log("mysql connected")
	}
})
app.post('/app/user',(req, res) =>{
	db.query('SELECT username FROM user WHERE username = ?', req.params.username, (error, result) =>{
		if(error){
			console.log(error);
		}

		if(results.length > 0){
			return res.send{
				message : "username already exists"
			}
		}	else{
			let hashedPassword = await bcrypt.hash(req.params.password, 8);
			db.query('INSERT into user SET ?, {username : req.params.username, password : hashedPassword}, (error, result)=>{
				if(error){
					console.log(error);
				}	else {
					res.send({
						'status' : 'account created';
					})
				}                                                         

		}
	})
});

app.post('app/user/auth', (req, res) =>{
	db.query('SELECT username FROM user WHERE username = ?', [req.params.username], (error, results) => {
		if( !results || await bcrypt.compare(password, req.params.password)){
			res.status(401)({
				message : 'The username or password is incorrect';
			});
		}	else {
			console.log("you are logged in")
			res.send({
				'status' : 'succes';
			});
		}
			
		
	});
		
});

app.get('/app/sites?user={userId}', (req, res) =>{

});

app.post('/app/sites?user={userId}', (req, res) =>{

});

const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));