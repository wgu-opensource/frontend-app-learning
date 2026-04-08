"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _frontendPlatform = require("@edx/frontend-platform");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _api = require("./api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesProvider = ({
  children
}) => {
  const [isRedirected, setIsRedirected] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    async function getData() {
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
    }
    getData();
  }, []);
  return isRedirected === true ? null : children;
};
NoticesProvider.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = exports.default = NoticesProvider;
//# sourceMappingURL=NoticesProvider.js.map