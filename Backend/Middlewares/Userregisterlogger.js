const Userregisterlogger = (req, res, next) => {
  const { fname, lname, username, email, phone, role, password } = req.body;
  if (fname && lname && username && email && phone && role && password) {
    next();
  } else {
    return res.status(404).send("All fields are required");
  }
};

module.exports = Userregisterlogger;
