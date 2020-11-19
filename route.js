'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./function/register.js');
const login = require('./function/login.js');
const profile = require('./function/profile.js');
const password = require('./function/password.js');
const tracker = require('./function/registertrackerdata.js');
const verifiyuser = require('./function/verifiyuser.js');
const updtprofile=require('./function/updateprofile');
const config = require('./config/config.json');
const e = require('express');

module.exports = router => {

	router.get('/', (req, res) => res.end('Traficity'));

	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);
		

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, config.secret, { expiresIn: "365 days" });
			
				console.log(token)

				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/users', (req, res) => {

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const gender = req.body.gender;

		const age = req.body.age;
		const city = req.body.city;

		console.log(name,email,password,gender,age,city);

		if (!name || !email ||  !password ||  !gender|| !age ||!city || !name.trim() || !email.trim() || !password.trim() || !gender.trim() ||!age.trim()||!city.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(name, email, password,gender,age,city)

			.then(result => {

				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	router.post('/tracker', (req, res) => {

		const email = req.body.email;
		const speed = req.body.speed;
		const location = req.body.location;
		const angle = req.body.angle;
		const datetime=req.body.datetime;

		//console.log(name,email,password);

		if (!email || !speed || !location || !angle || !datetime ||!email.trim() || !speed.trim() || !location.trim()|| !angle.trim()|| !datetime.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			tracker.registertrackerdata(email, speed, location,angle,datetime)

			.then(result => {

				res.setHeader('Location', '/tracker/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.get('/users/:id', (req,res) => {
			
		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;
				console.log(req.body.oldPassword);
			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	// update profile
	router.put('/updateprofile/:id', (req,res) => {

		if (checkToken(req)) {

			const name = req.body.name;
		

			if (!name ||  !name.trim() ) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				updtprofile.updateusernameprofile(req.params.id, name)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	// update gender
	router.put('/updateprofilegender/:id', (req,res) => {

		if (checkToken(req)) {

			const gender = req.body.gender;
		

			if (!gender ||  !gender.trim() ) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				updtprofile.updateusergenderprofile(req.params.id, gender)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	// update age
	router.put('/updateprofileage/:id', (req,res) => {

		if (checkToken(req)) {

			const age = req.body.age;
		

			if (!age ||  !age.trim() ) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				updtprofile.updateuserageprofile(req.params.id, age)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	// update city
	router.put('/updateprofilecity/:id', (req,res) => {

		if (checkToken(req)) {

			const city = req.body.city;
		

			if (!city ||  !city.trim() ) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				updtprofile.updateusercityprofile(req.params.id, city)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	router.post('/users/:id/verifiyuser', (req,res) => {
		console.log( req.body.verification_token,req.params.id)
		const email = req.params.id;
		const token = req.body.verification_token;
		//const newPassword = req.body.password;

		if (!token ||  !token.trim() ) {

			verifiyuser.sendverificationemail(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			verifiyuser.verifyemail(email, token)
			

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	function checkToken(req) {

		const token = req.headers['x-access-token'];
		console.log(token);
		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}
}