
const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const modelRouter = require('./routes/router');
const { route } = require('./routes/router');
const app = express();
dotenv.config({ path: '.env' })
const PORT = process.env.PORT;

// connect to mongodb

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }, (err) => {
  if (err) {
    return console.log("Wejdan Error in connction", err);
  }
  console.log("Wejdan mongodb connected ");
})

// setup server
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:3005'
}))
app.use(bodyParser.json())


const swaggerDefinition = {
  info: {
    title: 'User Registration & Login Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:3005',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/', modelRouter, swaggerUI.serve,
  swaggerUI.setup(swaggerSpec));




app.listen(PORT, () => {
  console.log(`complaint management portal listen on port!${PORT}`);
});
