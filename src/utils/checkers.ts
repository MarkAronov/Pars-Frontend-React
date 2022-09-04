import validator from 'validator';

// FUNCTIONS
export const filterDupes = (arr: string[] = []) => {
  const map = new Map();
  let filtered: string[] = [];
  for (const a of arr) {
    if (!map.get(a)) {
      map.set(a, true);
      filtered = filtered.concat(a);
    }
  }
  return filtered;
};

export const usernameChecker = (str = '', dupeStr = '') => {
  const nameErrors: string[] = [];
  if (str === dupeStr) {
    return ['Username is being currently used, try another.'];
  }
  if (str.length > 64) {
    nameErrors.push('Username is longer than 64 characters.');
  }
  if (validator.contains(str, ' ')) {
    nameErrors.push('Username contains whitespace.');
  }
  if (!str.match(/^[0-9a-zA-Z\s]+$/)) {
    nameErrors.push('Username contains none alphanumeric characters.');
  }
  return nameErrors;
};

export const emailChecker = (str = '', dupeStr = '', type = '') => {
  const emailErrors: string[] = [];
  if (str === dupeStr) {
    if (type === 'signup') {
      return ['Email is being currently used, try another.'];
    }
    if (type === 'login') {
      return ['Invalid email'];
    }
  }
  if (str.length > 254) {
    emailErrors.push('Email is longer than 254 characters.');
  }
  if (!validator.isEmail(str)) {
    emailErrors.push('Invalid email.');
  }
  return emailErrors;
};

export const passwordChecker = (str = '') => {
  const passwordErrors: string[] = [];
  const lowercase = str.match(/[a-z]/);
  const uppercase = str.match(/[A-Z]/);
  const numbers = str.match(/[0-9]/);

  // Minimum: 10 chars | 1 Uppercase | 1 lowercase | 1 digit
  if (str.length < 10) {
    passwordErrors.push('Password is less than 10 characters.');
  }
  if (!lowercase) {
    passwordErrors.push('Password must have at least one lowercase.');
  }
  if (!uppercase) {
    passwordErrors.push('Password must have at least one uppercase.');
  }
  if (!numbers) {
    passwordErrors.push('Password must have at least one digit.');
  }

  return passwordErrors;
};

export const entropy = (str: string) => {
  // Password entropy
  const E = str.length * Math.log2(filterDupes(str.split('')).length);

  return E;
};

export const displayNameChecker = (str = '') => {
  const displayNameErrors: string[] = [];
  if (str.length > 128) {
    displayNameErrors.push('Display Name is longer than 128 characters.');
  }
  return displayNameErrors;
};

export const bioChecker = (str = '') => {
  const bioErrors: string[] = [];
  if (str.length > 400) {
    bioErrors.push('Bio is longer than 400 characters');
  }
  return bioErrors;
};
