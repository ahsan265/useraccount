'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (email, password) => 

	new Promise((resolve,reject) => {

		user.find({email: email})

		.then(users => {
			//console.log(users)
			   let user=users[0];
			   if(!user.user_confirmed)
			   {
				reject({ status: 404, message: 'Please verfity account first !' }); 
			   }
			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {
				return users[0];

			}
		})

		.then(user => {

			const hashed_password = user.hashed_password;

			if (bcrypt.compareSync(password, hashed_password)) {

				resolve({ status: 200, message: email });

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})
		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});