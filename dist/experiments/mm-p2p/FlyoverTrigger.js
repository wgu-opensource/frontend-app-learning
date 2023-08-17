"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FlyoverTrigger = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FlyoverTriggerIcon = _interopRequireDefault(require("./FlyoverTriggerIcon"));

var _utils = require("./utils");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
const FlyoverTrigger = _ref => {
  let {
    options
  } = _ref;
  const {
    isVisible,
    toggle
  } = options.flyover;

  if (!options.access.isAudit || options.state.afterUpgradeDeadline) {
    return null;
  }

  return !(0, _utils.isMobile)() && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)('mmp2p-toggle-flyover-button', {
      'flyover-visible': isVisible
    }),
    "aria-hidden": "true",
    onClick: toggle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlyoverTriggerIcon.default, {})
  });
};

exports.FlyoverTrigger = FlyoverTrigger;
FlyoverTrigger.propTypes = {
  options: _propTypes.default.shape({
    access: _propTypes.default.shape({
      isAudit: _propTypes.default.bool.isRequired
    }),
    flyover: _propTypes.default.shape({
      isVisible: _propTypes.default.bool.isRequired,
      toggle: _propTypes.default.func.isRequired
    }),
    state: _propTypes.default.shape({
      afterUpgradeDeadline: _propTypes.default.bool.isRequired,
      isEnabled: _propTypes.default.bool.isRequired
    })
  })
};
FlyoverTrigger.defaultProps = {
  options: {
    access: {
      isAudit: false
    },
    flyover: {
      isVisible: false,
      toggle: () => {}
    },
    state: {
      afterUpgradeDeadline: false,
      isEnabled: false
    }
  }
};
var _default = FlyoverTrigger;
exports.default = _default;
//# sourceMappingURL=FlyoverTrigger.js.map