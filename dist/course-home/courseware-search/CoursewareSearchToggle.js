"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _reactRedux = require("react-redux");
var _messages = _interopRequireDefault(require("./messages"));
var _hooks = require("./hooks");
var _slice = require("../data/slice");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CoursewareSearchToggle = () => {
  const intl = (0, _i18n.useIntl)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const enabled = (0, _hooks.useCoursewareSearchFeatureFlag)();
  const {
    query
  } = (0, _hooks.useCoursewareSearchParams)();
  const handleSearchOpenClick = () => {
    dispatch((0, _slice.setShowSearch)(true));
  };
  (0, _react.useEffect)(() => {
    if (enabled && !!query) {
      handleSearchOpenClick();
    }
  }, [enabled]);
  if (!enabled) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "courseware-search-toggle",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "outline-primary",
      size: "sm",
      className: "p-1 mt-2 mr-2",
      "aria-label": intl.formatMessage(_messages.default.searchOpenAction),
      onClick: handleSearchOpenClick,
      "data-testid": "courseware-search-open-button",
      iconAfter: _icons.ManageSearch,
      children: intl.formatMessage(_messages.default.contentSearchButton)
    })
  });
};
var _default = exports.default = CoursewareSearchToggle;
//# sourceMappingURL=CoursewareSearchToggle.js.map