export const getLocalStorage = () :{token: string, name: string} => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  return { token, name };
};

export const clearLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
};

export const setLocalStorage = (token: string, name: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
};