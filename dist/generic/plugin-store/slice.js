"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerOverrideMethod = exports.reducer = void 0;
var _toolkit = require("@reduxjs/toolkit");
/* eslint-disable no-param-reassign */

const slice = (0, _toolkit.createSlice)({
  name: 'plugin',
  initialState: {},
  reducers: {
    registerOverrideMethod: (state, _ref) => {
      let {
        payload
      } = _ref;
      const {
        pluginName,
        methodName,
        method
      } = payload;
      state[pluginName] = state[pluginName] || {};
      state[pluginName][methodName] = method;
    }
  }
});
const {
  registerOverrideMethod
} = slice.actions;
exports.registerOverrideMethod = registerOverrideMethod;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map