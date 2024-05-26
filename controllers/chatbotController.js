const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

// Chemin vers le fichier de clés de service JSON
const CREDENTIALS_PATH = path.join(__dirname, '../path/to/your/dialogflow-service-account-file.json');

// ID du projet Dialogflow
const projectId = 'your-dialogflow-project-id';
const sessionClient = new dialogflow.SessionsClient({ keyFilename: CREDENTIALS_PATH });

const processMessage = async (req, res) => {
  const { message } = req.body;
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'fr-FR', // Assurez-vous que cela correspond à la langue de votre agent Dialogflow
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.status(200).json({ response: result.fulfillmentText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processMessage };
