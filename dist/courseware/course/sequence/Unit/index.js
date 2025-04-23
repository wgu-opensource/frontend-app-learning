"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _i18n = require("@edx/frontend-platform/i18n");
var _modelStore = require("@src/generic/model-store");
var _pluginStore = require("@src/generic/plugin-store");
var _BookmarkButton = _interopRequireDefault(require("../../bookmark/BookmarkButton"));
var _messages = _interopRequireDefault(require("../messages"));
var _ContentIFrame = _interopRequireDefault(require("./ContentIFrame"));
var _UnitSuspense = _interopRequireDefault(require("./UnitSuspense"));
var _constants = require("./constants");
var _hooks = require("./hooks");
var _urls = require("./urls");
var _UnitTitleSlot = _interopRequireDefault(require("../../../../plugin-slots/UnitTitleSlot"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Unit = _ref => {
  let {
    courseId,
    format,
    onLoaded,
    id
  } = _ref;
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const {
    authenticatedUser
  } = _react.default.useContext(_react2.AppContext);
  const examAccess = (0, _hooks.useExamAccess)({
    id
  });
  const shouldDisplayHonorCode = (0, _hooks.useShouldDisplayHonorCode)({
    courseId,
    id
  });
  const unit = (0, _modelStore.useModel)(_constants.modelKeys.units, id);
  const isProcessing = unit.bookmarkedUpdateState === 'loading';
  const view = authenticatedUser ? _constants.views.student : _constants.views.public;
  const getUrl = (0, _pluginStore.usePluginsCallback)('getIFrameUrl', () => (0, _urls.getIFrameUrl)({
    id,
    view,
    format,
    examAccess
  }));
  const iframeUrl = getUrl();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "unit",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mb-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        className: "h3",
        children: unit.title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitTitleSlot.default, {
        courseId: courseId,
        unitId: id
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "sr-only",
      children: formatMessage(_messages.default.headerPlaceholder)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BookmarkButton.default, {
      unitId: unit.id,
      isBookmarked: unit.bookmarked,
      isProcessing: isProcessing
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnitSuspense.default, {
      courseId,
      id
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContentIFrame.default, {
      elementId: "unit-iframe",
      id: id,
      iframeUrl: iframeUrl,
      loadingMessage: formatMessage(_messages.default.loadingSequence),
      onLoaded: onLoaded,
      shouldShowContent: !shouldDisplayHonorCode && !examAccess.blockAccess,
      title: unit.title
    })]
  });
};
Unit.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  format: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  onLoaded: _propTypes.default.func
};
Unit.defaultProps = {
  format: null,
  onLoaded: undefined
};
var _default = exports.default = Unit;
//# sourceMappingURL=index.js.map