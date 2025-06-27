// backend/config/swagger.js
//
//  Generates OpenAPI spec from JSDoc inline comments in your routes/*
//  and exports { swaggerSpec, swaggerUi } for index.js.
//
//  New deps:  npm i swagger-jsdoc swagger-ui-express --save
//
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title:   'Ellanatek Ad-Engine API',
      version: '1.0.0',
      description: 'REST + WebSocket endpoints for advertisers, admins and LED controllers'
    },
    servers: [
      { url: 'http://localhost:5004', description: 'local dev' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  // scan all JS files under routes/
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi
};
