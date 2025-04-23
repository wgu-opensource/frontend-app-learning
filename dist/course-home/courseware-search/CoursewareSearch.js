"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _slice = require("../data/slice");
var _hooks = require("./hooks");
var _messages = _interopRequireDefault(require("./messages"));
var _CoursewareSearchForm = _interopRequireDefault(require("./CoursewareSearchForm"));
var _CoursewareResultsFilter = _interopRequireDefault(require("./CoursewareResultsFilter"));
var _modelStore = require("../../generic/model-store");
var _thunks = require("../data/thunks");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["intl"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const CoursewareSearch = _ref => {
  let {
      intl
    } = _ref,
    sectionProps = _objectWithoutProperties(_ref, _excluded);
  const {
    courseId
  } = (0, _reactRouter.useParams)();
  const {
    query: searchKeyword,
    setQuery,
    clearSearchParams
  } = (0, _hooks.useCoursewareSearchParams)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    loading,
    searchKeyword: lastSearchKeyword,
    errors,
    total
  } = (0, _modelStore.useModel)('contentSearchResults', courseId);
  (0, _hooks.useLockScroll)();
  const info = (0, _hooks.useElementBoundingBox)('courseTabsNavigation');
  const top = info ? `${Math.floor(info.top)}px` : 0;
  const clearSearch = () => {
    clearSearchParams();
    dispatch((0, _modelStore.updateModel)({
      modelType: 'contentSearchResults',
      model: {
        id: courseId,
        searchKeyword: '',
        results: [],
        errors: undefined,
        loading: false
      }
    }));
  };
  const handleSubmit = value => {
    if (!value) {
      clearSearch();
      return;
    }
    (0, _analytics.sendTrackingLogEvent)('edx.course.home.courseware_search.submit', {
      org_key: org,
      courserun_key: courseId,
      event_type: 'searchKeyword',
      keyword: value
    });
    dispatch((0, _thunks.searchCourseContent)(courseId, value));
    setQuery(value);
  };
  (0, _react.useEffect)(() => {
    handleSubmit(searchKeyword);
  }, []);
  const handleOnChange = value => {
    if (value === searchKeyword) {
      return;
    }
    if (!value) {
      clearSearch();
    }
  };
  const handleSearchCloseClick = () => {
    clearSearch();
    dispatch((0, _slice.setShowSearch)(false));
  };
  let status = 'idle';
  if (loading) {
    status = 'loading';
  } else if (errors) {
    status = 'error';
  } else if (lastSearchKeyword) {
    status = 'results';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", _objectSpread(_objectSpread({
    className: "courseware-search",
    style: {
      '--modal-top-position': top
    },
    "data-testid": "courseware-search-section"
  }, sectionProps), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "courseware-search__close",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "tertiary",
        className: "p-1",
        "aria-label": intl.formatMessage(_messages.default.searchCloseAction),
        onClick: handleSearchCloseClick,
        "data-testid": "courseware-search-close-button",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          src: _icons.Close
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "courseware-search__outer-content",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "courseware-search__content",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
          className: "h2",
          children: intl.formatMessage(_messages.default.searchModuleTitle)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchForm.default, {
          searchTerm: searchKeyword,
          onSubmit: handleSubmit,
          onChange: handleOnChange,
          placeholder: intl.formatMessage(_messages.default.searchBarPlaceholderText)
        }), status === 'loading' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "courseware-search__spinner",
          "data-testid": "courseware-search-spinner",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
            animation: "border",
            variant: "light",
            screenReaderText: intl.formatMessage(_messages.default.loading)
          })
        }) : null, status === 'error' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
          className: "mt-4",
          variant: "danger",
          "data-testid": "courseware-search-error",
          children: intl.formatMessage(_messages.default.searchResultsError)
        }), status === 'results' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [total > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "courseware-search__results-summary",
            "aria-live": "polite",
            "aria-relevant": "all",
            "aria-atomic": "true",
            "data-testid": "courseware-search-summary",
            children: intl.formatMessage(_messages.default.searchResultsLabel, {
              total,
              keyword: lastSearchKeyword
            })
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareResultsFilter.default, {})]
        }) : null]
      })
    })]
  }));
};
CoursewareSearch.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CoursewareSearch);
//# sourceMappingURL=CoursewareSearch.js.map