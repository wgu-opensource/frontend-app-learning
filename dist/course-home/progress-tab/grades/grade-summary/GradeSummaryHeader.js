"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _messages = _interopRequireDefault(require("../messages"));
var _modelStore = require("../../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GradeSummaryHeader = _ref => {
  let {
    intl,
    allOfSomeAssignmentTypeIsLocked
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "row w-100 m-0 align-items-center",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h4 mb-3 mr-1",
      children: intl.formatMessage(_messages.default.gradeSummary)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
      trigger: "click",
      placement: "top",
      show: showTooltip,
      overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Popover.Content, {
          className: "small text-dark-700",
          children: intl.formatMessage(_messages.default.gradeSummaryTooltipBody)
        })
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        onClick: () => {
          setShowTooltip(!showTooltip);
        },
        onBlur: () => {
          setShowTooltip(false);
        },
        alt: intl.formatMessage(_messages.default.gradeSummaryTooltipAlt),
        src: _icons.InfoOutline,
        iconAs: _paragon.Icon,
        className: "mb-3",
        size: "sm",
        disabled: gradesFeatureIsFullyLocked
      })
    }), !gradesFeatureIsFullyLocked && allOfSomeAssignmentTypeIsLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mb-3 small ml-0 d-inline",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        className: "mr-1 mt-1 d-inline-flex",
        style: {
          height: '1rem',
          width: '1rem'
        },
        src: _icons.Blocked,
        "data-testid": "blocked-icon"
      }), intl.formatMessage(_messages.default.gradeSummaryLimitedAccessExplanation)]
    })]
  });
};
GradeSummaryHeader.propTypes = {
  intl: _i18n.intlShape.isRequired,
  allOfSomeAssignmentTypeIsLocked: _propTypes.default.bool.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(GradeSummaryHeader);
//# sourceMappingURL=GradeSummaryHeader.js.map