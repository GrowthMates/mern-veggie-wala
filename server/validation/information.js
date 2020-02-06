const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateInformationInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.number = !isEmpty(data.number) ? data.number : "";
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.address = !isEmpty(data.address) ? data.address : "";


  // data.userType = !isEmpty(data.userType) ? data.userType : "";
// Name checks
  if (Validator.isEmpty(data.number)) {
    errors.number = "Number field is required";
  }
// Email checks
  if (Validator.isEmpty(data.fname)) {
    errors.fname = "Firstname field is required";
  } 
// Password checks
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Lastname field is required";
  }
if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

// if (Validator.isEmpty(data.userType)) {
//    errors.userType = "User Type is required";
//  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};