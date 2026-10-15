const rateLimit = require("express-rate-limit");

/**
 * Login limiter: 5 attempts per 15 minutes per IP.
 * Skips successful requests so legitimate users aren't punished.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

/**
 * Register limiter: 3 signups per hour per IP.
 * Prevents mass account creation / spam.
 */
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many accounts created from this IP. Try again later.",
  },
});

module.exports = { loginLimiter, registerLimiter };
