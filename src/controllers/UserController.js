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
  editAction: async (req, res) => {},
};
