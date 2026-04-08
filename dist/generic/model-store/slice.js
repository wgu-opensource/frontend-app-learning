"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModelsMap = exports.updateModels = exports.updateModel = exports.removeModels = exports.removeModel = exports.reducer = exports.addModelsMap = exports.addModels = exports.addModel = void 0;
var _toolkit = require("@reduxjs/toolkit");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-param-reassign */
function add(state, modelType, model, idField) {
  idField = idField ?? 'id';
  const id = model[idField];
  if (state[modelType] === undefined) {
    state[modelType] = {};
  }
  state[modelType][id] = model;
}
function update(state, modelType, model, idField) {
  idField = idField ?? 'id';
  const id = model[idField];
  if (state[modelType] === undefined) {
    state[modelType] = {};
  }
  state[modelType][id] = _objectSpread(_objectSpread({}, state[modelType][id]), model);
}
function remove(state, modelType, id) {
  if (state[modelType] === undefined) {
    state[modelType] = {};
  }
  delete state[modelType][id];
}
const slice = (0, _toolkit.createSlice)({
  name: 'models',
  initialState: {},
  reducers: {
    addModel: (state, {
      payload
    }) => {
      const {
        modelType,
        model,
        idField
      } = payload;
      add(state, modelType, model, idField);
    },
    addModels: (state, {
      payload
    }) => {
      const {
        modelType,
        models,
        idField
      } = payload;
      models.forEach(model => add(state, modelType, model, idField));
    },
    addModelsMap: (state, {
      payload
    }) => {
      const {
        modelType,
        modelsMap,
        idField
      } = payload;
      Object.values(modelsMap).forEach(model => add(state, modelType, model, idField));
    },
    updateModel: (state, {
      payload
    }) => {
      const {
        modelType,
        model,
        idField
      } = payload;
      update(state, modelType, model, idField);
    },
    updateModels: (state, {
      payload
    }) => {
      const {
        modelType,
        models,
        idField
      } = payload;
      models.forEach(model => update(state, modelType, model, idField));
    },
    updateModelsMap: (state, {
      payload
    }) => {
      const {
        modelType,
        modelsMap,
        idField
      } = payload;
      Object.values(modelsMap).forEach(model => update(state, modelType, model, idField));
    },
    removeModel: (state, {
      payload
    }) => {
      const {
        modelType,
        id
      } = payload;
      remove(state, modelType, id);
    },
    removeModels: (state, {
      payload
    }) => {
      const {
        modelType,
        ids
      } = payload;
      ids.forEach(id => remove(state, modelType, id));
    }
  }
});
const {
  addModel,
  addModels,
  addModelsMap,
  updateModel,
  updateModels,
  updateModelsMap,
  removeModel,
  removeModels
} = slice.actions;
exports.removeModels = removeModels;
exports.removeModel = removeModel;
exports.updateModelsMap = updateModelsMap;
exports.updateModels = updateModels;
exports.updateModel = updateModel;
exports.addModelsMap = addModelsMap;
exports.addModels = addModels;
exports.addModel = addModel;
const {
  reducer
} = slice;
exports.reducer = reducer;
//# sourceMappingURL=slice.js.map