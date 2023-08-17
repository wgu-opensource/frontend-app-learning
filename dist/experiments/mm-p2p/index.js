"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MMP2PBlockModal", {
  enumerable: true,
  get: function () {
    return _BlockModal.default;
  }
});
Object.defineProperty(exports, "MMP2PFlyover", {
  enumerable: true,
  get: function () {
    return _Flyover.default;
  }
});
Object.defineProperty(exports, "MMP2PFlyoverMobile", {
  enumerable: true,
  get: function () {
    return _FlyoverMobile.default;
  }
});
Object.defineProperty(exports, "MMP2PFlyoverTrigger", {
  enumerable: true,
  get: function () {
    return _FlyoverTrigger.default;
  }
});
Object.defineProperty(exports, "MMP2PFlyoverTriggerMobile", {
  enumerable: true,
  get: function () {
    return _FlyoverTriggerMobile.default;
  }
});
Object.defineProperty(exports, "MMP2PLockPaywall", {
  enumerable: true,
  get: function () {
    return _LockPaywall.default;
  }
});
Object.defineProperty(exports, "MMP2PSidecard", {
  enumerable: true,
  get: function () {
    return _Sidecard.default;
  }
});
exports.initHomeMMP2P = exports.initDatesMMP2P = exports.initCoursewareMMP2P = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _modelStore = require("../../generic/model-store");

var _BlockModal = _interopRequireDefault(require("./BlockModal"));

var _Flyover = _interopRequireDefault(require("./Flyover"));

var _FlyoverMobile = _interopRequireDefault(require("./FlyoverMobile"));

var _FlyoverTrigger = _interopRequireDefault(require("./FlyoverTrigger"));

var _FlyoverTriggerMobile = _interopRequireDefault(require("./FlyoverTriggerMobile"));

var _LockPaywall = _interopRequireDefault(require("./LockPaywall"));

var _Sidecard = _interopRequireDefault(require("./Sidecard"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MMP2PKeys = (0, _utils.StrictDict)({
  enableFn: 'enable',
  flyoverVisible: 'flyoverVisible',
  state: 'state',
  access: 'access',
  meta: 'meta'
});
let location;

const windowKey = field => `experiment__mmp2p_${location}_${field}`;

const setWindowVal = (field, val) => {
  window[windowKey(field)] = val;
};

const windowVal = field => window[windowKey(field)];

const defaultWindowVal = (field, val) => windowVal(field) === undefined ? val : windowVal(field);

const createWindowStateSetter = (stateSetter, key) => value => {
  stateSetter(value);
  setWindowVal(key, value);
};

const externalConfig = {
  runs: [{
    upgradeDeadline: 'Mar 29 2021 11:59 PM EST',
    courses: [{
      courseRun: 'course-v1:edX+DemoX+Demo_Course',
      subSections: ['block-v1:edX+DemoX+Demo_Course+type@sequential+block@edx_introduction', 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@19a30717eff543078a5d94ae9d6c18a5', 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@basic_questions', 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@simulations', 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@graded_simulations', 'block-v1:edX+DemoX+Demo_Course+type@sequential+block@175e76c4951144a29d46211361266e0e']
    }]
  }]
};

const initDatesMMP2P = () => {
  location = 'dates';
  const defaultState = {
    isEnabled: false,
    upgradeDeadline: null
  };
  const [MMP2POptions, setMMP2POptions] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.state, _objectSpread({}, defaultState)));
  setWindowVal(MMP2PKeys.enableFn, upgradeDeadline => {
    if (upgradeDeadline === undefined) {
      setMMP2POptions(_objectSpread({}, defaultState));
    } else {
      setMMP2POptions({
        isEnabled: true,
        upgradeDeadline
      });
    }
  });
  return {
    state: MMP2POptions
  };
};

exports.initDatesMMP2P = initDatesMMP2P;

const initHomeMMP2P = courseId => {
  location = 'home';
  const defaultState = {
    isEnabled: false,
    upgradeDeadline: null,
    afterUpgradeDeadline: false
  };
  const defaultAccess = {
    isAudit: false,
    accessExpirationDate: null,
    upgradeUrl: null,
    price: null
  };
  const [MMP2POptions, _setMMP2POptions] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.state, _objectSpread({}, defaultState)));
  const [MMP2PAccess, _setMMP2PAccess] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.access, _objectSpread({}, defaultAccess)));
  const setMMP2POptions = createWindowStateSetter(_setMMP2POptions, MMP2PKeys.state);
  const setMMP2PAccess = createWindowStateSetter(_setMMP2PAccess, MMP2PKeys.access);
  const {
    accessExpiration,
    verifiedMode
  } = (0, _modelStore.useModel)('outline', courseId);

  const loadAccess = () => {
    if (accessExpiration !== null && accessExpiration !== undefined) {
      setMMP2PAccess({
        isAudit: true,
        accessExpirationDate: accessExpiration.expirationDate,
        upgradeUrl: accessExpiration.upgradeUrl,
        price: verifiedMode !== null && verifiedMode !== undefined ? `${verifiedMode.currencySymbol}${verifiedMode.price}` : ''
      });
    }
  };

  const enableFunction = upgradeDeadline => {
    if (upgradeDeadline === undefined) {
      setMMP2POptions(_objectSpread({}, defaultState));
      setMMP2PAccess(_objectSpread({}, defaultAccess));
    } else {
      setMMP2POptions({
        isEnabled: true,
        upgradeDeadline,
        afterUpgradeDeadline: new Date() > new Date(upgradeDeadline)
      });
      loadAccess();
    }
  };

  setWindowVal(MMP2PKeys.enableFn, enableFunction);
  return {
    state: MMP2POptions,
    access: MMP2PAccess
  };
};

exports.initHomeMMP2P = initHomeMMP2P;

const initCoursewareMMP2P = (courseId, sequenceId, unitId) => {
  location = 'course';
  const defaultState = {
    isEnabled: false,
    upgradeDeadline: null,
    afterUpgradeDeadline: false,
    subSections: [],
    isWhitelisted: false
  };
  const defaultAccess = {
    isAudit: false,
    accessExpirationDate: null,
    upgradeUrl: null,
    price: null
  };
  const defaultMeta = {
    blockContent: false,
    gradedLock: false,
    modalLock: false,
    showLock: false,
    verifiedLock: false
  };
  const [MMP2POptions, _setMMP2POptions] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.state, _objectSpread({}, defaultState)));
  const [MMP2PAccess, _setMMP2PAccess] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.access, _objectSpread({}, defaultAccess)));
  const [MMP2PMeta, _setMMP2PMeta] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.meta, _objectSpread({}, defaultMeta)));
  const [MMP2PIsFlyoverVisible, setMMP2PIsFlyoverVisible] = (0, _react.useState)(defaultWindowVal(MMP2PKeys.flyoverVisible, !(0, _utils.isMobile)()));
  const setMMP2POptions = createWindowStateSetter(_setMMP2POptions, MMP2PKeys.state);
  const setMMP2PAccess = createWindowStateSetter(_setMMP2PAccess, MMP2PKeys.access);
  const setMMP2PMeta = createWindowStateSetter(_setMMP2PMeta, MMP2PKeys.meta);
  const flyover = {
    isVisible: MMP2PIsFlyoverVisible,
    toggle: () => {
      setMMP2PIsFlyoverVisible(!MMP2PIsFlyoverVisible);
      setWindowVal(MMP2PKeys.flyoverVisible, !MMP2PIsFlyoverVisible);
    }
  };

  const loadOptions = (upgradeDeadline, subSections) => (dispatch, getState) => {
    const state = getState();
    const options = {
      isEnabled: true,
      upgradeDeadline,
      afterUpgradeDeadline: new Date() > new Date(upgradeDeadline),
      isWhitelisted: subSections.indexOf(sequenceId) > -1
    };
    setMMP2POptions(options);
    const models = {
      coursewareMeta: state.models.coursewareMeta[courseId],
      courseHomeMeta: state.models.courseHomeMeta[courseId],
      units: state.models.units[unitId]
    };
    const {
      accessExpiration
    } = models.coursewareMeta;
    const {
      verifiedMode
    } = models.courseHomeMeta;
    const graded = models.units !== undefined ? models.units.graded : false;
    let access = {};

    if (accessExpiration !== null && accessExpiration !== undefined) {
      access = {
        isAudit: true,
        accessExpirationDate: accessExpiration.expirationDate,
        upgradeUrl: accessExpiration.upgradeUrl,
        price: verifiedMode !== null && verifiedMode !== undefined ? `${verifiedMode.currencySymbol}${verifiedMode.price}` : ''
      };
      setMMP2PAccess(access);
    }

    const meta = {
      verifiedLock: access.isAudit && !options.isWhitelisted,
      gradedLock: access.isAudit && options.isWhitelisted && graded,
      modalLock: access.isAudit && !options.isWhitelisted && options.afterUpgradeDeadline
    };
    meta.showLock = options.isEnabled && (meta.verifiedLock || meta.gradedLock);
    meta.blockContent = options.isEnabled && meta.verifiedLock;
    setMMP2PMeta(meta);
  };

  const dispatch = (0, _reactRedux.useDispatch)();

  const enableFunction = (upgradeDeadline, subSections) => {
    if (subSections.length !== undefined && subSections.length > 0) {
      dispatch(loadOptions(upgradeDeadline, subSections));
    } else {
      setMMP2POptions(_objectSpread({}, defaultState));
      setMMP2PAccess(_objectSpread({}, defaultAccess));
      setMMP2PMeta(_objectSpread({}, defaultMeta));
    }
  };

  setWindowVal(MMP2PKeys.enableFn, enableFunction); // testing

  setWindowVal('externalConfig', externalConfig);
  const config = {
    access: MMP2PAccess,
    flyover,
    meta: MMP2PMeta,
    state: MMP2POptions
  };
  return config;
};

exports.initCoursewareMMP2P = initCoursewareMMP2P;
//# sourceMappingURL=index.js.map