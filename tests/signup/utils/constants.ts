export const invalidFieldTestCases = [
  {
    field: 'FirstName',
    firstName: '',
    lastName: 'Andersson',
    email: 'axel.andersson@netlight.com',
    password: 'password123',
    error: 'Invalid signup details',
  },
  {
    field: 'LastName',
    firstName: 'Axel',
    lastName: '',
    email: 'axel.andersson@netlight.com',
    password: 'password123',
    error: 'Invalid signup details',
  },
  {
    field: 'Email',
    firstName: 'Axel',
    lastName: 'Andersson',
    email: 'invalidEmail',
    password: 'password123',
    error: 'Invalid signup details',
  },
  {
    field: 'Password',
    firstName: 'Axel',
    lastName: 'Andersson',
    email: 'axel.andersson@netlight.com',
    password: 'short',
    error: 'Invalid signup details',
  },
]
