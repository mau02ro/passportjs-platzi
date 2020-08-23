const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

//* validate va a recibir la data que va a validar, y va a recibir un schema
function validate(data, schema) {
  console.log(schema);
  // vamos a obtener un error en caso de que el schema no sea valido con la data
  // ANTIGUA IMPLEMENTACIÓN DE JOIN
  // const { error } = joi.validate(data, schema);

  // NUEVA IMPLEMENTACIÓN DE JOI ahora el schema valida la data
  const { error } = schema.validate(data, { errors: { stack: true } });
  return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    // console.log(schema);
    const error = validate(req[check], schema);
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = { validationHandler };
