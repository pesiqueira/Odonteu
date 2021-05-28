
const Router = require('express').Router();
const PatientController = require('./patient/controller.js');
const ScheduleController = require('./schedule/controller.js');
const FacebookController = require('./facebook/controller.js');


Router.get('/patients',PatientController.AllPatients);
Router.get('/patients/search/name/:name',PatientController.SearchPatientsByName);
Router.post('/patient',PatientController.CreatePatient);
Router.delete('/patient/:idpaciente',PatientController.DeletePatient);

Router.post('/schedules',ScheduleController.CreateSchedule);
Router.get('/schedules',ScheduleController.AllSchedules);

// Router.get('/facebook/webhook',FacebookController.handleWebHook);
// Router.post('/facebook/webhook',FacebookController.handleWebHook);

module.exports=Router;