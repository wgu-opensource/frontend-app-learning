"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faHome = require("@fortawesome/free-solid-svg-icons/faHome");
var _modelStore = require("../../../generic/model-store");
var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CourseBreadcrumbs = ({
  courseId,
  sectionId,
  sequenceId,
  unitId,
  isStaff
}) => {
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const courseStatus = (0, _reactRedux.useSelector)(state => state.courseware.courseStatus);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const allSequencesInSections = Object.fromEntries((0, _modelStore.useModels)('sections', course.sectionIds)?.map(section => [section.id, {
    default: section.id === sectionId,
    title: section.title,
    sequences: (0, _modelStore.useModels)('sequences', section.sequenceIds)
  }]));
  const links = (0, _react.useMemo)(() => {
    const chapters = [];
    const sequentials = [];
    if (courseStatus === 'loaded' && sequenceStatus === 'loaded') {
      Object.entries(allSequencesInSections).forEach(([id, section]) => {
        chapters.push({
          id,
          label: section.title,
          default: section.default,
          sequences: section.sequences
        });
        if (section.default) {
          section.sequences.forEach(sequence => {
            sequentials.push({
              id: sequence.id,
              label: sequence.title,
              default: sequence.id === sequenceId,
              sequences: [sequence]
            });
          });
        }
      });
    }
    return [chapters, sequentials];
  }, [courseStatus, sequenceStatus, allSequencesInSections]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("nav", {
    "aria-label": "breadcrumb",
    className: "d-inline-block col-sm-10 mb-3",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ol", {
      className: "list-unstyled d-flex flex-nowrap align-items-center m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        className: "list-unstyled col-auto m-0 p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
          className: "flex-shrink-0 text-primary",
          to: `/course/${courseId}/home`,
          replace: true,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _faHome.faHome,
            className: "mr-2"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learn.breadcrumb.navigation.course.home",
            description: "The course home link in breadcrumbs nav",
            defaultMessage: "Course"
          })]
        })
      }), links.map((content, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BreadcrumbItem.default
      // eslint-disable-next-line react/no-array-index-key
      , {
        courseId: courseId,
        sequenceId: sequenceId,
        content: content,
        unitId: unitId,
        withSeparator: true,
        separator: "/",
        isStaff: isStaff
      }, i))]
    })
  });
};
CourseBreadcrumbs.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  sectionId: _propTypes.default.string,
  sequenceId: _propTypes.default.string,
  unitId: _propTypes.default.string,
  isStaff: _propTypes.default.bool
};
CourseBreadcrumbs.defaultProps = {
  sectionId: null,
  sequenceId: null,
  unitId: null,
  isStaff: null
};
var _default = exports.default = CourseBreadcrumbs;
//# sourceMappingURL=CourseBreadcrumbs.js.map