export const validUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  age: 30,
};
export const invalidUsers = {
  missingName: {
    email: 'missing.name@example.com',
    age: 30,
  },
  missingEmail: {
    name: 'No Email',
    age: 30,
  },
  missingAge: {
    name: 'No Age',
    email: 'no.age@example.com',
  },
  invalidEmail: {
    name: 'Invalid Email',
    email: 'not-an-email',
    age: 30,
  },
  ageZero: {
    name: 'Age Zero',
    email: 'age.zero@example.com',
    age: 0,
  },
  ageOverLimit: {
    name: 'Age 151',
    email: 'age.151@example.com',
    age: 151,
  },
};
