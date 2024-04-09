const { validationResult, matchedData } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const State = require("../models/State");

module.exports = {
  signin: async (req, res) => {},
  signup: async (req, res) => {
    // Validar os dados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    // Verificar se o email existe
    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      res.json({ error: { email: { msg: "Email ja existe" } } });
      return;
    }

    // Verificar se o estado existe
    if (mongoose.Types.ObjectId.isValid(data.state)) {
      const stateItem = await State.findById(data.state);

      if (!stateItem) {
        res.json({ error: { state: { msg: "Estado inexistente" } } });
        return;
      }
    } else {
      res.json({ error: { state: { msg: "Código de estado inválido" } } });
    }

    // Criar o novo usuário

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Data.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state,
    });

    await newUser.save();

    res.json({ token });
  },
};
