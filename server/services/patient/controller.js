let modelCloudant = require('../cloudant/model.js');
const generateId = require('uniqid');
const PARTITION = 'patients'
module.exports = (dbConnection)=>{
    return {
        CreatePatient:(req,res)=>{
            let post = req.body;
            post._id = generateId(PARTITION + ':');
            modelCloudant.createDocument(post).then(data=>{
                res.send(data);
            }).catch(err=>res.send(err));
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
        }
    }
    
}