"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _hooks = require("../../generic/hooks");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function DiscussionTab() {
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    path
  } = (0, _reactRouterDom.useParams)();
  const [originalPath] = (0, _react.useState)(path);
  const history = (0, _reactRouter.useHistory)();
  const [, iFrameHeight] = (0, _hooks.useIFrameHeight)();
  (0, _hooks.useIFramePluginEvents)({
    'discussions.navigate': payload => {
      const basePath = (0, _reactRouter.generatePath)('/course/:courseId/discussion', {
        courseId
      });
      history.push(`${basePath}/${payload.path}`);
    }
  });
  const discussionsUrl = `${(0, _frontendPlatform.getConfig)().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
    src: discussionsUrl,
    className: "d-flex w-100 border-0",
    height: iFrameHeight,
    style: {
      minHeight: '60rem'
    },
    title: "discussion"
  });
}

DiscussionTab.propTypes = {};

var _default = (0, _i18n.injectIntl)(DiscussionTab);

exports.default = _default;
//# sourceMappingURL=DiscussionTab.js.map