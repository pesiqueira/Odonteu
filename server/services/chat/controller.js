let WatsonAssistant = require('../watson/controller');

module.exports = {
    receiveMessage(req, res){
        let userId = req.body.userId;
        let message = req.body.message;
        if(!userId || !message) return res.sendStatus(400);

        WatsonAssistant.analyzeMessages(userId,message).then(output=>{
            res.send(output);
        }).catch((err) => {res.send(err)});
    }
}