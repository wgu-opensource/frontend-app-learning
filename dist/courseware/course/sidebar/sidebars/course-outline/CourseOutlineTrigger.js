"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("./hooks");
var _constants = require("./constants");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CourseOutlineTrigger = ({
  isMobileView
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    currentSidebar,
    shouldDisplayFullScreen,
    handleToggleCollapse,
    isActiveEntranceExam
  } = (0, _hooks.useCourseOutlineSidebar)();
  const isDisplayForDesktopView = !isMobileView && !shouldDisplayFullScreen && currentSidebar !== _constants.ID;
  const isDisplayForMobileView = isMobileView && shouldDisplayFullScreen;
  if (!isDisplayForDesktopView && !isDisplayForMobileView || isActiveEntranceExam) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)('outline-sidebar-heading-wrapper bg-light-200 collapsed align-self-start', {
      'flex-shrink-0 mr-4 p-2.5': isDisplayForDesktopView,
      'p-0': isDisplayForMobileView
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      alt: intl.formatMessage(_messages.default.toggleCourseOutlineTrigger),
      className: "outline-sidebar-toggle-btn flex-shrink-0 text-dark bg-light-200 rounded-0",
      iconAs: _icons.MenuOpen,
      onClick: handleToggleCollapse
    })
  });
};
CourseOutlineTrigger.defaultProps = {
  isMobileView: false
};
CourseOutlineTrigger.propTypes = {
  isMobileView: _propTypes.default.bool
};
var _default = exports.default = CourseOutlineTrigger;
//# sourceMappingURL=CourseOutlineTrigger.js.map