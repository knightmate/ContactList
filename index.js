

const express=require('Express');
const port=8;
const Contact=require('./models/contact');
const router=express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();




var path = require('path');
const db=require('./config/mongoose');

 
const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname+'/views'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/*", function(httpRequest, httpResponse, next){

   console.log("hi dude its me");
      next();

 })
 
 app.use(express.urlencoded());

 app.use( express.static('asset'));
   
  

// app.use(function(req,res,next){

//    // app.use(express.urlencoded());
//    // console.log("middle Ware First"+"/n"+req.body);
//     next();


// });

// app.use(function(req, res, next)
// {

//     console.log("Middle Ware second");
//     next();


// });


 

app.get('/delcon',function(req, res)
{
   //var str= req.paramcar; 
///console.log("PhoneNo"+req.query.id);
  let id=req.query.id;
  let i=0;
  
  console.log("delete"+id);
  Contact.findOneAndDelente
  Contact.findByIdAndRemove(id, function(err){
     
    if(err)
    {
        
        console.log("cannot get or delted "+id);
        return;

    }
   
    

  });
       console.log("Contact Deleted"+id);
   
       return res.redirect('/');
  //var myquery = {phone: req.query.phone };
    
          
});
  
// return res.redirect('/');
 

 

app.post('/contact_display', function(req, res)
{
console.log(req.body);
// Contactlist.push(
//    {
//         name:req.body.name,
//         contact:req.body.number
//    }


     Contact.create({

        name:req.body.name,
        phone:req.body.number,

     }, function(err,newContact)
     {
         if(err)
         {

            console.log("error in creating contact"+err);
            return;

         }

         console.log("cotact Created"+newContact);
         return res.redirect('back');

     });


 

});

   
 

 

app.listen(port,function(err)
{


    if(err)
    {
        console.log(err);
    }
   
    else{


        

         app.get('/',function(req, res)
         {
             
 
           console.log("main server is called");
           
            console.log(req.body);
                   
            // res.send(Users/meghrajdeshmukh/Desktop/WebDevelopment/node/ContactList/contact_list/index.html);

         // res.sendFile(path.join("contact_list"+'/index.html'));
        //   res.sendFile(__dirname + '/index.html');
            // console.log(__dirname);


            Contact.find({},function(err,contacts){
                 
                if(err)
                {
                    console.log("Cannot find contact "+err);
                    return;

                }

                   
         return res.render('index' ,{

               title:"Contact List",
              contact_list:contacts,



        })
    
            // return res.end("ohk");
          });

         
         });

         

    }
 
    
});

