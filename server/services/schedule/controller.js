const ScheduleModel = require('./model.js');
module.exports = {
    CreateSchedule(req, res){
        let post = req.body;
        ScheduleModel.CreateSchedule(post).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.sendStatus(500);
            res.send(err)
        });
    },
    AllSchedules:(req,res)=>{
        ScheduleModel.AllSchedules().then(data=>res.send(data)).catch(err=>res.send(err));
    }
}