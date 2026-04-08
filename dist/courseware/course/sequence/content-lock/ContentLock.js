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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ContentLock = ({
  courseId,
  prereqSectionName,
  prereqId,
  sequenceTitle
}) => {
  const intl = (0, _i18n.useIntl)();
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
  courseId: _propTypes.default.string.isRequired,
  prereqSectionName: _propTypes.default.string.isRequired,
  prereqId: _propTypes.default.string.isRequired,
  sequenceTitle: _propTypes.default.string.isRequired
};
var _default = exports.default = ContentLock;
//# sourceMappingURL=ContentLock.js.map