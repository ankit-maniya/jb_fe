export const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};
