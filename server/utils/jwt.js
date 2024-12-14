import jwt from "jsonwebtoken";

const SECRET_KEY = `INI-RAHASIA-BANGET`;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export { signToken, verifyToken };
