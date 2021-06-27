/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_PATIENTS_ARN
	STORAGE_PATIENTS_NAME
Amplify Params - DO NOT EDIT */

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

app.get("/mctest", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_PATIENTS_NAME,
  };
  docClient.scan(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ data });
  });
});

app.post("/mctest", function (req, res) {
  console.log(req);

  var params = {
    TableName: process.env.STORAGE_PATIENTS_NAME,
    Item: {
      id: id(),
      nome: req.body.name,
      idade: req.body.age,
      telefone: req.body.phone,
      identidade: req.body.idNumber,
      email: req.body.email,
      convenio: req.body.isConvd,
      alergia: req.body.allergy,
      sintomas: req.body.symptom,
      retorno: req.body.isReturn,
      especialidade: req.body.docType,
      diaConsulta: req.body.day,
      horaConsulta: req.body.time,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ success: "Contact created successfully!" });
  });
});

app.put("/mctest", function (req, res) {
  console.log("body: ", req.body);
  var params = {
    TableName: process.env.STORAGE_PATIENTS_NAME,
    Key: { id: "id" },
    UpdateExpression: "SET nome = :nome",
    ExpressionAttributeValues: {
      ":nome": "nome",
    },
    ReturnValues: "UPDATED_NEW",
  };

  docClient.update(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ success: "Contact updated successfully!" });
  });
});

app.delete("/mctest", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_PATIENTS_NAME,
    Key: { id: "id" },
  };
  docClient.delete(params, function (err, data) {
    if (err) res.json({ err });
    else res.json({ success: "successfully deleted item" });
  });
});

/* 
app.delete('/mctest', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/mctest/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
}); */

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
