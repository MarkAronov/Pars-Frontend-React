/**
 * Removes dupes in array
 * @param {array} arr the error array list
 * @return {object} returns a filtered array
 */
const filterDupes = (arr) => {
  const map = new Map();
  let filtered = [];

  for (const a of arr) {
    if (map.get(a) === undefined) {
      map.set(a, true);
      filtered = filtered.concat(a);
    }
  }
  return filtered;
};

/**
 * The passwordChecker component, checks for whether if the
 * password meets the minimum requirements
 * @param {string} str the password
 * @param {array} passwordErrors the error array list
 * @param {func} setpasswordErrorList the function that set the errors
 * @return {object} returns a signup component
 */
const passwordChecker = (str, passwordErrors, setpasswordErrorList) => {
  const lowercase = str.match(/[a-z]/);
  const uppercase = str.match(/[A-Z]/);
  const numbers = str.match(/[0-9]/);

  passwordErrors = [];
  // Minimum: 10 chars | 1 Uppercase | 1 lowercase | 1 digit
  if (str.length < 10) {
    passwordErrors.push('Password is less than 10 characters');
  }
  if (!lowercase) {
    passwordErrors.push('Password must have at least one lowercase');
  }
  if (!uppercase) {
    passwordErrors.push('Password must have at least one uppercase');
  }
  if (!numbers) {
    passwordErrors.push('Password must have at least one digit');
  }
  setpasswordErrorList(passwordErrors);

  // Password entropy used to mesure the strenght
  const Entropy = str.length * Math.log2(filterDupes(str.split('')).length);

  return { passwordErrors, Entropy };
};

export default passwordChecker;
