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

    const obj={};
    if(name){
 obj.name= {$regex:name, $options:"i"};
    }
    if(state){
      obj.state={$regex:state, $options:"i"};

    }
   
    if(city){
    obj.city= {$regex:city, $options:"i"};
    }

    if(minPackage){
        obj.minPackage= {$gte:minPackage};
    }
    if(maxFees){
        obj.maxFees= {$lte:maxFees};
    }
    if(course){
        obj.course={$regex:course, $options:"i"};
    }
    if(exam){
        obj.exam= {$regex:exam, $options:"i"};
        
    }
        res.send(await collegeModel.find(obj));
    
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;