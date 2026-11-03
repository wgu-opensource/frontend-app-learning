"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCoursewareSearchFeatureFlag = useCoursewareSearchFeatureFlag;
exports.useCoursewareSearchParams = useCoursewareSearchParams;
exports.useCoursewareSearchState = useCoursewareSearchState;
exports.useElementBoundingBox = useElementBoundingBox;
exports.useLockScroll = useLockScroll;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _lodash = require("lodash");
var _thunks = require("../data/thunks");
const DEBOUNCE_WAIT = 100; // ms

function useCoursewareSearchFeatureFlag() {
  const {
    courseId
  } = (0, _reactRouterDom.useParams)();
  const [enabled, setEnabled] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    (0, _thunks.fetchCoursewareSearchSettings)(courseId).then(response => setEnabled(response.enabled));
  }, [courseId]);
  return enabled;
}
function useCoursewareSearchState() {
  const enabled = useCoursewareSearchFeatureFlag();
  const show = (0, _reactRedux.useSelector)(state => state.courseHome.showSearch);
  return {
    show: enabled && show
  };
}
function useElementBoundingBox(elementId) {
  const [info, setInfo] = (0, _react.useState)(undefined);
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`useElementBoundingBox(): Unable to find element with id='${elementId}' in the document.`); // eslint-disable-line no-console
    return undefined;
  }
  (0, _react.useLayoutEffect)(() => {
    // Handler to call on window resize and scroll
    function recalculate() {
      const bounds = element.getBoundingClientRect();
      setInfo(bounds);
    }
    const debouncedRecalculate = (0, _lodash.debounce)(recalculate, DEBOUNCE_WAIT, {
      leading: true
    });

    // Add event listener
    global.addEventListener('resize', debouncedRecalculate);
    global.addEventListener('scroll', debouncedRecalculate);

    // Call handler right away so state gets updated with initial window size
    debouncedRecalculate();

    // Remove event listener on cleanup
    return () => {
      global.removeEventListener('resize', debouncedRecalculate);
      global.removeEventListener('scroll', debouncedRecalculate);
    };
  }, []);
  return info;
}
function useLockScroll() {
  (0, _react.useLayoutEffect)(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('_search-no-scroll');
    return () => {
      document.body.classList.remove('_search-no-scroll');
    };
  }, []);
}
const initSearchParams = {
  q: '',
  f: ''
};
function useCoursewareSearchParams() {
  const [searchParams, setSearchParams] = (0, _reactRouterDom.useSearchParams)(initSearchParams);
  const clearSearchParams = () => setSearchParams(initSearchParams);
  const query = searchParams.get('q');
  const filter = searchParams.get('f')?.toLowerCase();
  const setQuery = q => setSearchParams(params => ({
    q,
    f: params.get('f')
  }));
  const setFilter = f => setSearchParams(params => ({
    q: params.get('q'),
    f
  }));
  return {
    query,
    filter,
    setQuery,
    setFilter,
    clearSearchParams
  };
}
//# sourceMappingURL=hooks.js.map