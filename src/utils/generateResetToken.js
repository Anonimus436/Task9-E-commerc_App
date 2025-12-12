// src/utils/generateResetToken.js
const crypto = require('crypto');

const generateResetToken = () => {
  // 1) Generate a random token
  const resetToken = crypto.randomBytes(32).toString('hex'); // 32 bytes = 64 hex characters

  // 2) Hash the token and set to resetPasswordToken field in the user schema
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 3) Set token expiration time (e.g., 10 minutes from now)
  const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds

  return {
    resetToken, 
    hashedResetToken, 
    resetTokenExpire,
  };
};

module.exports =  generateResetToken;
