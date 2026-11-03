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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TabContainer = props => {
  const {
    children,
    fetch,
    slice,
    tab,
    isProgressTab
  } = props;
  const {
    courseId: courseIdFromUrl,
    targetUserId
  } = (0, _reactRouterDom.useParams)();
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    // The courseId from the URL is the course we WANT to load.
    if (isProgressTab) {
      dispatch(fetch(courseIdFromUrl, targetUserId));
    } else {
      dispatch(fetch(courseIdFromUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseIdFromUrl, targetUserId]);

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
  tab: _propTypes.default.string.isRequired,
  isProgressTab: _propTypes.default.bool
};
TabContainer.defaultProps = {
  isProgressTab: false
};
var _default = exports.default = TabContainer;
//# sourceMappingURL=TabContainer.js.map