const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const {data}=require("./data");
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');

const{connection}=require("./connector");
const collegeModel=connection;

app.get("/findcolleges",async(req,res)=>{
    const name=req.query.name;
    const state=req.query.state;
    const city=req.query.city;
    const minPackage=Number(req.query.minPackage);
    const maxFees=Number(req.query.maxFees);
    const course=req.query.course;
    const exam=req.query.exam;

    if(name){
        res.send(
            await collegeModel.find({
                name:{$regex:name, $options:"i"},
            })
        )
    }
    if(state){
        res.send(
            await collegeModel.find({
               state:{$regex:state, $options:"i"},
            })
        )
    }
    if(city){
        res.send(
            await collegeModel.find({
                city:{$regex:city, $options:"i"},
            })
        )
    }
    if(minPackage){
        res.send(
            await collegeModel.find({
                minPackage:{$gte:minPackage},
            })
        )
    }
    if(maxFees){
        res.send(
            await collegeModel.find({
                maxFees:{$lte:maxFees},
            })
        )
    }
    if(course){
        res.send(
            await collegeModel.find({
                course:{$regex:course, $options:"i"},
            })
        )
    }
    if(exam){
        res.send(
            await collegeModel.find({
                exam:{$regex:exam, $options:"i"},
            })
        )
    }else{
        res.send(await collegeModel.find());
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;