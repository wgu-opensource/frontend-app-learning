"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActiveEnterpriseAlert;

var _react = _interopRequireWildcard(require("react"));

var _userMessages = require("../../generic/user-messages");

var _modelStore = require("../../generic/model-store");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ActiveEnterpriseAlert = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./ActiveEnterpriseAlert'))));

function useActiveEnterpriseAlert(courseId) {
  const {
    courseAccess
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  /**
   * This alert should render if
   *    1. course access code is incorrect_active_enterprise
   */

  const isVisible = courseAccess && !courseAccess.hasAccess && courseAccess.errorCode === 'incorrect_active_enterprise';
  const payload = {
    text: courseAccess && courseAccess.userMessage,
    courseId
  };
  (0, _userMessages.useAlert)(isVisible, {
    code: 'clientActiveEnterpriseAlert',
    topic: 'outline',
    dismissible: false,
    type: _userMessages.ALERT_TYPES.ERROR,
    payload: (0, _react.useMemo)(() => payload, Object.values(payload).sort())
  });
  return {
    clientActiveEnterpriseAlert: ActiveEnterpriseAlert
  };
}
//# sourceMappingURL=hooks.js.map