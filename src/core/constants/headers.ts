export const headers = {
  json: {
    'Content-Type': 'application/json',
  },
  auth: (token: string) => ({
    Authentication: token,
  }),
};
