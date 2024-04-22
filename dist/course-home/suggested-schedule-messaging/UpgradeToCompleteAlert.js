"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UpgradeToCompleteAlert = _ref => {
  let {
    intl,
    logUpgradeLinkClick
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    datesBannerInfo,
    hasEnded
  } = (0, _modelStore.useModel)('dates', courseId);
  const {
    contentTypeGatingEnabled,
    missedDeadlines,
    verifiedUpgradeLink
  } = datesBannerInfo;
  if (!contentTypeGatingEnabled || missedDeadlines || hasEnded || !verifiedUpgradeLink) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    className: "bg-light-200",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Row, {
      className: "w-100 m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Col, {
        xs: 12,
        md: 9,
        className: "small p-0 pr-md-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Heading, {
          children: intl.formatMessage(_messages.default.upgradeToCompleteHeader)
        }), intl.formatMessage(_messages.default.upgradeToCompleteBody)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Col, {
        xs: 12,
        md: 3,
        className: "align-self-center text-right mt-3 mt-md-0 p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          variant: "brand",
          size: "sm",
          className: "w-xs-100 w-md-auto",
          onClick: () => {
            logUpgradeLinkClick();
            global.location.replace(verifiedUpgradeLink);
          },
          children: intl.formatMessage(_messages.default.upgradeToCompleteButton)
        })
      })]
    })
  });
};
UpgradeToCompleteAlert.propTypes = {
  intl: _i18n.intlShape.isRequired,
  logUpgradeLinkClick: _propTypes.default.func
};
UpgradeToCompleteAlert.defaultProps = {
  logUpgradeLinkClick: () => {}
};
var _default = (0, _i18n.injectIntl)(UpgradeToCompleteAlert);
exports.default = _default;
//# sourceMappingURL=UpgradeToCompleteAlert.js.map