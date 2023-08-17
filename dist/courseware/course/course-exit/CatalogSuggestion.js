"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _faSearch = require("@fortawesome/free-solid-svg-icons/faSearch");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _modelStore = require("../../../generic/model-store");

var _messages = _interopRequireDefault(require("./messages"));

var _utils = require("./utils");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CatalogSuggestion(_ref) {
  let {
    intl,
    variant
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseware);
  const {
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const searchOurCatalogLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: (0, _frontendPlatform.getConfig)().SEARCH_CATALOG_URL,
    className: "text-reset",
    onClick: () => (0, _utils.logClick)(org, courseId, administrator, 'catalog_search', {
      variant
    }),
    children: intl.formatMessage(_messages.default.searchOurCatalogLink)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "row w-100 mx-0 my-2 justify-content-center",
    "data-testid": "catalog-suggestion",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "col col-md-8 p-4 bg-info-100 text-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faSearch.faSearch,
        style: {
          width: '20px'
        }
      }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "courseExit.catalogSearchSuggestion",
        defaultMessage: "Looking to learn more? {searchOurCatalogLink} to find more courses and programs to explore.",
        values: {
          searchOurCatalogLink
        },
        description: "Suggesting to learner to explore other course. Shown when they finish the course"
      })]
    })
  });
}

CatalogSuggestion.propTypes = {
  intl: _i18n.intlShape.isRequired,
  variant: _propTypes.default.string.isRequired
};

var _default = (0, _i18n.injectIntl)(CatalogSuggestion);

exports.default = _default;
//# sourceMappingURL=CatalogSuggestion.js.map