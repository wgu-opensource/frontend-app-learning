"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _frontendLibSpecialExams = require("@edx/frontend-lib-special-exams");
var _TabPage = _interopRequireDefault(require("./TabPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TabContainer = props => {
  const {
    children,
    fetch,
    slice,
    tab
  } = props;
  const {
    courseId: courseIdFromUrl
  } = (0, _reactRouterDom.useParams)();
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    // The courseId from the URL is the course we WANT to load.
    dispatch(fetch(courseIdFromUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseIdFromUrl]);

  // The courseId from the store is the course we HAVE loaded.  If the URL changes,
  // we don't want the application to adjust to it until it has actually loaded the new data.
  const {
    courseId,
    courseStatus
  } = (0, _reactRedux.useSelector)(state => state[slice]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPage.default, {
    activeTabSlug: tab,
    courseId: courseId,
    courseStatus: courseStatus,
    metadataModel: `${slice}Meta`,
    children: [courseId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_frontendLibSpecialExams.OuterExamTimer, {
      courseId: courseId
    }), children]
  });
};
TabContainer.propTypes = {
  children: _propTypes.default.node.isRequired,
  fetch: _propTypes.default.func.isRequired,
  slice: _propTypes.default.string.isRequired,
  tab: _propTypes.default.string.isRequired
};
var _default = TabContainer;
exports.default = _default;
//# sourceMappingURL=TabContainer.js.map