const app = require('./config/express');
const server = require('http').Server(app);
const FacebookController = require('./services/facebook/controller')(server,app);

const PORT = process.env.PORT || 1607;

app.listen(PORT,()=>{
    console.log('Running at 1607')
})

server.listen(8080);