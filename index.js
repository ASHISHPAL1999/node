const express = require('express');
const mysql=require("mysql")
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt')
const crypto = require('crypto');
var cors = require('cors')
const app=express();
const bodyParser = require('body-parser');
const { PassThrough } = require('nodemailer/lib/xoauth2');
const port=4000
//const bodyParserurlencoded=app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"Sample"
})
if(con){
    console.log("connection successfull")
}
else{
    console.error(`error is:${con}`)
}

con.connect( (err)=> {
    if(err) throw err;{
    console.log("Connected!");}
app.get('/',(req,res)=>{

    res.end("hey ashish");

})

app.get('/show',(req,res)=>{
   /* var obj ={
        name:"ankit",
        std:"BCA",
        age:30
    }*/
var name1=req.query.name;
//console.log(JSON.stringify(req.query.name))
console.log(name1)
    var sql ="Select * From empy WHERE name = '"+name1+"'";
    
    con.query(sql, function (err, result) {
    
        if (err) throw err;
        /*res.end(JSON.stringify(result));*/
        
           
     // console.log(result)
    // var {dataval}=result
    //console.log(JSON.stringify(result[0].password));
    console.log(JSON.stringify(result[0].password));
    let hashedpassword = result[0].password;
    
    console.log(hashedpassword)
    let key = "mypassword";
    var mykey = crypto.createDecipher('aes-128-cbc',key);
var mystr = mykey.update(hashedpassword, 'hex', 'utf8')
mystr = mystr + mykey.final('utf8');
    //console.log(result);
    result[0].password=mystr;
    console.log(result);
    res.end(JSON.stringify(result));
    //console.log(dataval)
       
      });
      //console.log(dataval)
    //res.send(dataval);
   // res.end();
})

app.post('/send',(req,res)=>{
 
    var name=req.body.name;
    var password=req.body.password;
    var email=req.body.email;
    //var hpassword;
    //console.log(req.body.name)
    //console.log(req.body.password)
    //console.log(req.body.email)
    console.log(name)
    console.log(password)
    console.log(email)
    res.send("nhi aaa rha data ")


    let key = "mypassword";
    //let password = "123abc";
   let ciphertext = crypto.createCipher('aes-128-cbc',key)
  let hashpassword = ciphertext.update(password,'utf8','hex')
   hashpassword = hashpassword+ciphertext.final('hex')
   console.log(hashpassword);
   
/*var mykey = crypto.createDecipher('aes-128-cbc',key);
var mystr = mykey.update(hashpassword, 'hex', 'utf8')
mystr = mystr + mykey.final('utf8');

console.log(mystr);
jwt.sign({data},'asbc',{expiresIn:'300s'},(err,token)=>{
  console.log(token)*/
    
    //var salt =  bcrypt.genSalt(10);
   //var hashpassword =bcrypt.hash(password,salt).then((data)=>{return data}).catch((err)=>{console.log(err)})
   // hpassword=hashpassword;
    //console.log(hashpassword)
    /*const saltRounds = 1000;
  hpassword= bcrypt.hash(password, saltRounds).then(function(hash) {
      // Store hash in your password DB.
     // console.log(hash);
      return hash;
  });*/
 // bcrypt.compare(password, hash, function(err, result) {
    // result == true
//});
  
        //var password=1997;
        //var email='anokhi999gmail.com'
        //Insert a record in the "customers" table:
    var sql = "INSERT INTO empy (name, password,email) VALUES (  '" + name + "', '" +hashpassword + "' ,'" + email + "' )";
        //var sql = `INSERT INTO emp (name, password,email) VALUES ( ${name}, ${password} ,${email} )`;
      /*const salt =bcrypt.genSalt(10);
      const hashpassword=bcrypt.hash(this.password,salt)
      this.password=hashpassword;
      console.log(password)*/
       // var sql="DELETE FROM emp WHERE name ='"+name+"'";
      //  var sql ="Select * From emp WHERE city = '"+city+"'";
      //var sql = "UPDATE emp SET city='"+city+"' WHERE city='"+name+"'";
      
        con.query(sql, function (err, result) {
    
          if (err) throw err;
         
          console.log("1 record inserted");
         
        
    
        });
        
      });
    
    
    

})
app.post('/signin',(req,res)=>{
         var password=req.body.password;
         var email=req.body.email;
         let key = "mypassword";
            //let password = "123abc";
   let ciphertext = crypto.createCipher('aes-128-cbc',key)
   let hashpassword = ciphertext.update(password,'utf8','hex')
    hashpassword = hashpassword+ciphertext.final('hex')
    //console.log(hashpassword);
        ///console.log(req.body.email,'hii')
         //console.log(req.body.password,'hello')
       //  var sql="DELETE FROM empy WHERE name ='"+name+"'";
          var sql ="Select * From empy WHERE email = '"+email+"'AND password ='"+hashpassword+"'";
         //var sql = "UPDATE emp SET city='"+city+"' WHERE city='"+name+"'";
         
           con.query(sql, function (err, result) {
       
             if (err) throw err;
            
            // console.log("1 recorrd fetched");
             //console.log(JSON.stringify(result));
             let hashedpassword = result[0].password;
    
            console.log(hashedpassword)
            /* let key = "mypassword";
             var mykey = crypto.createDecipher('aes-128-cbc',key);
         var mystr = mykey.update(hashedpassword, 'hex', 'utf8')
         mystr = mystr + mykey.final('utf8');
             //console.log(result);
             result[0].password=mystr;*/

             
          const checkemail=result[0].email
            const checkpassword=result[0].password
            console.log(checkemail,checkpassword)
            console.log(email,hashedpassword)
             if((hashedpassword === checkpassword) && (email === checkemail))
            {
           res.end("login successful")
            }
            else{
              res.end("login failed")
            }
       
           });
           
         });
       
       
       

//})





app.get('/getUsers',(req,res)=>{
 
     //let password = "123abc";

//console.log(hashpassword);
 ///console.log(req.body.email,'hii')
  //console.log(req.body.password,'hello')
//  var sql="DELETE FROM empy WHERE name ='"+name+"'";
   var sql ="Select * From empy";
  //var sql = "UPDATE emp SET city='"+city+"' WHERE city='"+name+"'";
  
    con.query(sql, function (err, result) {

      if (err) throw err;
     
     // console.log("1 recorrd fetched");
      //console.log(JSON.stringify(result));
    console.log(result)
    res.end(JSON.stringify(result));
     /* let key = "mypassword";
      var mykey = crypto.createDecipher('aes-128-cbc',key);
  var mystr = mykey.update(hashedpassword, 'hex', 'utf8')
  mystr = mystr + mykey.final('utf8');
      //console.log(result);
      result[0].password=mystr;*/

      
   

    });
    
  });






















app.get('/forget',(req,res)=>{
    console.log(req.query.email,"forget server wala")
 
//var name=req.query.name;
    //var password=req.body.password;
  var email=req.query.email;
    var password='temp@12345';
    console.log(email,password)
    //console.log(req.body.name)
    //console.log(req.body.password)
    //console.log(req.body.email)
   // console.log(name)
    //console.log(password)
    //console.log(email)
    //res.send("nhi aaa rha data ")
        //var password=1997;
        //var email='anokhi999gmail.com'
        //Insert a record in the "customers" table:
    //var sql = "INSERT INTO empy (name, password,email) VALUES (  '" + name + "', '" + password + "' ,'" + email + "' )";
        //var sql = `INSERT INTO emp (name, password,email) VALUES ( ${name}, ${password} ,${email} )`;

       // var sql="DELETE FROM empy WHERE name ='"+name+"'";
      //  var sql ="Select * From emp WHERE city = '"+city+"'";
      var sql = "UPDATE empy SET password='"+password+"' WHERE email='"+email+"'";
      
        con.query(sql, function (err, result) {
    
          if (err) throw err;
         
          console.log("1 row updated");
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'teachera2000@gmail.com',
              pass: 'Techera#133@698'
            }
          });
          
          var mailOptions = {
            from: 'teachera2000@gmail.com',
            to:`${email}`,
            subject: 'recover password',
            text:`hii candidates 
       new password is${password}
            
            
            thanks & regards
            techera LTD
            website:www.teachera.com`,
            
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
         res.end("password changed successful,check your regsitered email ")
        
    
        });
        
      });
    
      app.get('/delete',(req,res)=>{
        console.log(req.query.name,"not goit")
     
    var name=req.query.name;
        //var password=req.body.password;
        //var email=req.body.email;
        
        //console.log(req.body.name)
        //console.log(req.body.password)
        //console.log(req.body.email)
       // console.log(name)
        //console.log(password)
        //console.log(email)
        //res.send("nhi aaa rha data ")
            //var password=1997;
            //var email='anokhi999gmail.com'
            //Insert a record in the "customers" table:
        //var sql = "INSERT INTO empy (name, password,email) VALUES (  '" + name + "', '" + password + "' ,'" + email + "' )";
            //var sql = `INSERT INTO emp (name, password,email) VALUES ( ${name}, ${password} ,${email} )`;
    
            var sql="DELETE FROM empy WHERE name ='"+name+"'";
          //  var sql ="Select * From emp WHERE city = '"+city+"'";
          //var sql = "UPDATE emp SET city='"+city+"' WHERE city='"+name+"'";
          
            con.query(sql, function (err, result) {
        
              if (err) throw err;
             
              console.log("1 record inserted");
             res.end("deletion successful")
            
        
            });
            
          });
        
        
        
    
    
    
    
    




app.listen(port,(req,res)=>
{console.log(`server is running at ${port}`)})