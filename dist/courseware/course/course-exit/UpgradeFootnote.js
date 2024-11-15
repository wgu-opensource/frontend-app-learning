"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _faCalendarAlt = require("@fortawesome/free-regular-svg-icons/faCalendarAlt");
var _Footnote = _interopRequireDefault(require("./Footnote"));
var _utils = require("./utils");
var _messages = _interopRequireDefault(require("./messages"));
var _modelStore = require("../../../generic/model-store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UpgradeFootnote = _ref => {
  let {
    deadline,
    href,
    intl
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
  const upgradeLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: href,
    className: "text-reset",
    onClick: () => (0, _utils.logClick)(org, courseId, administrator, 'upgrade_footnote'),
    children: intl.formatMessage(_messages.default.upgradeLink)
  });
  const expirationDate = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedDate, {
    day: "numeric",
    month: "long",
    year: "numeric",
    value: deadline
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footnote.default, {
    icon: _faCalendarAlt.faCalendarAlt,
    text: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "courseExit.upgradeFootnote",
      defaultMessage: "Access to this course and its materials are available on your dashboard until {expirationDate}. To extend access, {upgradeLink}.",
      values: {
        expirationDate,
        upgradeLink
      },
      description: "Message body to tell learner until when the materiel will be available, and to suggest to upgrade"
    })
  });
};
UpgradeFootnote.propTypes = {
  deadline: _propTypes.default.instanceOf(Date).isRequired,
  href: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(UpgradeFootnote);
exports.default = _default;
//# sourceMappingURL=UpgradeFootnote.js.map