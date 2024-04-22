"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@edx/paragon");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ContentLock = _ref => {
  let {
    intl,
    courseId,
    prereqSectionName,
    prereqId,
    sequenceTitle
  } = _ref;
  const handleClick = (0, _react.useCallback)(() => {
    _frontendPlatform.history.push(`/course/${courseId}/${prereqId}`);
  }, [courseId, prereqId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faLock.faLock
      }), ' ', sequenceTitle]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
      children: intl.formatMessage(_messages.default['learn.contentLock.content.locked'])
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: intl.formatMessage(_messages.default['learn.contentLock.complete.prerequisite'], {
        prereqSectionName
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "primary",
        onClick: handleClick,
        children: intl.formatMessage(_messages.default['learn.contentLock.goToSection'])
      })
    })]
  });
};
ContentLock.propTypes = {
  intl: _i18n.intlShape.isRequired,
  courseId: _propTypes.default.string.isRequired,
  prereqSectionName: _propTypes.default.string.isRequired,
  prereqId: _propTypes.default.string.isRequired,
  sequenceTitle: _propTypes.default.string.isRequired
};
var _default = (0, _i18n.injectIntl)(ContentLock);
exports.default = _default;
//# sourceMappingURL=ContentLock.js.map