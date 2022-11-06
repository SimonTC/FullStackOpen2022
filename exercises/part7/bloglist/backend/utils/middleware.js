const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next(); // Yields control to the next middleware
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error); // Send error on to the default express errorhandler
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (e) {
    // Do nothing since something is wrong with the token.
  }
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
