const { config } = require('../../config');
const cors = require('cors');

function corsHandler() {
  console.log('This is CORS')
  const configCors = {
    origin: "https://tacosagaz.com/guisados" || "localhost:3000//api/guisados",
  }
  if (config.dev) {
    console.log('This is CORS dev')
    return cors();
  }
  return cors(configCors);
}

module.exports = corsHandler;