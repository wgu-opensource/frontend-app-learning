"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _frontendPlatform = require("@edx/frontend-platform");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _api = require("./api");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesProvider = _ref => {
  let {
    children
  } = _ref;
  const [isRedirected, setIsRedirected] = (0, _react.useState)();
  (0, _react.useEffect)(async () => {
    if ((0, _frontendPlatform.getConfig)().ENABLE_NOTICES) {
      const data = await (0, _api.getNotices)();

      if (data && data.results && data.results.length > 0) {
        const {
          results
        } = data;
        setIsRedirected(true);
        window.location.replace(`${results[0]}?next=${window.location.href}`);
      }
    }
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: isRedirected === true ? null : children
  });
};

NoticesProvider.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = NoticesProvider;
exports.default = _default;
//# sourceMappingURL=NoticesProvider.js.map