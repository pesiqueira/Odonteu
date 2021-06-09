const MessengerPlatform = require('facebook-bot-messenger');
const WatsonAssistant = require('../watson/controller');
module.exports = (server,app) => {
    var bot = MessengerPlatform.create({
        pageID: '101818218787059',
        appID: '770944250283246',
        appSecret: '58ff9326e94818160727796f7b32a701',
        validationToken: 'paulosenha123',
        pageToken: 'EAAK9K3IuBO4BABqNVSrllZCbDMK1xZBJeshxd5hUyttpoAQTkhmt4qs3pgV8EG4QilPCFmwmAGP1opZA61oSTSEYuMjdag02o0yLx6QEdRdNZCeA6z9G2T0t9KLxCr5XZBSwfWtknMWOFWlyGZAPJlbvBFondVeaMyM8g2uumZCPF8r8lyVYeZCe'
    }, server);
    app.use(bot.webhook('/webhook'));
    bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
        console.log(message.getText());
        WatsonAssistant.analyzeMessages(userId,message.getText()).then(data => {
            bot.sendTextMessage(userId, data.output.generic[0].text);
        }).catch(err => {console.log(err)})
    });
}