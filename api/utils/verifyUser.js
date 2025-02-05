import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Ensure token is being sent as a cookie
  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized: Invalid token'));
    }
    req.user = user; // Attach user data to the request object
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err); // If there's an error, pass it along to the error handler
    next(); // User verified successfully
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err); // If error occurs, forward it to the error handler
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Access denied. Admins only.'));
    }
    next(); // User is an admin
  });
};
