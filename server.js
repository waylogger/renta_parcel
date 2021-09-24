

const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

app.use(express.static('dist'));

app.get('/',async (req,res)=>{
    // const page = await fs.readFile('./index.html');
    res.sendFile(path.resolve(__dirname,'./index.html'));
});



app.listen(3000,(err)=>{
    console.log('listen');
})