import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config';

const jwtAuth = async (req, res, next) => {
  // extract the headers from the req headers

  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }

  const token = req.headers.authorization.split(' ')[1]; // to store the Bearer at [0] & token to [1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorize' });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to the req objects
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Invalid Token' });
  }
};

// generate jwt token
const generateJwtToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET);
};

export { jwtAuth, generateJwtToken };
