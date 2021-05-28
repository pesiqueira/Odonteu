let modelCloudant = require('../cloudant/model.js');
const generateId = require('uniqid');
const PARTITION = 'patients'
module.exports = {
    CreatePatient:(req,res)=>{
        let post = req.body;
        post._id = generateId(PARTITION + ':');
        modelCloudant.createDocument(post).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.sendStatus(500);
            res.send(err)
        });
    },
    AllPatients:(req,res)=>{
        let query = {"selector":{"_id":{"$gt":0}}};
        modelCloudant.query(query,PARTITION).then(data=>res.send(data)).catch(err=>res.send(err));
    },
    DeletePatient:(req,res)=>{
        let idpaciente = req.params.idpaciente;
        modelCloudant.findDocument(idpaciente).then((doc)=>
            modelCloudant.deleteDocument(doc).then(data=>res.send(data)).catch(err=>res.send(err))
        ).catch(err =>console.log(err));
    },
    SearchPatientsByName:(req,res)=>{
        let name = req.params.name;
        let query = {"selector":{"name":{"$regex":name}}};
        modelCloudant.query(query,PARTITION).then(data=>res.send(data)).catch(err=>res.send(err));
    }
}