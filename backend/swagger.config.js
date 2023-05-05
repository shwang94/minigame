module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
    outputFile: './swagger_output.json',
    endpointsFiles: ['./index.js'],
  };
  