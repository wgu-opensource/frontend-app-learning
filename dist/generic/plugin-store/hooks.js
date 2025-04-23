"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePluginsCallback = usePluginsCallback;
var _reactRedux = require("react-redux");
// eslint-disable-next-line import/prefer-default-export
function usePluginsCallback(methodName, defaultMethod) {
  return (0, _reactRedux.useSelector)(state => () => {
    let result = defaultMethod();
    Object.values(state.plugins).forEach(plugin => {
      if (plugin[methodName]) {
        result = plugin[methodName](result);
      }
    });
    return result;
  }, _reactRedux.shallowEqual);
}
//# sourceMappingURL=hooks.js.map