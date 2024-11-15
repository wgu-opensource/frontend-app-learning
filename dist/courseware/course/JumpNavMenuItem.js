"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _analytics = require("@edx/frontend-platform/analytics");
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const JumpNavMenuItem = _ref => {
  let {
    title,
    courseId,
    currentSequence,
    currentUnit,
    sequences,
    isDefault,
    onClick
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  function logEvent(targetUrl) {
    const eventName = 'edx.ui.lms.jump_nav.selected';
    const payload = {
      target_name: title,
      id: targetUrl,
      current_id: courseId,
      widget_placement: 'breadcrumb'
    };
    (0, _analytics.sendTrackEvent)(eventName, payload);
    (0, _analytics.sendTrackingLogEvent)(eventName, payload);
  }
  function destinationUrl() {
    if (isDefault) {
      return `/course/${courseId}/${currentSequence}/${currentUnit}`;
    }
    return `/course/${courseId}/${sequences[0].id}`;
  }
  function handleClick(e) {
    const url = destinationUrl();
    logEvent(url);
    navigate(url);
    if (onClick) {
      onClick(e);
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
    active: isDefault,
    onClick: e => handleClick(e),
    children: title
  });
};
const sequenceShape = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired
});
JumpNavMenuItem.defaultProps = {
  onClick: null
};
JumpNavMenuItem.propTypes = {
  title: _propTypes.default.string.isRequired,
  sequences: _propTypes.default.arrayOf(sequenceShape).isRequired,
  isDefault: _propTypes.default.bool.isRequired,
  courseId: _propTypes.default.string.isRequired,
  currentSequence: _propTypes.default.string.isRequired,
  currentUnit: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func
};
var _default = JumpNavMenuItem;
exports.default = _default;
//# sourceMappingURL=JumpNavMenuItem.js.map