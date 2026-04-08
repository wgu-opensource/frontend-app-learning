"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _paragon = require("@openedx/paragon");
var _hooks = require("../../../../data/hooks");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CourseGradeHeader = () => {
  const intl = (0, _i18n.useIntl)();
  const courseId = (0, _hooks.useContextId)();
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    verifiedMode,
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const eventProperties = {
    org_key: org,
    courserun_key: courseId
  };
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const logUpgradeButtonClick = () => {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_progress.grades_upgrade.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator
    });
    (0, _analytics.sendTrackEvent)('edx.bi.ecommerce.upsell_links_clicked', _objectSpread(_objectSpread({}, eventProperties), {}, {
      linkCategory: '(none)',
      linkName: 'progress_locked',
      linkType: 'button',
      pageName: 'progress'
    }));
  };
  let previewText;
  if (verifiedMode) {
    previewText = gradesFeatureIsFullyLocked ? intl.formatMessage(_messages.default.courseGradePreviewUnlockCertificateBody) : intl.formatMessage(_messages.default.courseGradePartialPreviewUnlockCertificateBody);
  } else {
    previewText = intl.formatMessage(_messages.default.courseGradePreviewUpgradeDeadlinePassedBody);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "grade-course-header",
    className: "row w-100 m-0 p-4 rounded-top bg-primary-500 text-white",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `col-12 ${verifiedMode ? 'col-md-9' : ''} p-0`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row w-100 m-0 p-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-1 p-0",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.Locked
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "col-11 px-2 p-sm-0 h4 text-white",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            "aria-hidden": "true",
            children: intl.formatMessage(_messages.default.courseGradePreviewHeaderAriaHidden)
          }), gradesFeatureIsFullyLocked ? intl.formatMessage(_messages.default.courseGradePreviewHeaderLocked) : intl.formatMessage(_messages.default.courseGradePreviewHeaderLimited)]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "row w-100 m-0 p-0 justify-content-end",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col-11 px-2 p-sm-0 small",
          children: previewText
        })
      })]
    }), verifiedMode && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-12 col-md-3 mt-3 mt-md-0 p-0 align-self-center text-right",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        id: "upgrade-button",
        variant: "brand",
        size: "sm",
        href: verifiedMode.upgradeUrl,
        onClick: logUpgradeButtonClick,
        children: intl.formatMessage(_messages.default.courseGradePreviewUpgradeButton)
      })
    })]
  });
};
var _default = exports.default = CourseGradeHeader;
//# sourceMappingURL=CourseGradeHeader.js.map