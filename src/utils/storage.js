import _ from "lodash";

export function getItem(key) {
  return window.safeStorage.getItem(key);
}

export function saveItem(key, value) {
  return window.safeStorage.setItem(key, value);
}

export function getList(key) {
  return JSON.parse(window.safeStorage.getItem(key));
}

export function saveList(key, value) {
  return window.safeStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
  return window.safeStorage.removeItem(key);
}

export function appendToList(key, value) {
  let list = getList(key);
  if (!list) list = [];
  return window.safeStorage.setItem(key, JSON.stringify(list.concat(value)));
}

export function removeFromList(key, value) {
  let list = getList(key);
  if (list) {
    return window.safeStorage.setItem(key, JSON.stringify(_.pull(list, value)));
  }
}
