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
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const CourseGradeHeader = _ref => {
  let {
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
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
        variant: "brand",
        size: "sm",
        href: verifiedMode.upgradeUrl,
        onClick: logUpgradeButtonClick,
        children: intl.formatMessage(_messages.default.courseGradePreviewUpgradeButton)
      })
    })]
  });
};
CourseGradeHeader.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseGradeHeader);
exports.default = _default;
//# sourceMappingURL=CourseGradeHeader.js.map