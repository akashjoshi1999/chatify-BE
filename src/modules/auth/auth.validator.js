exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  next();
};

exports.signUp = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  next();
};

exports.forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email required' });
  }
  next();
};

exports.resetPassword = (req, res, next) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password required' });
  }
  next();
};
