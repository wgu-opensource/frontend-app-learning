"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faHome = require("@fortawesome/free-solid-svg-icons/faHome");
var _reactRedux = require("react-redux");
var _paragon = require("@edx/paragon");
var _reactRouterDom = require("react-router-dom");
var _modelStore = require("../../generic/model-store");
var _JumpNavMenuItem = _interopRequireDefault(require("./JumpNavMenuItem"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const CourseBreadcrumb = _ref => {
  let {
    content,
    withSeparator,
    courseId,
    sequenceId,
    unitId,
    isStaff
  } = _ref;
  const defaultContent = content.filter(destination => destination.default)[0] || {
    id: courseId,
    label: '',
    sequences: []
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [withSeparator && /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      className: "col-auto p-0 mx-2 text-primary-500 text-truncate text-nowrap",
      role: "presentation",
      "aria-hidden": true,
      children: "/"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      children: (0, _frontendPlatform.getConfig)().ENABLE_JUMPNAV !== 'true' || content.length < 2 || !isStaff ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
        className: "text-primary-500",
        to: defaultContent.sequences.length ? `/course/${courseId}/${defaultContent.sequences[0].id}` : `/course/${courseId}/${defaultContent.id}`,
        children: defaultContent.label
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.SelectMenu, {
        isLink: true,
        defaultMessage: defaultContent.label,
        children: content.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(_JumpNavMenuItem.default, {
          isDefault: item.default,
          sequences: item.sequences,
          courseId: courseId,
          title: item.label,
          currentSequence: sequenceId,
          currentUnit: unitId
        }))
      })
    })]
  });
};
CourseBreadcrumb.propTypes = {
  content: _propTypes.default.arrayOf(_propTypes.default.shape({
    default: _propTypes.default.bool,
    id: _propTypes.default.string,
    label: _propTypes.default.string
  })).isRequired,
  sequenceId: _propTypes.default.string,
  unitId: _propTypes.default.string,
  withSeparator: _propTypes.default.bool,
  courseId: _propTypes.default.string,
  isStaff: _propTypes.default.bool
};
CourseBreadcrumb.defaultProps = {
  withSeparator: false,
  sequenceId: null,
  unitId: null,
  courseId: null,
  isStaff: null
};
const CourseBreadcrumbs = _ref2 => {
  let {
    courseId,
    sectionId,
    sequenceId,
    unitId,
    isStaff
  } = _ref2;
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const courseStatus = (0, _reactRedux.useSelector)(state => state.courseware.courseStatus);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus);
  const allSequencesInSections = Object.fromEntries((0, _modelStore.useModels)('sections', course.sectionIds).map(section => [section.id, {
    default: section.id === sectionId,
    title: section.title,
    sequences: (0, _modelStore.useModels)('sequences', section.sequenceIds)
  }]));
  const links = (0, _react.useMemo)(() => {
    const chapters = [];
    const sequentials = [];
    if (courseStatus === 'loaded' && sequenceStatus === 'loaded') {
      Object.entries(allSequencesInSections).forEach(_ref3 => {
        let [id, section] = _ref3;
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
    className: "my-4 d-inline-block col-sm-10",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ol", {
      className: "list-unstyled d-flex  flex-nowrap align-items-center m-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        className: "list-unstyled col-auto m-0 p-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
          className: "flex-shrink-0 text-primary",
          to: `/course/${courseId}/home`,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
            icon: _faHome.faHome,
            className: "mr-2"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "learn.breadcrumb.navigation.course.home",
            description: "The course home link in breadcrumbs nav",
            defaultMessage: "Course"
          })]
        })
      }), links.map(content => /*#__PURE__*/(0, _jsxRuntime.jsx)(CourseBreadcrumb, {
        courseId: courseId,
        sequenceId: sequenceId,
        content: content,
        unitId: unitId,
        withSeparator: true,
        isStaff: isStaff
      }))]
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
var _default = CourseBreadcrumbs;
exports.default = _default;
//# sourceMappingURL=CourseBreadcrumbs.js.map