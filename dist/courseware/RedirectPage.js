"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _frontendPlatform = require("@edx/frontend-platform");
var _queryString = _interopRequireDefault(require("query-string"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RedirectPage = _ref => {
  let {
    pattern,
    mode
  } = _ref;
  const {
    courseId
  } = (0, _reactRouterDom.useParams)();
  const location = (0, _reactRouterDom.useLocation)();
  const {
    consentPath
  } = _queryString.default.parse(location?.search);
  const BASE_URL = (0, _frontendPlatform.getConfig)().LMS_BASE_URL;
  switch (mode) {
    case _constants.REDIRECT_MODES.DASHBOARD_REDIRECT:
      global.location.assign(`${BASE_URL}${pattern}${location?.search}`);
      break;
    case _constants.REDIRECT_MODES.CONSENT_REDIRECT:
      global.location.assign(`${BASE_URL}${consentPath}`);
      break;
    case _constants.REDIRECT_MODES.HOME_REDIRECT:
      global.location.assign((0, _reactRouterDom.generatePath)(pattern, {
        courseId
      }));
      break;
    default:
      global.location.assign(`${BASE_URL}${(0, _reactRouterDom.generatePath)(pattern, {
        courseId
      })}`);
  }
  return null;
};
RedirectPage.propTypes = {
  pattern: _propTypes.default.string,
  mode: _propTypes.default.string.isRequired
};
RedirectPage.defaultProps = {
  pattern: null
};
var _default = RedirectPage;
exports.default = _default;
//# sourceMappingURL=RedirectPage.js.map