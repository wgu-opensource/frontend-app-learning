"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModelsMap = exports.updateModels = exports.updateModel = exports.removeModels = exports.removeModel = exports.reducer = exports.addModelsMap = exports.addModels = exports.addModel = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    addModel: (state, _ref) => {
      let {
        payload
      } = _ref;
      const {
        modelType,
        model,
        idField
      } = payload;
      add(state, modelType, model, idField);
    },
    addModels: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      const {
        modelType,
        models,
        idField
      } = payload;
      models.forEach(model => add(state, modelType, model, idField));
    },
    addModelsMap: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      const {
        modelType,
        modelsMap,
        idField
      } = payload;
      Object.values(modelsMap).forEach(model => add(state, modelType, model, idField));
    },
    updateModel: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      const {
        modelType,
        model,
        idField
      } = payload;
      update(state, modelType, model, idField);
    },
    updateModels: (state, _ref5) => {
      let {
        payload
      } = _ref5;
      const {
        modelType,
        models,
        idField
      } = payload;
      models.forEach(model => update(state, modelType, model, idField));
    },
    updateModelsMap: (state, _ref6) => {
      let {
        payload
      } = _ref6;
      const {
        modelType,
        modelsMap,
        idField
      } = payload;
      Object.values(modelsMap).forEach(model => update(state, modelType, model, idField));
    },
    removeModel: (state, _ref7) => {
      let {
        payload
      } = _ref7;
      const {
        modelType,
        id
      } = payload;
      remove(state, modelType, id);
    },
    removeModels: (state, _ref8) => {
      let {
        payload
      } = _ref8;
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