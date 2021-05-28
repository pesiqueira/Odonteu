const app = require('./config/express');

const PORT = process.env.PORT || 1607;

app.listen(PORT,()=>{
    console.log('Running at 1607')
})