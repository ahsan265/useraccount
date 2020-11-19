'use strict';

const user = require('../model/trackermode.js');
const bcrypt = require('bcryptjs');

exports.registertrackerdata = (email,speed, location, angle,datetime) => 

	new Promise((resolve,reject) => {


		const newUser = new user({

            email:email,
            speed: speed,
			location: location,
			angle: angle,
			datetime: datetime
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'Tracker Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'Tracker Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});