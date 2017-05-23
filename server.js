var express     =   require("express");
var compression =   require('compression')
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose    =   require('mongoose');
var Apointment  =   require('./models/Apointment');
var ApointmentCtrl  =   require('./controllers/apointment');

require('dotenv').config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
//app.use(methodOverride());
app.use(compression())

var mongoDB = process.env.MONGODBCON;
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var router      =   express.Router();
router.get("/",function(req,res){
    res.json({"message" : "No hay un recurso aqui!!!"});
});
app.use('/',router);

// API routes
var apointmentRoute = express.Router();

apointmentRoute.route('/apointments')
  .get(ApointmentCtrl.findAll)
  .post(ApointmentCtrl.add);

apointmentRoute.route('/apointments/:id')
  .get(ApointmentCtrl.findById)
  .put(ApointmentCtrl.update)
  .delete(ApointmentCtrl.delete);

app.use('/api', apointmentRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})
