"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCourseOutlineSidebar = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _modelStore = require("@src/generic/model-store");
var _SidebarContext = _interopRequireDefault(require("@src/courseware/course/sidebar/SidebarContext"));
var _selectors = require("@src/courseware/data/selectors");
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/prefer-default-export
const useCourseOutlineSidebar = () => {
  const isCollapsedOutlineSidebar = window.sessionStorage.getItem('hideCourseOutlineSidebar');
  const {
    enableNavigationSidebar: isEnabledSidebar
  } = (0, _reactRedux.useSelector)(_selectors.getCoursewareOutlineSidebarSettings);
  const {
    unitId,
    courseId,
    initialSidebar,
    currentSidebar,
    toggleSidebar,
    shouldDisplayFullScreen
  } = (0, _react.useContext)(_SidebarContext.default);
  const isOpenSidebar = !initialSidebar && isEnabledSidebar && !isCollapsedOutlineSidebar;
  const [isOpen, setIsOpen] = (0, _react.useState)(true);
  const course = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    entranceExamEnabled,
    entranceExamPassed
  } = course.entranceExamData || {};
  const isActiveEntranceExam = entranceExamEnabled && !entranceExamPassed;
  const handleToggleCollapse = () => {
    if (currentSidebar === _constants.ID) {
      toggleSidebar(null);
      window.sessionStorage.setItem('hideCourseOutlineSidebar', 'true');
    } else {
      toggleSidebar(_constants.ID);
      window.sessionStorage.removeItem('hideCourseOutlineSidebar');
    }
  };
  (0, _react.useEffect)(() => {
    if (isOpenSidebar && currentSidebar !== _constants.ID) {
      toggleSidebar(_constants.ID);
    }
  }, [initialSidebar, unitId]);
  return {
    courseId,
    unitId,
    currentSidebar,
    shouldDisplayFullScreen,
    isEnabledSidebar,
    isOpen,
    setIsOpen,
    handleToggleCollapse,
    isActiveEntranceExam
  };
};
exports.useCourseOutlineSidebar = useCourseOutlineSidebar;
//# sourceMappingURL=hooks.js.map