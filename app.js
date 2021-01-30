const express = require('express')
const bodyParser= require('body-parser');
const app = express();
const multer=require("multer");
const path=require("path");
const mongoose=require("mongoose");
// var router=express.Router();
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES WILL GO HERE

mongoose.connect("mongodb://localhost:27017/Ankita",{useNewUrlParser:true,});

const formSchema=new mongoose.Schema({
  name:String,
  resume:String
});

const Form=mongoose.model("Form",formSchema);


app.set('view engine','ejs');

app.use(express.static(__dirname+"./public/"));

var storage=multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+"_"+req.body.userName+path.extname(file.originalname));
  }
});

var upload=multer({storage:storage}).single('file');

// var multipleUpload=upload.fields([{name:'file1',maxcount:1},{name:'file2',maxcount:2}]);

app.get("/",function(req,res){
res.render("index");
})

app.post("/upload", upload,function(req,res,next){

  var file=req.file.filename;

  const getFile=new Form({
    name:req.body.userName,
    resume:file
  });
  getFile.save();
  res.send("Uploaded");
});

app.listen(3000, () => console.log('Server started on port 3000'));
