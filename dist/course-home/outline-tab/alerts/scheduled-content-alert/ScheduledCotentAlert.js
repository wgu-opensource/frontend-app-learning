"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ScheduledContentAlert(_ref) {
  let {
    payload
  } = _ref;
  const {
    datesTabLink
  } = payload;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: "info",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex flex-column flex-lg-row justify-content-between align-items-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col-lg-7",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Heading, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learning.outline.alert.scheduled-content.heading",
            defaultMessage: "More content is coming soon!"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "learning.outline.alert.scheduled-content.body",
          defaultMessage: "This course will have more content released at a future date. Look out for email updates or check back on this course for updates."
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "flex-grow-0 pt-3 pt-lg-0",
        children: datesTabLink && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          href: datesTabLink,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learning.outline.alert.scheduled-content.button",
            defaultMessage: "View Course Schedule"
          })
        })
      })]
    })
  });
}

ScheduledContentAlert.propTypes = {
  payload: _propTypes.default.shape({
    datesTabLink: _propTypes.default.string
  }).isRequired
};
var _default = ScheduledContentAlert;
exports.default = _default;
//# sourceMappingURL=ScheduledCotentAlert.js.map