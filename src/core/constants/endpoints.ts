export const endpoints = {
  users: (environment: string) => `/${environment}/users`,
  userByEmail: (environment: string, email: string) =>
    `/${environment}/users/${encodeURIComponent(email)}`,
};
