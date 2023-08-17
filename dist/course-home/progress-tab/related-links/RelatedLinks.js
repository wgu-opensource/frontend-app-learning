"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _messages = _interopRequireDefault(require("./messages"));

var _modelStore = require("../../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RelatedLinks(_ref) {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    org,
    tabs
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();

  const logLinkClicked = linkName => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.related_links.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      link_clicked: linkName
    });
  };

  const overviewTab = tabs.find(tab => tab.slug === 'outline');
  const overviewTabUrl = overviewTab && overviewTab.url;
  const datesTab = tabs.find(tab => tab.slug === 'dates');
  const datesTabUrl = datesTab && datesTab.url;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "mb-4 x-small",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h4",
      children: intl.formatMessage(_messages.default.relatedLinks)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
      className: "pl-4",
      children: [datesTabUrl && /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
          destination: datesTabUrl,
          onClick: () => logLinkClicked('dates'),
          children: intl.formatMessage(_messages.default.datesCardLink)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: intl.formatMessage(_messages.default.datesCardDescription)
        })]
      }), overviewTabUrl && /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
          destination: overviewTabUrl,
          onClick: () => logLinkClicked('course_outline'),
          children: intl.formatMessage(_messages.default.outlineCardLink)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: intl.formatMessage(_messages.default.outlineCardDescription)
        })]
      })]
    })]
  });
}

RelatedLinks.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(RelatedLinks);

exports.default = _default;
//# sourceMappingURL=RelatedLinks.js.map