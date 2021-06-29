const express = require('express');
const app = express();

const { config } = require('./config/index');
const guisadosApi = require('./routes/guisados');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler')


// body parser
app.use(express.json());

// Routes
guisadosApi(app);

// Catch 404
app.use(notFoundHandler)

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function(){
  console.log(`Listening http://localhost:${config.port}`)
});
