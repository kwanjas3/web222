
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
    }]
});

let Comment; //to be defined on new connection

exports.initialize = function (){
    return new Promise((resolve, reject)=>{
        let db = mongoose.createConnection("mongodb://jkwan34:123qwe@ds045628.mlab.com:45628/web322a6");
        db.on('error', (err)=>{
            reject();
        });
        db.once('open', ()=>{
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
}

exports.addComment = function(data){
    return new Promise((resolve, reject)=>{
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        newComment.save((err)=>{
            if(err){
                console.log("Error Occurred: " + err);
                reject();
            } else {
                console.log("Data saved");
                resolve(newComment._id);
            }
        });
    });
}

exports.getAllComments = function () {
    return new Promise((resolve, reject)=>{
        Comment.find().sort({
            postedDate: 'asc'
        }).exec()
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            console.log("Error Occurred:: " + err);
        });
    });
}

exports.addReply = function (data){
    return new Promise((resolve, reject)=>{
        //console.log("============ " + data.comment_id + " ============");
        data.repliedDate = Date.now();
        Comment.update(
            {_id: data.comment_id},
            {$addToSet: {replies: data}}
        ).exec()
        .then(()=>{
            resolve();
        }).catch((err)=>{
            console.log("Error Occurred:: " + err);
        });
    });
}
