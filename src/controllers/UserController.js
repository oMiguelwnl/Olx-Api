const { validationResult, matchedData } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const State = require("../models/State");
const User = require("../models/User");
const Category = require("../models/Category");
const Ad = require("../models/Ad");

module.exports = {
  getStates: async (req, res) => {
    let states = await State.find();
    res.json({ states });
  },
  info: async (req, res) => {
    let { token } = req.query;

    const user = await User.findOne({ token });
    const state = await State.findById(user.state);
    const ads = await Ad.find({ idUser: user._id.toString() });

    let categories = await Category.find({});

    let adList = [];
    for (let i in ads) {
      const category = categories.find(
        (category) => category._id.toString() === ads[i].category.toString()
      );

      adList.push({
        id: ads[i]._id,
        status: ads[i].status,
        images: ads[i].images,
        dateCreated: ads[i].dateCreated,
        title: ads[i].title,
        price: ads[i].price,
        priceNegotiate: ads[i].priceNegotiate,
        description: ads[i].description,
        views: ads[i].views,
        category: category.slug,
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList,
    });
  },
  editAction: async (req, res) => {
    // Validar os dados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    // Editar o usuário

    let updates = {};

    if (data.name) {
      updates.name = data.name;
    }
    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });
      if (emailCheck) {
        res.json({ error: "Email já existe" });
        return;
      }
      updates.email = data.email;
    }

    if (data.state) {
      if (mongoose.Types.ObjectId.isValid(data.state)) {
        const stateCheck = await State.findById(data.state);
        if (!stateCheck) {
          res.json({ error: "Estado não existente" });
          return;
        }
        updates.state = data.state;
      }
    }

    if (data.password) {
      updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });
    res.json({});
  },
};
