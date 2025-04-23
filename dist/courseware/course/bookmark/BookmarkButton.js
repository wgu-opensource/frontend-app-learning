"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _BookmarkOutlineIcon = _interopRequireDefault(require("./BookmarkOutlineIcon"));
var _BookmarkFilledIcon = _interopRequireDefault(require("./BookmarkFilledIcon"));
var _thunks = require("./data/thunks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const BookmarkButton = _ref => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
};
BookmarkButton.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  isBookmarked: _propTypes.default.bool,
  isProcessing: _propTypes.default.bool.isRequired
};
BookmarkButton.defaultProps = {
  isBookmarked: false
};
var _default = exports.default = BookmarkButton;
//# sourceMappingURL=BookmarkButton.js.map