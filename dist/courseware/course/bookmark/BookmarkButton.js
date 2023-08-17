"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BookmarkButton;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _i18n = require("@edx/frontend-platform/i18n");

var _reactRedux = require("react-redux");

var _BookmarkOutlineIcon = _interopRequireDefault(require("./BookmarkOutlineIcon"));

var _BookmarkFilledIcon = _interopRequireDefault(require("./BookmarkFilledIcon"));

var _thunks = require("./data/thunks");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const addBookmarkLabel = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
  id: "unit.bookmark.button.add.bookmark",
  defaultMessage: "Bookmark this page",
  description: "The button to bookmark a page"
});
const hasBookmarkLabel = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
  id: "unit.bookmark.button.remove.bookmark",
  defaultMessage: "Bookmarked",
  description: "The button to show a page is bookmarked and the button to remove that bookmark"
});

function BookmarkButton(_ref) {
  let {
    isBookmarked,
    isProcessing,
    unitId
  } = _ref;
  const bookmarkState = isBookmarked ? 'bookmarked' : 'default';
  const state = isProcessing ? `${bookmarkState}Processing` : bookmarkState;
  const dispatch = (0, _reactRedux.useDispatch)();
  const toggleBookmark = (0, _react.useCallback)(() => {
    if (isBookmarked) {
      dispatch((0, _thunks.removeBookmark)(unitId));
    } else {
      dispatch((0, _thunks.addBookmark)(unitId));
    }
  }, [isBookmarked, unitId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.StatefulButton, {
    variant: "link",
    className: "px-1 ml-n1 btn-sm text-primary-500",
    onClick: toggleBookmark,
    state: state,
    disabledStates: ['defaultProcessing', 'bookmarkedProcessing'],
    labels: {
      default: addBookmarkLabel,
      defaultProcessing: addBookmarkLabel,
      bookmarked: hasBookmarkLabel,
      bookmarkedProcessing: hasBookmarkLabel
    },
    icons: {
      default: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkOutlineIcon.default, {
        className: "text-primary"
      }),
      defaultProcessing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkOutlineIcon.default, {
        className: "text-primary"
      }),
      bookmarked: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkFilledIcon.default, {
        className: "text-primary"
      }),
      bookmarkedProcessing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkFilledIcon.default, {
        className: "text-primary"
      })
    }
  });
}

BookmarkButton.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  isBookmarked: _propTypes.default.bool,
  isProcessing: _propTypes.default.bool.isRequired
};
BookmarkButton.defaultProps = {
  isBookmarked: false
};
//# sourceMappingURL=BookmarkButton.js.map