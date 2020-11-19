'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const config = require('../config/config.json');



exports.sendverificationemail = email =>

	new Promise((resolve, reject) => {

		const random = randomstring.generate(8);



		user.find({ email: email })

		.then(users => {
			let user= users[0];
			if(!user.email)
			{
				reject({ status: 404, message: 'Email Not Found !' });
			}
           else  if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				let user = users[0];

				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(random, salt);

				user.verification_token = hash;
               // user.temp_password_time = new Date();
            

				return user.save();
			}
		})

		.then(user => {

			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);

			const mailOptions = {

    			from: `"${config.name}" <${config.email}>`,
    			to: email,  
    			subject: 'Email verification ', 
    			html: `Hello ${user.name},

    			     Your  account verification token is <b>${random}</b>. 
    			
    			Thanks,
    			Traficity.`

			};

			return transporter.sendMail(mailOptions);

		})

		.then(info => {

			//console.log(info);
			resolve({ status: 200, message: 'Check mail for instructions' })
		})

		.catch(err => {

			//console.log(err);
			reject({ status: 500, message: 'Internal Server Error !' });

		});
	});

exports.verifyemail = (email, token) => 

	new Promise((resolve, reject) => {
        //console.log("token",token);

		user.find({ email: email })

		// .then(users => {

		// 	

		// 	const diff = new Date() - new Date(user.created_at); 
		// 	const seconds = Math.floor(diff / 1000);
		// 	console.log(`Seconds : ${seconds}`);

        // }) 
        .then(users => {
            let user = users[0];
			if (bcrypt.compareSync(token,user.verification_token)) {

				const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(token, salt);
                console.log("hash",user.verification_token);
				user.user_confirmed = 'true';
				user.verification_token = hash;
				//user.temp_password_time = undefined;

				return user.save();

			} else {

				reject({ status: 401, message: 'Invalid Token !' });
			}
		})

		.then(user => resolve({ status: 200, message: 'User verified successfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});