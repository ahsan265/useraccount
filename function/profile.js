'use strict';

const user = require('../model/user.js');

exports.getProfile = email => 

	new Promise((resolve,reject) => {

		user.find({ email: email }, { name: 1, email: 1,gender:1,age:1,city:1, created_at: 1, _id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});