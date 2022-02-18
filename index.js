//archivo index.js
// require('dotenv').config()
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cons = require('consolidate');
const dialogFW = require('@google-cloud/dialogflow')
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const connectDB = require('./utils/connectDB')
const Answer = require('./models/answerModel')
const { db } = require("./utils/db.js");

if (process.env.PRODUCTION == true || process.env.PRODUCTION == "true")
  connectDB()

if (process.env.PRODUCTION != "true" && process.env.PRODUCTION != true) {

  // Sin https si es sin SSL
  const liveReloadServer = livereload.createServer({
    https: {
      cert: fs.readFileSync('./ssl/localhost.crt'),
      key: fs.readFileSync('./ssl/localhost.key')
    }
  });

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}
// DialogFlow Credentials
const dialogFlowAPIEnv = JSON.parse(fs.readFileSync('./dialogFlowAPIEnv.json'));

// // Your google dialogFW project-id
const dialogFlowProjectID = dialogFlowAPIEnv.project_id;

// // Configuration for the client
const dialogFlowConfiguration = {
  credentials: {
    private_key: dialogFlowAPIEnv['private_key'],
    client_email: dialogFlowAPIEnv['client_email']
  }
}

// Create a new session
const sessionClient = new dialogFW.SessionsClient(dialogFlowConfiguration);
// 
// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

  try {
    let sessionPath = sessionClient.projectAgentSessionPath(dialogFlowProjectID, sessionId);

    // The text query request.
    let request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogFW agent
          text: queryText,
          // The language used by the client (en-US)
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);

    return {
      response: result.fulfillmentText
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// view engine setup
const expressApp = express();

expressApp.use(express.json()); // Used to parse JSON bodies
expressApp.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies using query-string library

if (process.env.PRODUCTION != "true" && process.env.PRODUCTION != true) {
  expressApp.use(connectLiveReload());
}

expressApp.engine('html', cons.swig);
expressApp.set("trust proxy", true);
expressApp.set("views", path.resolve(__dirname, "views"));
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use(express.static(path.join(__dirname, 'utils')));


expressApp.get('/', function (req, res) {
  res.render('index.html');
});

expressApp.get('/oscar', function (req, res) {
  res.send('Hola, estas en la pagina de prueba');
});

expressApp.post('/storeAnswers', async (req, res) => {
  try {
    const database = await db()

    console.log('req.body', req.body);
    let { ask, answer } = req.body
    console.log('ask, answer', ask, answer);

    if (answer.toString().length <= 3 || !answer)
      return res.status(400).json({ error: "La respuesta debe contener al menos una palabra de mas de 3 caracteres" });

    answer = answer.trim()
    ask = ask.trim()

    if (process.env.PRODUCTION == true || process.env.PRODUCTION == "true") {
      const newAnswer = new Answer({ ask, answer })
      await newAnswer.save()

      // MYSQL STORING
      database.query(`INSERT INTO interactions (ask, answer) 
    VALUES (?,?)`, [ask, answer]
        // , (error,
        //   results) => {
        //   if (error) return res.json({ error: error }
        //     );

        // }
      );
    }

  } catch (err) {
    console.log(err);
    throw err
  }
});

// Dialogflow route
// expressApp.post('/dfff', async (req, res) => {

//   try {
//     const myAgent = new dfff.WebhookClient({
//       request: req,
//       response: res
//     })

//     function demo(agent) {
//       agent.add('sending response to webhook server')
//     }

//     let intentMap = new Map()

//     intentMap.set('webhookDemo', demo)

//     myAgent.handleRequest(intentMap)
//   } catch (err) {
//     console.log(err);
//     throw err
//   }
// });

expressApp.post('/dialogFW', async (req, res) => {

  try {
    console.log('----- REQ -----', req.body);
    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responseData = await detectIntent(languageCode, queryText, sessionId)

    console.log('responseData', responseData)
    res.send(responseData.response);
  } catch (err) {
    console.log(err);
    throw err
  }
});

if (process.env.PRODUCTION != "true" && process.env.PRODUCTION != true) {
  https.createServer({
    cert: fs.readFileSync('./ssl/localhost.crt'),
    key: fs.readFileSync('./ssl/localhost.key')
  }, expressApp).listen(50000, function () {
    console.log('Running up on https://my.local.host:50000/');
  });
} else {
  expressApp.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 5000}`)
  })
}