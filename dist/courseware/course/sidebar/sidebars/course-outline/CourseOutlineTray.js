"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _reactRedux = require("react-redux");
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@openedx/paragon/icons");
var _modelStore = require("@src/generic/model-store");
var _slice = require("@src/course-home/data/slice");
var _PageLoading = _interopRequireDefault(require("@src/generic/PageLoading"));
var _selectors = require("../../../../data/selectors");
var _thunks = require("../../../../data/thunks");
var _SidebarSection = _interopRequireDefault(require("./components/SidebarSection"));
var _SidebarSequence = _interopRequireDefault(require("./components/SidebarSequence"));
var _constants = require("./constants");
var _hooks = require("./hooks");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CourseOutlineTray = _ref => {
  let {
    intl
  } = _ref;
  const [selectedSection, setSelectedSection] = (0, _react.useState)(null);
  const [isDisplaySequenceLevel, setDisplaySequenceLevel, setDisplaySectionLevel] = (0, _paragon.useToggle)(true);
  const dispatch = (0, _reactRedux.useDispatch)();
  const activeSequenceId = (0, _reactRedux.useSelector)(_selectors.getSequenceId);
  const {
    sections = {},
    sequences = {}
  } = (0, _reactRedux.useSelector)(_selectors.getCourseOutline);
  const courseOutlineStatus = (0, _reactRedux.useSelector)(_selectors.getCourseOutlineStatus);
  const courseOutlineShouldUpdate = (0, _reactRedux.useSelector)(_selectors.getCourseOutlineShouldUpdate);
  const {
    courseId,
    unitId,
    isEnabledSidebar,
    currentSidebar,
    handleToggleCollapse,
    isActiveEntranceExam,
    shouldDisplayFullScreen
  } = (0, _hooks.useCourseOutlineSidebar)();
  const {
    sectionId: activeSectionId
  } = (0, _modelStore.useModel)('sequences', activeSequenceId);
  const sectionsIds = Object.keys(sections);
  const sequenceIds = sections[selectedSection || activeSectionId]?.sequenceIds || [];
  const backButtonTitle = sections[selectedSection || activeSectionId]?.title;
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
  (0, _react.useEffect)(() => {
    if (isEnabledSidebar && courseOutlineStatus !== _slice.LOADED || courseOutlineShouldUpdate) {
      dispatch((0, _thunks.getCourseOutlineStructure)(courseId));
    }
  }, [courseId, isEnabledSidebar, courseOutlineShouldUpdate]);
  if (!isEnabledSidebar || isActiveEntranceExam || currentSidebar !== _constants.ID) {
    return null;
  }
  if (courseOutlineStatus === _slice.LOADING) {
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
CourseOutlineTray.propTypes = {
  intl: _i18n.intlShape.isRequired
};
CourseOutlineTray.ID = _constants.ID;
var _default = exports.default = (0, _i18n.injectIntl)(CourseOutlineTray);
//# sourceMappingURL=CourseOutlineTray.js.map