const { config } = require('../../config/index');
const boom = require('@hapi/boom');

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack };
  }

  return err;
}

function logError(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, res, req, next) {
  //eslint-disable-line
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logError,
  errHandler,
  wrapErrors,
};
