const cfenv = require('cfenv');

let appEnv = cfenv.getAppEnv({
    protocol: "https:",
    // vcapFile: process.env.PWD + '/config/env/vcap.json'
});

appEnv.services.cloudant = {
    url: process.env.CLOUDANT_URL,
    name: process.env.CLOUDANT_DB_NAME
}

module.exports = appEnv;