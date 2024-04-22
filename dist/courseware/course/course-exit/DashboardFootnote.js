"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _faCalendarAlt = require("@fortawesome/free-regular-svg-icons/faCalendarAlt");
var _frontendPlatform = require("@edx/frontend-platform");
var _modelStore = require("../../../generic/model-store");
var _Footnote = _interopRequireDefault(require("./Footnote"));
var _messages = _interopRequireDefault(require("./messages"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DashboardFootnote = _ref => {
  let {
    intl,
    variant
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const dashboardLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/dashboard`,
    className: "text-reset",
    onClick: () => (0, _utils.logClick)(org, courseId, administrator, 'dashboard_footnote', {
      variant
    }),
    children: intl.formatMessage(_messages.default.dashboardLink)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footnote.default, {
    icon: _faCalendarAlt.faCalendarAlt,
    text: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "courseCelebration.dashboardInfo" // for historical reasons
      ,
      defaultMessage: "You can access this course and its materials on your {dashboardLink}.",
      description: "Text that precedes link to learner's dashboard",
      values: {
        dashboardLink
      }
    })
  });
};
DashboardFootnote.propTypes = {
  intl: _i18n.intlShape.isRequired,
  variant: _propTypes.default.string.isRequired
};
var _default = (0, _i18n.injectIntl)(DashboardFootnote);
exports.default = _default;
//# sourceMappingURL=DashboardFootnote.js.map