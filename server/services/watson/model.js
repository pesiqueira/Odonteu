const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
let session;
const ASSISTANTID = '97fc868e-27a6-4cf7-9609-557350f24ab3';
const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'XVmYnbHWuyIFFodHvP9TmxXi8mpXSSM9xaOtZ4ptzunZ',
  }),
  serviceUrl: 'https://gateway.watsonplatform.net/assistant/api',
});

assistant.createSession({
  assistantId: ASSISTANTID
}).then(res => {
    session = res.result;
}).catch(err => {
    console.log(err);
});

module.exports = {
    sendMessage(message) {
        console.log(session);
        return new Promise((resolve, reject)=>{
            assistant.message({
                assistantId: ASSISTANTID,
                sessionId: session.session_id,
                input: {
                  'message_type': 'text',
                  'text': message
                  }
                }).then(res => {
                    resolve(res.result.output.generic[0].text)
                }).catch(err => {
                    reject(err)
                });
        })
        
    }
}