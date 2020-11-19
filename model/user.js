'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	name 			: String,
	email			: String, 
	hashed_password	: String,
	gender			: String,
	age				: String,
	city			: String,

	created_at		: String,
	temp_password	: String,
	temp_password_time: String,
	user_confirmed:{
		type: Boolean,
		default: 'false',
	},
	verification_token:String,

});



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tcpvp',{ useNewUrlParser: true ,useUnifiedTopology: true});



module.exports = mongoose.model('accounts', userSchema);