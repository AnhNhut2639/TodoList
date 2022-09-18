const TOKEN_NAME = "array";
let arr = [];
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_NAME)) || [];
};
export const saveToken = (token) => {
  const { id, content, completed } = token;
  arr = [{ id, content, completed }, ...arr];
  localStorage.setItem(TOKEN_NAME, JSON.stringify(arr));
};
