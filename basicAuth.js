const authUser = (req, res, next) => {
  if (!req.user) {
    res.status(403);
    return res.send("You nee to sign in");
  }
  next();
};

const authRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    res.status(401);
    return res.send("Not Allowed");
  }
  next();
};

module.exports = { authUser, authRole };
