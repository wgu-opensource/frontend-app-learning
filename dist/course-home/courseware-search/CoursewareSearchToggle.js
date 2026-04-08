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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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