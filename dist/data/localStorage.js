"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLocalStorage = clearLocalStorage;
exports.getLocalStorage = getLocalStorage;
exports.popLocalStorage = popLocalStorage;
exports.setLocalStorage = setLocalStorage;

// This file holds some convenience methods for dealing with localStorage.
//
// NOTE: These storage keys are not namespaced.  That means that it's shared for the current fully
// qualified domain.  Namespacing could be added, but we'll cross that bridge when we need it.
function getLocalStorage(key) {
  try {
    if (global.localStorage) {
      const rawItem = global.localStorage.getItem(key);

      if (rawItem) {
        return JSON.parse(rawItem);
      }
    }
  } catch (e) {// If this fails for some reason, just return null.
  }

  return null;
}

function setLocalStorage(key, value) {
  try {
    if (global.localStorage) {
      global.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {// If this fails, just bail.
  }
}

function clearLocalStorage(key) {
  try {
    if (global.localStorage) {
      global.localStorage.removeItem(key);
    }
  } catch (e) {// If this fails, just bail.
  }
}

function popLocalStorage(key) {
  const value = getLocalStorage(key);
  clearLocalStorage(key);
  return value;
}
//# sourceMappingURL=localStorage.js.map