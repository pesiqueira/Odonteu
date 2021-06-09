let WatsonAssistantModel = require('./model.js');
let ScheduleModel = require('../schedule/model');

module.exports = {
    analyzeMessages: function (userId, message){
        return new Promise((resolve, reject)=>{
            WatsonAssistantModel.sendMessage(userId,message).then((result) =>{
                let output = result.output;
                let context = result.context;
                if(output.intents.length>0)
                    if(output.intents[0].intent.toLowerCase()=='agradecer'){
                        let scheduleData = context.skills["main skill"].user_defined;
                        ScheduleModel.CreateSchedule({
                            patient:{
                                name: scheduleData.username
                            },
                            date: scheduleData.scheduleDate,
                            time: scheduleData.scheduleTime
                        })
                    }
                resolve(output);
            }).catch(reject);
        })
    }
}