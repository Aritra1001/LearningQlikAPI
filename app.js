const express = require('express');
const app = express();
const route = require('./Routes/route');

app.use(route);

app.get('/', (req, res)=>{
    res.send({msg: "Hello from the server"});
})

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Our server is running on ${PORT}`);
})


