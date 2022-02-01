//archivo index.js
require('dotenv').config()
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cons = require('consolidate');
const dfff = require('dialogflow-fulfillment');
// const dialogflow = require('@google-cloud/dialogflow');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
// const synonyms = require("synonyms");
let sinonimos = require("node-sinonimos");
// let thesaurus = require('thesaurus-synonyms');
let thesaurus = require("thesaurus");
const connectDB = require('./utils/connectDB')
const Answer = require('./models/answerModel')
connectDB()

// Sin https si es sin SSL
const liveReloadServer = livereload.createServer({
  https: {
    cert: fs.readFileSync('localhost.crt'),
    key: fs.readFileSync('localhost.key')
  }
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// DialogFlow Credentials
// const dialogFlowAPIEnv = JSON.parse(fs.readFileSync('./dialogFlowAPIEnv.json'));

// // Your google dialogflow project-id
// const dialogFlowProjectID = dialogFlowAPIEnv.project_id;

// // Configuration for the client
// const dialogFlowConfiguration = {
//   credentials: {
//     private_key: dialogFlowAPIEnv['private_key'],
//     client_email: dialogFlowAPIEnv['client_email']
//   }
// }

// Create a new session
// const sessionClient = new dialogflow.SessionsClient(dialogFlowConfiguration);
// 
// Detect intent method
// const detectIntent = async (languageCode, queryText, sessionId) => {

//   try {
//     let sessionPath = sessionClient.projectAgentSessionPath(dialogFlowProjectID, sessionId);

//     // The text query request.
//     let request = {
//       session: sessionPath,
//       queryInput: {
//         text: {
//           // The query to send to the dialogflow agent
//           text: queryText,
//           // The language used by the client (en-US)
//           languageCode: languageCode,
//         },
//       },
//     };

//     // Send request and log result
//     const responses = await sessionClient.detectIntent(request);
//     console.log(responses);
//     const result = responses[0].queryResult;
//     console.log(result);

//     return {
//       response: result.fulfillmentText
//     };
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// view engine setup
const expressApp = express();

expressApp.use(express.json()); // Used to parse JSON bodies
expressApp.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies using query-string library
expressApp.use(connectLiveReload());
expressApp.engine('html', cons.swig);
expressApp.set("trust proxy", true);
// expressApp.set("view engine", "html");
expressApp.set("views", path.resolve(__dirname, "views"));
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use(express.static(path.join(__dirname, 'utils')));

https.createServer({
  cert: fs.readFileSync('localhost.crt'),
  key: fs.readFileSync('localhost.key')
}, expressApp).listen(50000, function () {
  console.log('Running up on https://my.local.host:50000/');
});

expressApp.get('/', function (req, res) {
  res.render('index.html');
});

expressApp.get('/oscar', function (req, res) {
  res.send('Hola, estas en la pagina de prueba');
});

// expressApp.post('/synonyms', async function (req, res) {

//   // synonyms("screen");
//   // returns an object like this:
//   // {
//   // 	n:['screen','cover','covert','concealment'],
//   // 	v:['screen','sieve','sort','test']
//   // }

//   // synonyms("screen", "v");
//   // const test = synonyms("hello", "n");
//   // console.log('test', test);

//   // basically returns a list of similar words
//   // console.log(thesaurus.find("hola"));

//   // const test = await sinonimos('fôrma');
//   // console.log(test);

//   res.json({ req: JSON.stringify(req.body) })
// });

// Dialogflow route
// expressApp.post('/dialogflow', async (req, res) => {

//   try {
//     console.log('----- REQ -----', req);
//     let languageCode = req.body.languageCode;
//     let queryText = req.body.queryText;
//     let sessionId = req.body.sessionId;

//     let responseData = await detectIntent(languageCode, queryText, sessionId)

//     res.send(responseData.response);
//   } catch (err) {
//     console.log(err);
//     throw err
//   }
// });

expressApp.post('/dfff', async (req, res) => {

  try {
    const myAgent = new dfff.WebhookClient({
      request: req,
      response: res
    })

    function demo(agent) {
      agent.add('sending response to webhook server')
    }

    let intentMap = new Map()

    intentMap.set('webhookDemo', demo)

    myAgent.handleRequest(intentMap)
  } catch (err) {
    console.log(err);
    throw err
  }
});