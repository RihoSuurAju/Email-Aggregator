const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//send files from public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    //list id 4819f43873
    //api key 1f65561e3d283a95bd6fcdd47bc6f954-us4

    //build up an oject of data to be posted to the server

    let data = {
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    //prepare data for POST request
    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/4819f43873",
        method: "POST",
        headers: {
            "Authorization": "1f65561e3d283a95bd6fcdd47bc6f954-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

    console.log("Data: " + firstName, lastName, email)
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});