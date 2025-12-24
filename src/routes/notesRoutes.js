const express = require("express");
const notesRouter = express.Router();

notesRouter.get('/',(req,res)=>{
    res.status(200).send("get request");
})

notesRouter.post('/notes',(req,res)=>{
    res.status(200).send("notes");
})
module.exports = notesRouter;