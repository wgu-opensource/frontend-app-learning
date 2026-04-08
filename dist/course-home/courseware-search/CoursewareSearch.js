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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
const CoursewareSearch = _ref => {
  let sectionProps = Object.assign({}, (_objectDestructuringEmpty(_ref), _ref));
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
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
  const dialogRef = (0, _react.useRef)();
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
  const handleOnChange = value => {
    if (value === searchKeyword) {
      return;
    }
    if (!value) {
      clearSearch();
    }
  };
  const close = () => {
    clearSearch();
    dispatch((0, _slice.setShowSearch)(false));
  };
  const handlePopState = () => close();
  const handleBackdropClick = function (event) {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };
  (0, _react.useEffect)(() => {
    // We need this to keep the dialog reference when unmounting.
    const dialog = dialogRef.current;

    // Open the dialog as a modal on render to confine focus within it.
    dialogRef.current.showModal();
    if (searchKeyword) {
      handleSubmit(searchKeyword); // In case it's opened with a search link, we run the search.
    }
    const controller = new AbortController();
    const {
      signal
    } = controller;
    window.addEventListener('popstate', handlePopState, {
      signal
    });
    dialog.addEventListener('click', handleBackdropClick, {
      signal
    });
    return () => controller.abort(); // Removes event listeners.
  }, []);
  const handleSearchClose = () => close();
  let status = 'idle';
  if (loading) {
    status = 'loading';
  } else if (errors) {
    status = 'error';
  } else if (lastSearchKeyword) {
    status = 'results';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("dialog", _objectSpread(_objectSpread({
    ref: dialogRef,
    className: "courseware-search",
    style: {
      '--modal-top-position': top
    },
    "data-testid": "courseware-search-dialog",
    onClose: handleSearchClose
  }, sectionProps), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "courseware-search__outer-content",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "courseware-search__content",
        "data-testid": "courseware-search-content",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "courseware-search__form",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
            className: "h2",
            children: formatMessage(_messages.default.searchModuleTitle)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareSearchForm.default, {
            searchTerm: searchKeyword,
            onSubmit: handleSubmit,
            onChange: handleOnChange,
            placeholder: formatMessage(_messages.default.searchBarPlaceholderText)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "courseware-search__close",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
              variant: "tertiary",
              className: "p-1",
              "aria-label": formatMessage(_messages.default.searchCloseAction),
              onClick: () => dialogRef.current.close(),
              "data-testid": "courseware-search-close-button",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
                src: _icons.Close
              })
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "courseware-search__results",
          "aria-live": "polite",
          "data-testid": "courseware-search-results",
          children: [status === 'loading' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "courseware-search__spinner",
            "data-testid": "courseware-search-spinner",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
              animation: "border",
              variant: "light",
              screenReaderText: formatMessage(_messages.default.loading)
            })
          }) : null, status === 'error' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
            className: "mt-4",
            variant: "danger",
            "data-testid": "courseware-search-error",
            children: formatMessage(_messages.default.searchResultsError)
          }), status === 'results' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [total > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "courseware-search__results-summary",
              "aria-relevant": "all",
              "aria-atomic": "true",
              "data-testid": "courseware-search-summary",
              children: formatMessage(_messages.default.searchResultsLabel, {
                total,
                keyword: lastSearchKeyword
              })
            }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoursewareResultsFilter.default, {})]
          }) : null]
        })]
      })
    })
  }));
};
var _default = exports.default = CoursewareSearch;
//# sourceMappingURL=CoursewareSearch.js.map