"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _hooks = require("@src/generic/hooks");
var _messages = _interopRequireDefault(require("../../messages"));
var _SidebarContext = _interopRequireDefault(require("../SidebarContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SidebarBase = ({
  title,
  ariaLabel,
  sidebarId,
  className,
  children,
  showTitleBar,
  width
}) => {
  const intl = (0, _i18n.useIntl)();
  const {
    toggleSidebar,
    shouldDisplayFullScreen,
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  const receiveMessage = (0, _react.useCallback)(({
    data
  }) => {
    const {
      type
    } = data;
    if (type === 'learning.events.sidebar.close') {
      toggleSidebar(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarId, toggleSidebar]);
  (0, _hooks.useEventListener)('message', receiveMessage);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: (0, _classnames.default)('ml-0 border border-light-400 rounded-sm h-auto align-top zindex-0', {
      'bg-white m-0 border-0 fixed-top vh-100 rounded-0': shouldDisplayFullScreen,
      'align-self-start': !shouldDisplayFullScreen,
      'd-none': currentSidebar !== sidebarId
    }, className),
    "data-testid": `sidebar-${sidebarId}`,
    style: {
      width: shouldDisplayFullScreen ? '100%' : width
    },
    "aria-label": ariaLabel,
    id: "course-sidebar",
    children: [shouldDisplayFullScreen ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "pt-2 pb-2.5 border-bottom border-light-400 d-flex align-items-center ml-2",
      onClick: () => toggleSidebar(null),
      onKeyDown: () => toggleSidebar(null),
      role: "button",
      tabIndex: "0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.ArrowBackIos
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "font-weight-bold m-2 d-inline-block",
        children: intl.formatMessage(_messages.default.responsiveCloseNotificationTray)
      })]
    }) : null, showTitleBar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex align-items-center mb-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          className: "p-2.5 d-inline-block course-sidebar-title",
          children: title
        }), shouldDisplayFullScreen ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-inline-flex mr-2 ml-auto",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
            src: _icons.Close,
            size: "sm",
            iconAs: _paragon.Icon,
            onClick: () => toggleSidebar(null),
            variant: "primary",
            alt: intl.formatMessage(_messages.default.closeNotificationTrigger)
          })
        })]
      })
    }), children]
  });
};
SidebarBase.propTypes = {
  title: _propTypes.default.string.isRequired,
  ariaLabel: _propTypes.default.string.isRequired,
  sidebarId: _propTypes.default.string.isRequired,
  className: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired,
  showTitleBar: _propTypes.default.bool,
  width: _propTypes.default.string
};
SidebarBase.defaultProps = {
  width: '31rem',
  showTitleBar: true
};
var _default = exports.default = SidebarBase;
//# sourceMappingURL=SidebarBase.js.map