"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModel = useModel;
exports.useModels = useModels;

var _reactRedux = require("react-redux");

/*
  Return the selected model with the given id, or an empty object if the model does not exist "{}".
 */
function useModel(type, id) {
  return (0, _reactRedux.useSelector)(state => state.models[type] !== undefined && state.models[type][id] !== undefined ? state.models[type][id] : {}, _reactRedux.shallowEqual);
}

function useModels(type, ids) {
  return (0, _reactRedux.useSelector)(state => ids.map(id => state.models[type] !== undefined && state.models[type][id] !== undefined ? state.models[type][id] : {}), _reactRedux.shallowEqual);
}
//# sourceMappingURL=hooks.js.map