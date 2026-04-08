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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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