var path = require("path");
const fs = require("fs");

global.emp = [];
global.dps = [];



exports.initialize = () => {
    return new Promise(function (resolve, reject) {
        //code parse the string here
        fs.readFile("./data/employees.json", (err, data) => {
            if (err) {
                reject("Cannot read file");
            }
            else {
                global.emp = JSON.parse(data);
            }
        });
        fs.readFile("./data/departments.json", (err, data) => {
            if (err) {
                reject("Cannot read dps json");
            }
            else {
                global.dps = JSON.parse(data);
                resolve();
            }
        });
    });
};

exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if (emp.length == 0) {
            reject("Error loading emp array");
        } else {
            resolve(emp);
        }
    });
    return emp;
}

exports.getEmployeesByStatus = function (msg) {
    return new Promise(function (resolve, reject) {
        var tmpStat = [];
        for (var i = 0; i < emp.length; i++){
            if (msg == emp[i].status){
                tmpStat += emp[i];
            }
        }
        if (tmpStat.length == 0){reject("No results");}
        else {
            resolve(tmpStat);
        }
    });
}

exports.getEmployeesByDepartment = (departments) => {
    return new Promise(function (resolve, reject) {
        var tmpDep = [];
        for (var i = 0; i < emp.length; i++){
            if (departments == emp[i].department){
                tmpDep += emp[i];
            }
        }
        if (tmpDep.length == 0){ reject("No Results");}
        else {
            resolve(tmpDep);
        }
    });

}

exports.getEmployeesByManager = (dp) => {
    return new Promise(function (resolve, reject) {
        var tmpMan = [];
        for (var i = 0; i < emp.length; i++){
            if (dp == emp[i].department && emp[i].isManager == true){
                tmpMan += emp[i];
            }
        }
        if (tmpMan.length == 0){
            reject("No Results");
        }
        else {
            resolve(tmpMan);
        }
    });
}

exports.getEmployeesByNum = (num) => {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < emp.length; i++){
            if (num == emp[i].employeeNum){
                resolve(emp[i]);
                break;
            }
        }
        reject("No matching employees");
    });
}

exports.getManagers = () => {
    return new Promise(function (resolve, reject) {
        var man = [];
        for (var i = 0; i < emp.length; i++){
            if (emp[i].isManager){
                man += emp[i];
            }
        }
        if (man.length == 0){reject("No Results");}
        else{resolve(man);}
    });
}

exports.getDepartments = () => {
    return new Promise(function (resolve, reject) {
        if (dps.length == 0){ reject("Failed to load departments");}
        else{resolve(dps);}
    });
}
