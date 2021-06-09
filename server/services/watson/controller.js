let WatsonAssistantModel = require('./model.js');
let CloudantModel = require('../cloudant/model.js');

module.exports = {
    analyzeMessages: function (userId, message){
        return new Promise((resolve, reject)=>{
            WatsonAssistantModel.sendMessage(userId,message).then(output =>{
                console.log(JSON.stringify(output));
                console.log(JSON.stringify(output.intents));
                // if(output.intents[0].intent.toLowerCase()=='agradecer'){
                //     console.log('agradecendo')
                // }
                resolve(output);
            }).catch(reject);
        })
    }
}