export const FormErrors = {
  name: 'The first letter should be uppercase',
  age: 'Sould be a number higher than 0',
  email: 'Email should be correct',
  password_match: 'Passwords should match',
  password_strength: {
    number: 'Should contain 1 number',
    uppercase: 'Should contain 1 uppercased letter',
    lowercase: 'Should contain 1 lowercased letter',
    special: 'Should contain 1 special character',
  },
  file_size: 'The size should be less than 1MB',
  file_extension: 'The extension should be jpeg',
  required: 'Is required field',
  country: 'Please, choose a country from list',
  terms: 'Terms and conditions should be accepted',
  avatar: {
    size: 'The size should be up to 300Kb',
    format: 'Please, add a file in png, jpeg or jpg format',
  },
};

export default FormErrors;
