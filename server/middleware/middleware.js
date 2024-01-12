// ----- Checks if user is logged in

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  };

  return res.status(401).json("You are not logged in, try again...");
};

// ----- Checks if user is admin

function isAdmin(req, res, next) {
  if (req.session.user.isAdmin) {
    return next();
  };

  return res.status(403).json("You are not an Admin, sorry...");
}

// ----- Validates argument schema

function validate(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    };
    res.status(400).json(error.message);
  };
};

// ----- Exports functions to routers

module.exports = { isAdmin, isLoggedIn, validate };
