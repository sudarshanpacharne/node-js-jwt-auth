const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use",
      });
    }
  });
  // Email
  User.findOne({
    where: {
      username: req.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use",
      });
    }
  });

  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res
          .status(400)
          .send({ message: `Failed! Role doesn't exist ${req.body.roles[i]}` });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUserNameOrEmail: checkDuplicateUserNameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
