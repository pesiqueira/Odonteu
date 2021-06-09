let modelCloudant = require('../cloudant/model.js');
const generateId = require('uniqid');
const PARTITION = 'schedules';

module.exports = {
    CreateSchedule(schedule){
        schedule._id = generateId(PARTITION + ':');
        return new Promise((resolve, reject)=>{
            modelCloudant.createDocument(schedule).then(resolve).catch(reject);
        });
    },
    AllSchedules:()=>{
        let query = {"selector":{"_id":{"$gt":0}}};
        return new Promise((resolve, reject)=>{
            modelCloudant.query(query,PARTITION).then(resolve).catch(reject);
        })
    }
}