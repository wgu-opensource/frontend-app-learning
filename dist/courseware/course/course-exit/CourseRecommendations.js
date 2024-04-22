"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _truncateHtml = _interopRequireDefault(require("truncate-html"));
var _modelStore = require("../../../generic/model-store");
var _thunks = _interopRequireDefault(require("./data/thunks"));
var _slice = require("./data/slice");
var _CatalogSuggestion = _interopRequireDefault(require("./CatalogSuggestion"));
var _PageLoading = _interopRequireDefault(require("../../../generic/PageLoading"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable react/jsx-no-useless-fragment */
const messages = (0, _i18n.defineMessages)({
  recommendationsHeading: {
    id: 'courseCelebration.recommendations.heading',
    description: 'Header for recommendations section of course celebration',
    defaultMessage: 'Keep building your skills with these courses!'
  },
  recommendationsCourseFooter: {
    id: 'courseCelebration.recommendations.label',
    // not very descriptive, but is historical
    description: 'Label on a discovery-card that lets a user know that it is a course card',
    defaultMessage: 'Course'
  },
  listJoin: {
    id: 'courseCelebration.recommendations.formatting.list_join',
    description: 'Joining mark or word for a list of items, use the {sp} placeholder to include space before the joining word',
    // eslint-disable-next-line prefer-template
    defaultMessage: '{style, select, ' + 'punctuation {, } ' // HACK: select keys must match ListStyles, above, but must be statically coded for extract
    + 'conjunction { {sp}and } ' // HACK: interpolating a space character to get a leading-space here
    + 'other { }}'
  },
  browseCatalog: {
    id: 'courseCelebration.recommendations.browse_catalog',
    description: 'Link to course catalog in course celebration',
    defaultMessage: 'Explore more courses'
  },
  loadingRecommendations: {
    id: 'courseCelebration.recommendations.loading_recommendations',
    description: 'Screen-reader text for the loading screen for recommendations',
    defaultMessage: 'Loading recommendations'
  }
});
const ListStyles = {
  punctuation: 'punctuation',
  conjunction: 'conjunction'
};
const CourseCard = _ref => {
  let {
    original: {
      title,
      image,
      owners,
      marketingUrl,
      onClick
    },
    intl
  } = _ref;
  const formatList = (items, style) => items.join(intl.formatMessage(messages.listJoin, {
    style,
    sp: ' '
  } // HACK: there isn't a way to escape a leading space in the format, so pass one in
  ));

  const formattedOwners = formatList(owners.map(owner => owner.key), ListStyles.punctuation, intl);
  const subtitle = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "courseCelebration.recommendations.card.schools.label",
    description: "Screenreader label for the Schools and Partners running the course.",
    defaultMessage: "Schools and Partners",
    children: text => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [text, ": "]
      }), (0, _truncateHtml.default)(formattedOwners, 40, {
        reserveLastWord: -1
      })]
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "group",
    "aria-label": title,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
      destination: marketingUrl,
      className: "text-decoration-none",
      onClick: onClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
        isClickable: true,
        style: {
          width: '21rem',
          height: '100%'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.ImageCap, {
          src: image.src
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
          title: (0, _truncateHtml.default)(title, 70, {
            reserveLastWord: -1
          }),
          subtitle: subtitle,
          size: "sm"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Section, {
          children: [" ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {}), " "]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Footer, {
          textElement: intl.formatMessage(messages.recommendationsCourseFooter),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
        })]
      })
    })
  });
};
CourseCard.propTypes = {
  original: _propTypes.default.shape({
    marketingUrl: _propTypes.default.string,
    title: _propTypes.default.string,
    image: _propTypes.default.shape({
      src: _propTypes.default.string
    }),
    owners: _propTypes.default.arrayOf(_propTypes.default.shape({
      key: _propTypes.default.string
    })),
    onClick: _propTypes.default.func
  }).isRequired,
  intl: _i18n.intlShape.isRequired
};
const IntlCard = (0, _i18n.injectIntl)(CourseCard);
const CourseRecommendations = _ref2 => {
  let {
    intl,
    variant
  } = _ref2;
  const {
    courseId,
    recommendationsStatus
  } = (0, _reactRedux.useSelector)(state => _objectSpread(_objectSpread({}, state.recommendations), state.courseware));
  const {
    recommendations
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    org,
    number
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const dispatch = (0, _reactRedux.useDispatch)();
  const courseKey = `${org}+${number}`;
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  (0, _react.useEffect)(() => {
    dispatch((0, _thunks.default)(courseKey, courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const recommendationsLength = recommendations ? recommendations.length : 0;
  if (recommendationsStatus && recommendationsStatus !== _slice.LOADING) {
    (0, _analytics.sendTrackEvent)('edx.ui.lms.course_exit.recommendations.viewed', {
      course_key: courseKey,
      recommendations_status: recommendationsStatus,
      recommendations_length: recommendationsLength
    });
  }
  if (recommendationsStatus === _slice.FAILED || recommendationsStatus === _slice.LOADED && recommendationsLength < 2) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CatalogSuggestion.default, {
      variant: variant
    });
  }
  if (recommendationsStatus === _slice.LOADING) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
      srMessage: intl.formatMessage(messages.loadingRecommendations)
    });
  }
  const onCardClick = url => e => {
    e.preventDefault();
    (0, _utils.logClick)(org, courseId, administrator, 'recommendation_discovery_card');
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  };
  const recommendationData = recommendations.map(recommendation => _objectSpread(_objectSpread({}, recommendation), {}, {
    onClick: onCardClick(recommendation.marketingUrl)
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "course-recommendations d-flex flex-column align-items-center",
    "data-testid": "course-recommendations",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "text-center mb-3",
      children: intl.formatMessage(messages.recommendationsHeading)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mb-2 mt-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DataTable, {
        isPaginated: true,
        itemCount: recommendationsLength,
        data: recommendationData,
        columns: [{
          Header: 'Title',
          accessor: 'title'
        }],
        initialState: {
          pageSize: 3,
          pageIndex: 0
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.CardView, {
          CardComponent: IntlCard
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
      style: {
        textDecoration: 'underline'
      },
      destination: (0, _frontendPlatform.getConfig)().SEARCH_CATALOG_URL,
      className: "text-center",
      children: intl.formatMessage(messages.browseCatalog)
    })]
  });
};
CourseRecommendations.propTypes = {
  intl: _i18n.intlShape.isRequired,
  variant: _propTypes.default.string.isRequired
};
var _default = (0, _i18n.injectIntl)(CourseRecommendations);
exports.default = _default;
//# sourceMappingURL=CourseRecommendations.js.map