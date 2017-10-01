
var express = require("express");
var path = require("path");
var app = express();
var ds = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;

ds.initialize();


app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees/:empNum", (req,res) => { //:variable
    res.send("Getting Employee Numbers " + req.params.empNum);
    res.json(ds.getEmployeesByNum(req.params.empNum));
});

app.get("/employees", (req,res) => {
    res.send("Trying to find: "+ req.query.status);
    if(req.query.status){
        res.send("Getting Employee Status " + req.query.status);
        res.json(ds.getEmployeesByStatus(req.query.status));
    }else if(req.query.manager){
        res.send("Getting Employee Manager " + req.query.manager);
        res.json(ds.getEmployeesByStatus(req.query.manager));
    }else if(req.query.department){
        res.send("Getting Employee Manager " + req.query.department);
        res.json(ds.getEmployeesByStatus(req.query.department));
    }else {
        res.json(ds.getAllEmployees());
    }
});

app.get("/managers", (req,res)=> {
    res.json(ds.getEmployeesByManager());
});

app.get("/departments", (req,res) =>{
    res.json(ds.getEmployeesByDepartment())
});

app.use((req,res)=>{
res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, function(){
    console.log("App listening on: "+ HTTP_PORT);
});



