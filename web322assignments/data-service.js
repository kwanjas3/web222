var path = require("path");
var fs = require("fs");

var departments = [];
var employees = [];
exports.initialize =  () =>{
    return new Promise(function(resolve, reject){
        //code parse the string here
        fs.readFile("./data/departments.json", (err, data)=>{
            if (err){
                reject("Cannot read file");
            }
            if (data){
                departments = JSON.parse(data);
               // console.log(exports.departments.length)
            }
        });
        fs.readFile("./data/employees.json", (err, data)=>{
            if(err){
                reject("cannot read file");
            }
            if(data){
                employees = JSON.parse(data);
                //console.log(exports.employees.length);
                resolve();
            }
        });

    });
}

exports.getAllEmployees = () => {
    return new Promise((resolve,reject)=>{
        if (employees.length == 0){
            reject("Error Loading Files");
        }else{
            resolve(employees);
        }
    });

}

exports.getEmployeesByStatus = (stat) => {

    return new Promise(function (resolve, reject){
        var tmpStat = [];
        for (let i = 0; i < employees.length; i++){
            if (employees[i].status == stat){
                tmpStat.push(employees[i]);
            }
        }
        if (tmpStat.length == 0){
            reject("No Results for Status: "+ stat);
        }else{
            resolve(tmpStat);
        }
    });

}

exports.getEmployeesByDepartment = (departments) =>{
    return new Promise(function(resolve, reject){
        var tmpDep = [];
        for (let i = 0; i < employees.length; i++){
            if (employees[i].department == departments){
                tmpDep.push(employees[i]);
            }
        }
        if (tmpDep.length == 0){
            reject("No Results for Department: "+ departments);
        }
        else{
            resolve(tmpDep);
        }
    });

}

exports.getEmployeesByManager = (depNum) => {
    return new Promise (function (resolve, reject){
        var tmpMan = [];
        for (let i = 0; i < employees.length; i++){
            if (employees[i].employeeManagerNum == depNum){
                tmpMan.push(employees[i]);
            }
        }
        if(tmpMan == 0){
            reject("There are no Employees Unders Manager# "+ depNum);
        }else{
            resolve(tmpMan);
        }
    });
}

exports.getEmployeesByNum = (num) => {
    return new Promise (function (resolve, reject){
        for(let i = 0; i < employees.length; i++){
            if (employees[i].employeeNum == num){
                resolve(employees[i]);
            }
        }
    });
}

exports.getManagers = () => {
    return new Promise (function (resolve, reject){
        var isMan = [];
        for (let i = 0; i < employees.length; i++){
            if (employees[i].isManager){
                isMan.push(employees[i]);
            }
        }
        if (isMan.length == 0){
            reject("There are no Managers");
        }else{
            resolve(isMan);
        }
    });
}

exports.getDepartments = () => {
    return new Promise (function (resolve, reject){
        if (departments.length == 0){
            reject("Failed to load Department's JSON FILE");
        }else{
            resolve(departments);
        }
    });
}



