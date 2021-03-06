var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
//configuration db 
var db = mongo.connect("mongodb://localhost:27017/periferia", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
//init 
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));    
//access cors  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
 //select shema  
 var Schema = mongo.Schema;  
// use collection users
var UsersSchema = new Schema({      
 name: { type: String   },       
 email: { type: String   },   
},{ versionKey: false });

// select items collection 
var SelectItemSchema = new Schema({      
 user: { type: String   },       
 email: { type: String   },
 nameCharacter: { type: String   },
 link: { type: String   },   
},{ versionKey: false });

//model users for db  periferia  
var model = mongo.model('users', UsersSchema, 'users');
//model selected items for db  periferia  
var modelItems = mongo.model('items', SelectItemSchema, 'items');  
// get users 
 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
})  
//save  
app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 }); 
})  
 //delete 
 app.post("/api/deleteUser",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
}) 
//save items selected  
app.post("/api/SaveItem",function(req,res){   
 var modItem = new modelItems(req.body);  
    modItem.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 }); 
})
//listen  
app.listen(8080, function () {     
 console.log('app listening on port 8080!')  
})  