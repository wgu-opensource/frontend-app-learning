"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("../../../../generic/hooks");
var _constants = require("../../../../constants");
var _messages = _interopRequireDefault(require("../messages"));
var _SidebarContext = _interopRequireDefault(require("../SidebarContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SidebarBase = _ref => {
  let {
    title,
    ariaLabel,
    sidebarId,
    className,
    children,
    showTitleBar,
    width,
    allowFullHeight,
    showBorder
  } = _ref;
  const intl = (0, _i18n.useIntl)();
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
      toggleSidebar(currentSidebar, _constants.WIDGETS.DISCUSSIONS);
    }
  }, [toggleSidebar]);
  (0, _hooks.useEventListener)('message', receiveMessage);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: (0, _classnames.default)('ml-0 ml-lg-4 h-auto align-top zindex-0', {
      'min-vh-100': !shouldDisplayFullScreen && allowFullHeight,
      'bg-white m-0 border-0 fixed-top vh-100 rounded-0': shouldDisplayFullScreen,
      'd-none': currentSidebar !== sidebarId,
      'border border-light-400 rounded-sm': showBorder
    }, className),
    "data-testid": `sidebar-${sidebarId}`,
    style: {
      width: shouldDisplayFullScreen ? '100%' : width
    },
    "aria-label": ariaLabel,
    children: [shouldDisplayFullScreen && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "pt-2 pb-2.5 border-bottom border-light-400 d-flex align-items-center ml-2",
      onClick: () => toggleSidebar(null),
      onKeyDown: () => toggleSidebar(null),
      role: "button",
      tabIndex: "0",
      alt: intl.formatMessage(_messages.default.responsiveCloseSidebarTray),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.ArrowBackIos
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "font-weight-bold m-2 d-inline-block",
        children: intl.formatMessage(_messages.default.responsiveCloseSidebarTray)
      })]
    }), showTitleBar && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "p-2.5 d-inline-block",
          children: title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-inline-flex mr-2 mt-1.5 ml-auto",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
            src: _icons.Close,
            size: "sm",
            iconAs: _paragon.Icon,
            onClick: () => toggleSidebar(sidebarId),
            alt: intl.formatMessage(_messages.default.closeTrigger),
            className: "icon-hover"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "py-1 bg-gray-100 border-top border-bottom border-light-400"
      })]
    }), children]
  });
};
SidebarBase.propTypes = {
  title: _propTypes.default.string,
  ariaLabel: _propTypes.default.string.isRequired,
  sidebarId: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  children: _propTypes.default.element.isRequired,
  showTitleBar: _propTypes.default.bool,
  width: _propTypes.default.string,
  allowFullHeight: _propTypes.default.bool,
  showBorder: _propTypes.default.bool
};
SidebarBase.defaultProps = {
  title: '',
  width: '50rem',
  allowFullHeight: false,
  showTitleBar: true,
  className: '',
  showBorder: true
};
var _default = exports.default = SidebarBase;
//# sourceMappingURL=SidebarBase.js.map