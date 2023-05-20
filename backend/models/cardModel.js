const mongoose = require("mongoose");
//const User = require("./user").schema;
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: [true, "Dirección URL requerida"],
    validate: () =>
      validator.isURL(this.link, {
        message: "debe ser una RUL valida",
        protocols: ["http", "https", "www."],
        require_tld: true,
        require_protocol: true,
      }),
  },
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "user",
  },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "user" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("card", cardSchema);
