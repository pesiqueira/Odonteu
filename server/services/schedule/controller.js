let modelCloudant = require('../cloudant/model.js');
const generateId = require('uniqid');
const PARTITION = 'schedules';

module.exports = {
    CreateSchedule(req, res){
        let post = req.body;
        post._id = generateId(PARTITION + ':');
        modelCloudant.createDocument(post).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.sendStatus(500);
            res.send(err)
        });
    },
    AllSchedules:(req,res)=>{
        let query = {"selector":{"_id":{"$gt":0}}};
        modelCloudant.query(query,PARTITION).then(data=>res.send(data)).catch(err=>res.send(err));
    },
}