export const LS = {
  get: (key) => {
    return localStorage.getItem(key);
  },
  set: (key, value) => {
    if (value === null || value === undefined) return;

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};

export const hasToken = () => {
  const jwtToken = LS.get("jwt");

  return Boolean(jwtToken);
};
