require("dotenv").config();
const express=require("express");

const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const dataBase=""+process.env.PASSWORD;

mongoose.connect(dataBase,{useNewUrlParser:true}).then(()=>{
         console.log("database connected successsfully");
});

const itemsSchema = new mongoose.Schema({
  name: String


});

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({

name:"Welcome to our to do list"

});

  
const defaultItems=[item1];








app.get("/",(req,res)=>{

 Item.find().then(function (results) {

  if(results.length===0)
  {
    Item.insertMany(defaultItems).then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else{
    
  res.render("list",{
    listTitle:"Today",
    newListItem:results
 
  });
}

  });
  


  
  

//var today=new Date();

/*var options={
  weekday:'long',
  day:'numeric',
  month:'long'
}


var day=today.toLocaleDateString('en-US',options);


*/

/*var currentDay=today.getDay();
var day="";


if(currentDay===6)
day="Saturday";
if(currentDay===0)
day="Sunday";
if(currentDay===5)
day="Friday";
if(currentDay===4)
day="Thursday";
if(currentDay===3)
day="Wednesday";
if(currentDay===2)
day="Tuesday";
if(currentDay===1)
day="Monday";


 //res.send("boo! i have to work");}

//res.send("hello");*/


 

});




app.post("/",(req,res)=>{

    var data=req.body.entry;
    
    const item4=new Item({

      name:data
      
      });
      

  item4.save().then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });




    defaultItems.push(item4);


  //console.log(ddata1);
  
  //res.render("list",{    // this is wrong we have to pass the data1 to above render in get request then firstly render will happen then triggers post request and redirect and then again post request happens.
    //  kinofday:data1

 // });


 
 //if(req.body.list==="Work")
 //{ workList.push(item);
  //   res.redirect("/work");
 //}
 // else
  //{
 
 res.redirect("/");
 // }

});


app.get("/work",(req,res)=>{

  res.render("list",{
    listTitle:"Work List",
    newListItem:workList
 
  });

});
//app.post("/work",(req,res)=>{




//});

app.post("/delete",(req,res)=>{

const checkedItem=req.body.checkbox;
Item.findByIdAndRemove(checkedItem).catch((err)=>{
       console.log(err);
});
res.redirect("/");


});


    
app.listen(3000,()=>{

console.log("Server started on port 3000");

});