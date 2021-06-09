const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
let sessions=[];
const ASSISTANTID = '97fc868e-27a6-4cf7-9609-557350f24ab3';
const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'XVmYnbHWuyIFFodHvP9TmxXi8mpXSSM9xaOtZ4ptzunZ',
  }),
  serviceUrl: 'https://gateway.watsonplatform.net/assistant/api',
});

const getSession = async (userId) => {
    let date = new Date();
    let time = date.getTime();
    let session = sessions.find((item) => item.userId == userId);
    if(session){
        if(session.expireTime>time){
            session.expireTime = time + 3 * (60 * 1000);
            return session;
        }
    }
    let result = await assistant.createSession({assistantId: ASSISTANTID});
    session = result.result
    session.userId = userId;
    session.expireTime = time + 3 * (60 * 1000);
    sessions.push(session);
    return session;
}
module.exports = {
    sendMessage(userId,message) {
        return new Promise((resolve, reject)=>{
            getSession(userId).then((session)=>{
                assistant.message({
                    assistantId: ASSISTANTID,
                    sessionId: session.session_id,
                    input: {
                        'message_type': 'text',
                        'text': message,
                        options: {
                            return_context: true
                        }
                    }
                }).then(res => {
                    console.log(JSON.stringify(res.result.context));
                    resolve(res.result)
                }).catch(err => {
                    reject(err)
                });
            });
        });
    }
}