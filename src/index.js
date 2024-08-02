const express = require('express')
const {Worker} = require('worker_threads')

const app = express();

require('dotenv').config();

const port = process.env.port || 5000

let counter = 0;


app.get("/home",async(req,res)=>{
    res.status(200).send("hello User");
})

app.get("/hello",async(req,res)=>{
    res.status(200).json({msg:"hello user!!!!!  how are you??????"});
})

app.get("/",async(req,res)=>{
    counter++;
    res.status(200).json({counter})
})

app.get("/heavy",async(req,res)=>{
    
    let worker = new Worker('./worker.js')

    worker.on("message", (data) =>{
        console.log(data)
        res.status(200).json({data})
    })
  
})
app.listen(port,() =>{
    console.log(`port is running on  ${port}`)
})