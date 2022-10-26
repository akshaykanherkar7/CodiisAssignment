const Userloginlogger = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    return res.status(404).send("All fields are required");
  }
};

module.exports = Userloginlogger;
