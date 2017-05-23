//File: controllers/apointment.js
var mongoose    =   require('mongoose');
var Apointment  =   require('../models/Apointment');

//GET - Return all apointments in the DB
exports.findAll = function(req, res) {
	Apointment.find(function(err, apointments) {
    if(err) res.send(500, err.message);

    console.log('GET /apointments')
		res.status(200).jsonp(apointments);
	});
};

//GET - Return a apointment with specified ID
exports.findById = function(req, res) {
	Apointment.findById(req.params.id, function(err, apointment) {
    if(err) return res.send(500, err.message);

    console.log('GET /apointments/' + req.params.id);
		res.status(200).jsonp(apointment);
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

	apointment.save(function(err, apointment) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(apointment);
	});
};

//PUT - Update a register already exists
exports.update= function(req, res) {
	Apointment.findById(req.params.id, function(err, apointment) {
		apointment.id = req.body.id,
		apointment.id_patient = req.body.id_patient,
        apointment.id_turn_diary = req.body.id_turn_diary,
        apointment.coment = req.body.coment,
        apointment.overturned = req.body.overturned,
        apointment.status_code = req.body.status_code
		apointment.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(apointment);
		});
	});
};

//DELETE - Delete a Apointment with specified ID
exports.delete = function(req, res) {
	Apointment.findById(req.params.id, function(err, apointment) {
		apointment.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};