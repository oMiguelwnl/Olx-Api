const { check } = require("express-validator");
const { signin } = require("../controllers/AuthController");
module.exports = {
  signup: check({
    name: {
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Nome precisa ter pelo menos 2 caracteres",
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email inválido",
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Senha precisa ter pelo menos 2 caracteres",
    },
    state: {
      notEmpty: true,
      errorMessage: "Estado não preenchido",
    },
  }),
  signin: check({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email inválido",
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Senha precisa ter pelo menos 2 caracteres",
    },
  }),
};
