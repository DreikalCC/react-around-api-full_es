const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/unauthorized");

function handleAuthError() {
  throw new Unauthorized("No se cuenta con autorización");
}

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  console.log('auth back headers  ', req.headers);
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  console.log('el token de auth back ',token);
  let payload;

  try {
    console.log('dentro del try  auth back  ', token);
    payload = jwt.verify(token, "secret-key");
    console.log('el payload dentro del try  ', payload);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  console.log('el payload del auth backend es    ', payload);
  next();
};
