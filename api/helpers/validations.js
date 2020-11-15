
import env from '../env';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if(typeof input == "string" && input.replace(/\s/g, '').length) {
    return false;
  }
  if(typeof input == "object"){
    if (input == null || input == '' || input.length == 0)
      return true;
    else
      return false;
  }
  return false;
};

  const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };

  const isValidatePassword = (password) => {
    if (password.length < 8 || password === '') {
      return false;
    }
    return true;
  };
const generateToken = (email,user_id,username,user_type_code,full_Name) =>{
  console.log(process.env.JWT_SECRET);
  const  token = jwt.sign({
    email,
    user_id,
    username,
    user_type_code,
    full_Name
     },process.env.JWT_SECRET,{
    expiresIn: "3d"
  });
return token;
};

/**
 *  MH  - Add Password Validation
 *
 */
var passwordValidator = require('password-validator');
var passwordChecker = new passwordValidator();

 passwordChecker
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
// /* -------------- End Of Password Validator ------------  */


export {
isEmpty,
passwordChecker,
isValidEmail,
isValidatePassword,
generateToken
};
