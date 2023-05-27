const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false, 
    minlength: 2, 
    maxlength: 30, 
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    required: [false, "Dirección URL requerida"],
    validate: (value) =>
      validator.isURL(value, {
        message: "debe ser una RUL valida",
        protocols: ["http", "https", "www."],
        require_tld: true,
        require_protocol: true,
      }),
    default:'https://images.unsplash.com/photo-1684779847503-001f1584bc00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=662&q=80',
  },
  email: {
    type: String,
    required: [true, "Email requerido"],
    unique: true,
    validate: (value) =>
      validator.isEmail(value, {
        allow_display_name: false,
        require_display_name: false, 
        allow_utf8_local_part: true, 
        require_tld: true, 
        allow_ip_domain: false, 
        domain_specific_validation: false, 
        blacklisted_chars: '', 
        host_blacklist: [] 
      }),
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: (value) =>
      validator.isStrongPassword(value, { 
        minLength: 6, 
        minLowercase: 1, 
        minUppercase: 0, 
        minNumbers: 1, 
        minSymbols: 0, 
        returnScore: false, 
        pointsPerUnique: 1, 
        pointsPerRepeat: 1, 
        pointsForContainingLower: 10, 
        pointsForContainingUpper: 10, 
        pointsForContainingNumber: 10, 
        pointsForContainingSymbol: 10 
      }),
    select:false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  console.log(email, password);
  this.findOne({ email }).then((user)=>{console.log(user)});

  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Email o password incorrecto"));
      }
      console.log('log del modelo user',user, 'email  ',email,'password  ',password);
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log('not matched !!!!!!!!!!!!!!!!!!');
            return Promise.reject(new Error("Email o password incorrecto"));
          }
          console.log('despues del bcrypt compare   ', user);
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
