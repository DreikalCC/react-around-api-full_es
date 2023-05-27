const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: [true, "Dirección URL requerida"],
    validate: (value) =>
      validator.isURL(value, {
        message: "debe ser una URL valida",
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
