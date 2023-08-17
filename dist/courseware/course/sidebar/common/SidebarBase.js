"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _icons = require("@edx/paragon/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../../../generic/hooks");

var _messages = _interopRequireDefault(require("../../messages"));

var _SidebarContext = _interopRequireDefault(require("../SidebarContext"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SidebarBase(_ref) {
  let {
    intl,
    title,
    ariaLabel,
    sidebarId,
    className,
    children,
    showTitleBar,
    width
  } = _ref;
  const {
    toggleSidebar,
    shouldDisplayFullScreen,
    currentSidebar
  } = (0, _react.useContext)(_SidebarContext.default);
  const receiveMessage = (0, _react.useCallback)(_ref2 => {
    let {
      data
    } = _ref2;
    const {
      type
    } = data;

    if (type === 'learning.events.sidebar.close') {
      toggleSidebar(null);
    }
  }, [sidebarId, toggleSidebar]);
  (0, _hooks.useEventListener)('message', receiveMessage);
  return currentSidebar === sidebarId && /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: (0, _classnames.default)('ml-0 ml-lg-4 border border-light-400 rounded-sm h-auto align-top', {
      'bg-white m-0 border-0 fixed-top vh-100 rounded-0': shouldDisplayFullScreen
    }, className),
    style: {
      width: shouldDisplayFullScreen ? '100%' : width
    },
    "aria-label": ariaLabel,
    children: [shouldDisplayFullScreen ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "pt-2 pb-2.5 border-bottom border-light-400 d-flex align-items-center ml-2",
      onClick: () => toggleSidebar(null),
      onKeyDown: () => toggleSidebar(null),
      role: "button",
      tabIndex: "0",
      alt: intl.formatMessage(_messages.default.responsiveCloseNotificationTray),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.ArrowBackIos
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "font-weight-bold m-2 d-inline-block",
        children: intl.formatMessage(_messages.default.responsiveCloseNotificationTray)
      })]
    }) : null, showTitleBar && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "p-2.5 d-inline-block",
          children: title
        }), shouldDisplayFullScreen ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-inline-flex mr-2 mt-1.5 ml-auto",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
            src: _icons.Close,
            size: "sm",
            iconAs: _paragon.Icon,
            onClick: () => toggleSidebar(null),
            variant: "primary",
            alt: intl.formatMessage(_messages.default.closeNotificationTrigger)
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "py-1 bg-gray-100 border-top border-bottom border-light-400"
      })]
    }), children]
  });
}

SidebarBase.propTypes = {
  intl: _i18n.intlShape.isRequired,
  title: _propTypes.default.string.isRequired,
  ariaLabel: _propTypes.default.string.isRequired,
  sidebarId: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  children: _propTypes.default.element.isRequired,
  showTitleBar: _propTypes.default.bool,
  width: _propTypes.default.string
};
SidebarBase.defaultProps = {
  width: '31rem',
  showTitleBar: true,
  className: ''
};

var _default = (0, _i18n.injectIntl)(SidebarBase);

exports.default = _default;
//# sourceMappingURL=SidebarBase.js.map