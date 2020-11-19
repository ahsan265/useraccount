'use strict';

const user = require('../model/user.js');
const bcrypt = require('bcryptjs');

exports.registerUser = (name,email,password,gender,age,city) => 

	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({

			name: name,
			email: email,
			gender:gender,
			age:age,
			city:city,
			hashed_password: hash,
			created_at: new Date()
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'Pleasse verify User Account !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});