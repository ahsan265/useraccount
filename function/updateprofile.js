'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const config = require('../config/config.json');




//user profile name
exports.updateusernameprofile = (email,name) => 

	new Promise((resolve, reject) => {
      
        // console.log(email,name);

		user.find({ email: email })

 
        .then(users => {
            let user = users[0];
			if (users.length!=0) {
                user.name=name;
				return user.save();

			} else {

				reject({ status: 401, message: 'Failed to Update Name !' });
			}
		})

		.then(user => resolve({ status: 200, message: 'Name Updated successfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});

	// user profile gender
	exports.updateusergenderprofile = (email,gender) => 

	new Promise((resolve, reject) => {
      
       // console.log(email,gender);

		user.find({ email: email })

 
        .then(users => {
            let user = users[0];
			if (users.length!=0) {
                user.gender=gender;
				return user.save();

			} else {

				reject({ status: 401, message: 'Failed to Update Gender!' });
			}
		})

		.then(user => resolve({ status: 200, message: 'Gender Updated successfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});
	//user age
	exports.updateuserageprofile = (email,age) => 

	new Promise((resolve, reject) => {
      
        //console.log(email,age);

		user.find({ email: email })

 
        .then(users => {
            let user = users[0];
			if (users.length!=0) {
                user.age=age;
				return user.save();

			} else {

				reject({ status: 401, message: 'Failed to update Date of Birth!' });
			}
		})

		.then(user => resolve({ status: 200, message: 'Date of Birth Updated successfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});
	//user city
	exports.updateusercityprofile = (email,city) => 

	new Promise((resolve, reject) => {
      
      //  console.log(email,city);

		user.find({ email: email })

 
        .then(users => {
            let user = users[0];
			if (users.length!=0) {
                user.city=city;
				return user.save();

			} else {

				reject({ status: 401, message: 'Failed to update City!' });
			}
		})

		.then(user => resolve({ status: 200, message: 'City Updated successfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});