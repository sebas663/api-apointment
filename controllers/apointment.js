//File: controllers/apointment.js
var mongoose    =   require('mongoose');

// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

var Apointment  =   require('../models/Apointment');

//GET - Return all apointments in the DB
exports.findAll = function(req, res) {
	var promise = Apointment.find().exec();
	promise.then(function(apointments) {
		console.log('GET /apointments')
		return res.status(200).jsonp(apointments);
	})
	.catch(function(err){
		// just need one of these
		console.log('error:', err);
		return res.send(500, err.message);
	});
};

//GET - Return a apointment with specified ID
exports.findById = function(req, res) {
	var promise = Apointment.findById(req.params.id).exec();
	promise.then(function(apointment) {
		console.log('GET /apointments/' + req.params.id);
		return res.status(200).jsonp(apointment);
	})
	.catch(function(err){
		// just need one of these
		console.log('error:', err);
		return res.send(500, err.message);
	});
};

//POST - Insert a new Apointment in the DB
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var apointment = new Apointment({
		id: req.body.id,
		id_patient: req.body.id_patient,
        id_turn_diary: req.body.id_turn_diary,
        coment: req.body.coment,
        overturned: req.body.overturned,
        status_code: req.body.status_code
	});

	var promise = apointment.save();

	promise.then(function(apointment) {
		return res.status(200).jsonp(apointment);
	})
	.catch(function(err){
		// just need one of these
		console.log('error:', err);
		return res.send(500, err.message);
	});
};

//PUT - Update a register already exists
exports.update= function(req, res) {

	var promise = Apointment.findById(req.params.id).exec();

	promise.then(function(apointment) {
		apointment.id = req.body.id,
		apointment.id_patient = req.body.id_patient,
        apointment.id_turn_diary = req.body.id_turn_diary,
        apointment.coment = req.body.coment,
        apointment.overturned = req.body.overturned,
        apointment.status_code = req.body.status_code
	})
	.then(function(apointment) {
		return res.status(200).jsonp(apointment);
	})
	.catch(function(err){
		// just need one of these
		console.log('error:', err);
		return res.send(500, err.message);
	});
};

//DELETE - Delete a Apointment with specified ID
exports.delete = function(req, res) {
	var promise = Apointment.findById(req.params.id).exec();
	promise.then(function(apointment) {
		return apointment.remove(); // returns a promise
	})
	.then(function(apointment) {
		return res.status(200);
	})
	.catch(function(err){
		// just need one of these
		console.log('error:', err);
		return res.send(500, err.message);
	});
};