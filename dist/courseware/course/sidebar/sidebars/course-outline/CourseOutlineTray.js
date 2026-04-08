"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _constants = require("@src/constants");
var _PageLoading = _interopRequireDefault(require("@src/generic/PageLoading"));
var _SidebarSection = _interopRequireDefault(require("./components/SidebarSection"));
var _SidebarSequence = _interopRequireDefault(require("./components/SidebarSequence"));
var _constants2 = require("./constants");
var _hooks = require("./hooks");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseOutlineTray = () => {
  const intl = (0, _i18n.useIntl)();
  const [selectedSection, setSelectedSection] = (0, _react.useState)(null);
  const [isDisplaySequenceLevel, setDisplaySequenceLevel, setDisplaySectionLevel] = (0, _paragon.useToggle)(true);
  const {
    courseId,
    unitId,
    currentSidebar,
    handleToggleCollapse,
    isActiveEntranceExam,
    shouldDisplayFullScreen,
    courseOutlineStatus,
    activeSequenceId,
    sections,
    sequences
  } = (0, _hooks.useCourseOutlineSidebar)();
  const resolvedSectionId = selectedSection || Object.keys(sections).find(sectionId => sections[sectionId].sequenceIds.includes(activeSequenceId));
  const sectionsIds = Object.keys(sections);
  const sequenceIds = sections[resolvedSectionId]?.sequenceIds || [];
  const backButtonTitle = sections[resolvedSectionId]?.title;
  const handleBackToSectionLevel = () => {
    setDisplaySectionLevel();
    setSelectedSection(null);
  };
  const handleSelectSection = id => {
    setDisplaySequenceLevel();
    setSelectedSection(id);
  };
  const sidebarHeading = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "outline-sidebar-heading-wrapper sticky d-flex justify-content-between align-self-start align-items-center bg-light-200 p-2.5 pl-4",
    children: [isDisplaySequenceLevel && backButtonTitle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      iconBefore: _icons.ChevronLeft,
      className: "outline-sidebar-heading p-0 mb-0 text-left text-dark-500",
      onClick: handleBackToSectionLevel,
      children: backButtonTitle
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "outline-sidebar-heading mb-0 h4 text-dark-500",
      children: intl.formatMessage(_messages.default.courseOutlineTitle)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      alt: intl.formatMessage(_messages.default.toggleCourseOutlineTrigger),
      className: "outline-sidebar-toggle-btn flex-shrink-0 text-dark bg-light-200",
      iconAs: _icons.MenuOpen,
      onClick: handleToggleCollapse
    })]
  });
  if (isActiveEntranceExam || currentSidebar !== _constants2.ID) {
    return null;
  }
  if (courseOutlineStatus === _constants.LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)('outline-sidebar-wrapper', {
        'flex-shrink-0 mr-4 h-auto': !shouldDisplayFullScreen,
        'bg-white m-0 fixed-top w-100 vh-100': shouldDisplayFullScreen
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        className: "outline-sidebar w-100",
        children: [sidebarHeading, /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
          srMessage: intl.formatMessage(_messages.default.loading)
        })]
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)('outline-sidebar-wrapper', {
      'flex-shrink-0 mr-4 h-auto': !shouldDisplayFullScreen,
      'bg-white m-0 fixed-top w-100 vh-100': shouldDisplayFullScreen
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      className: "outline-sidebar w-100",
      children: [sidebarHeading, /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
        id: "outline-sidebar-outline",
        className: "list-unstyled",
        children: isDisplaySequenceLevel ? sequenceIds.map(sequenceId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarSequence.default, {
          courseId: courseId,
          sequence: sequences[sequenceId],
          defaultOpen: sequenceId === activeSequenceId,
          activeUnitId: unitId
        }, sequenceId)) : sectionsIds.map(sectionId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarSection.default, {
          courseId: courseId,
          section: sections[sectionId],
          handleSelectSection: handleSelectSection
        }, sectionId))
      })]
    })
  });
};
CourseOutlineTray.ID = _constants2.ID;
var _default = exports.default = CourseOutlineTray;
//# sourceMappingURL=CourseOutlineTray.js.map