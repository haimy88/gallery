const Ajv = require("ajv");

const ajv = new Ajv();

const validateBody = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      req.status(400).send(validate.errors);
      return;
    }
    next();
  };
};

module.exports = { validateBody };
