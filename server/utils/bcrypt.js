import bcrypt from "bcryptjs";

const hash = (password) => {
  return bcrypt.hashSync(password);
};

const compare = (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass);
};

export { hash, compare };
