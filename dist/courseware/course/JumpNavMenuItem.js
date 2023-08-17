"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JumpNavMenuItem;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frontendPlatform = require("@edx/frontend-platform");

var _paragon = require("@edx/paragon");

var _analytics = require("@edx/frontend-platform/analytics");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function JumpNavMenuItem(_ref) {
  let {
    title,
    courseId,
    currentSequence,
    currentUnit,
    sequences,
    isDefault
  } = _ref;

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

  function handleClick() {
    const url = destinationUrl();
    logEvent(url);

    _frontendPlatform.history.push(url);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MenuItem, {
    defaultSelected: isDefault,
    onClick: () => handleClick(),
    children: title
  });
}

const sequenceShape = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired
});

JumpNavMenuItem.propTypes = {
  title: _propTypes.default.string.isRequired,
  sequences: _propTypes.default.arrayOf(sequenceShape).isRequired,
  isDefault: _propTypes.default.bool.isRequired,
  courseId: _propTypes.default.string.isRequired,
  currentSequence: _propTypes.default.string.isRequired,
  currentUnit: _propTypes.default.string.isRequired
};
//# sourceMappingURL=JumpNavMenuItem.js.map