export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
