"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _reactRedux = require("react-redux");
var _icons = require("@openedx/paragon/icons");
var _thunks = require("./data/thunks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
const BookmarkButton = ({
  isBookmarked,
  isProcessing,
  unitId
}) => {
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
    className: `px-1 ml-n1 btn-sm text-primary-500 ${isProcessing && 'disabled'}`,
    onClick: toggleBookmark,
    state: state,
    "aria-busy": isProcessing,
    disabled: isProcessing,
    labels: {
      default: addBookmarkLabel,
      defaultProcessing: addBookmarkLabel,
      bookmarked: hasBookmarkLabel,
      bookmarkedProcessing: hasBookmarkLabel
    },
    icons: {
      default: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.BookmarkBorder,
        className: "text-primary"
      }),
      defaultProcessing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.BookmarkBorder,
        className: "text-primary"
      }),
      bookmarked: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.Bookmark,
        className: "text-primary"
      }),
      bookmarkedProcessing: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.Bookmark,
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