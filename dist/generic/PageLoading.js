"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class PageLoading extends _react.Component {
  renderSrMessage() {
    if (!this.props.srMessage) {
      return null;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "sr-only",
      children: this.props.srMessage
    });
  }
  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "d-flex justify-content-center align-items-center flex-column",
        style: {
          height: '50vh'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
          animation: "border",
          variant: "primary",
          screenReaderText: this.renderSrMessage()
        })
      })
    });
  }
}
exports.default = PageLoading;
PageLoading.propTypes = {
  srMessage: _propTypes.default.node.isRequired
};
//# sourceMappingURL=PageLoading.js.map