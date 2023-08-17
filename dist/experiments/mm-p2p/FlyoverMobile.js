"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FlyoverMobile = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faChevronLeft = require("@fortawesome/free-solid-svg-icons/faChevronLeft");

var _Sidecard = _interopRequireDefault(require("./Sidecard"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
const FlyoverMobile = _ref => {
  let {
    options
  } = _ref;
  const {
    access: {
      isAudit
    },
    flyover: {
      toggle
    },
    state: {
      afterUpgradeDeadline
    }
  } = options;

  const handleReturnSpanKeyPress = event => {
    if (event.key === 'Enter') {
      toggle();
    }
  };

  if (!isAudit || afterUpgradeDeadline) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "mmp2p-flyover-mobile",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mmp2p-mobile-return-div",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "mmp2p-mobile-return-span",
        onClick: toggle,
        onKeyPress: handleReturnSpanKeyPress,
        role: "button",
        tabIndex: 0,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: _faChevronLeft.faChevronLeft,
          className: "mr-2 fa-lg",
          style: {
            marginBottom: 2
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "mmp2p-mobile-return-text",
          children: "Back to course"
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mmp2p-notification-div",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "mmp2p-notification-span",
        children: "Notifications"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mmp2p-notification-block",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidecard.default, {
          options: options
        })
      })]
    })]
  });
};

exports.FlyoverMobile = FlyoverMobile;
FlyoverMobile.propTypes = {
  options: _propTypes.default.shape({
    access: _propTypes.default.shape({
      isAudit: _propTypes.default.bool.isRequired
    }),
    flyover: _propTypes.default.shape({
      toggle: _propTypes.default.func.isRequired
    }),
    state: _propTypes.default.shape({
      afterUpgradeDeadline: _propTypes.default.bool.isRequired
    })
  })
};
FlyoverMobile.defaultProps = {
  options: {
    access: {
      isAudit: false
    },
    flyover: {
      toggle: () => {}
    },
    state: {
      afterUpgradeDeadline: false
    }
  }
};
var _default = FlyoverMobile;
exports.default = _default;
//# sourceMappingURL=FlyoverMobile.js.map