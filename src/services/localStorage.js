export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function get(key) {
  let value = localStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {
    /* non-json value */
  }

  return value;
}

export default {
  set,
  get,
};
