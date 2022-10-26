const Userregisterlogger = (req, res, next) => {
  const { username, email, phone, role, password } = req.body;
  if (username && email && phone && role && password) {
    next();
  } else {
    return res.status(404).send("All fields are required");
  }
};

module.exports = Userregisterlogger;
