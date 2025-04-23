"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ContentLock = _ref => {
  let {
    intl,
    courseId,
    prereqSectionName,
    prereqId,
    sequenceTitle
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleClick = (0, _react.useCallback)(() => {
    navigate(`/course/${courseId}/${prereqId}`);
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
var _default = exports.default = (0, _i18n.injectIntl)(ContentLock);
//# sourceMappingURL=ContentLock.js.map