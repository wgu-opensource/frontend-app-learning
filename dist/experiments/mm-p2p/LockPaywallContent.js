"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");

var _edX_certificate = _interopRequireDefault(require("../../generic/assets/edX_certificate.png"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LockPaywallContent = _ref => {
  let {
    options
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "border border-gray rounded d-flex justify-content-between mt-2 p-3",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h4", {
        className: "font-weight-bold mb-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _faLock.faLock,
          className: "text-black mr-2 ml-1",
          style: {
            fontSize: '2rem'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: "Verified Track Access"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        className: "mb-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          children: [options.meta.gradedLock && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: "Grades assessments are available to Verified Track learners."
          }), options.meta.verifiedLock && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: "Audit access is limited to the first two weeks of scheduled content. \xA0 To access the full course content,"
          })]
        }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          className: "lock_paywall_upgrade_link",
          href: options.access.upgradeUrl,
          children: [options.meta.gradedLock ? 'Upgrade to unlock ' : 'upgrade to a verified certificate.', "(", options.access.price, ")"]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        alt: "Example Certificate",
        src: _edX_certificate.default,
        className: "border-0",
        style: {
          height: '70px'
        }
      })
    })]
  });
};

LockPaywallContent.propTypes = {
  options: _propTypes.default.shape({
    access: _propTypes.default.shape({
      upgradeUrl: _propTypes.default.string.isRequired,
      price: _propTypes.default.string.isRequired
    }),
    meta: _propTypes.default.shape({
      gradedLock: _propTypes.default.bool.isRequired,
      verifiedLock: _propTypes.default.bool.isRequired
    })
  })
};
LockPaywallContent.defaultProps = {
  options: {
    access: {
      upgradeUrl: '',
      price: '$23'
    },
    meta: {
      gradedLock: false,
      verifiedLock: false
    }
  }
};
var _default = LockPaywallContent;
exports.default = _default;
//# sourceMappingURL=LockPaywallContent.js.map