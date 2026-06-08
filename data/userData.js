// data/userData.js

export const users = [
  { id: '1', name: 'Alia', email: 'alia@gmail.com', password: '1234' },
  { id: '2', name: 'Test User', email: 'test@gmail.com', password: 'test123' },
];

// Function untuk add user baru (Register)
export const addUser = (newUser) => {
  users.push(newUser);
};

// Function untuk check login
export const findUser = (email, password) => {
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
};

// Function untuk check email dah wujud
export const emailExists = (email) => {
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};