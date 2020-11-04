
module.exports=(dbConnection)=>{
    const Router = require('express').Router();
    const PatientController = require('./patient/controller.js') (dbConnection);
    
    Router.post('/patient',PatientController.CreatePatient);

    Router.get('/patients',PatientController.AllPatients);

    Router.delete('/patient/:idpaciente',PatientController.DeletePatient);

    return Router
};