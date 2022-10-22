const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const https = require('https');
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(express.static("public"));




app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");


})
app.post("/", function(req, res) {


  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const Data = {
    members:
    [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]

  };


  const jsonData = JSON.stringify(Data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/ecad420ad1";

  const options = {
    method:"post",
    auth:"ahmed1:9da2cbaf02094532452d623e551e9edd-us9"
  };

  const request = https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/sucess.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })



  request.write(jsonData);
  request.end();




})


app.post("/failure",function(req,res){
  res.redirect("/");
})








app.listen(process.env.PORT  ||  3000, function() {
  console.log("server is running ");
})
