//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ApointmentSchema = new Schema({
        id: Number,
        id_patient: Number,
        id_turn_diary: Number,
        coment: String,
        overturned: Boolean,
        status_code: String
});
// the schema is useless so far
// we need to create a model using it
var Apointment = mongoose.model('Apointment', ApointmentSchema);

// make this available to our users in our Node applications
module.exports = Apointment;