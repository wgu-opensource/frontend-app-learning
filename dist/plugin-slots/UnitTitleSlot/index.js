"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPluginFramework = require("@openedx/frontend-plugin-framework");
var _i18n = require("@edx/frontend-platform/i18n");
var _bookmark = require("@src/courseware/course/bookmark");
var _messages = _interopRequireDefault(require("@src/courseware/course/sequence/messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnitTitleSlot = ({
  unitId,
  unit,
  renderUnitNavigation
}) => {
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const isProcessing = unit.bookmarkedUpdateState === 'loading';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_frontendPluginFramework.PluginSlot, {
    id: "org.openedx.frontend.learning.unit_title.v1",
    idAliases: ['unit_title_slot'],
    pluginProps: {
      unitId,
      unit,
      isEnabledOutlineSidebar: true,
      renderUnitNavigation
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex justify-content-between",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mb-0",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "h3",
          children: unit.title
        })
      }), renderUnitNavigation(true)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "sr-only",
      children: formatMessage(_messages.default.headerPlaceholder)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_bookmark.BookmarkButton, {
      unitId: unit.id,
      isBookmarked: unit.bookmarked,
      isProcessing: isProcessing
    })]
  });
};
UnitTitleSlot.propTypes = {
  unitId: _propTypes.default.string.isRequired,
  unit: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    bookmarked: _propTypes.default.bool.isRequired,
    title: _propTypes.default.string.isRequired,
    bookmarkedUpdateState: _propTypes.default.string.isRequired
  }).isRequired,
  renderUnitNavigation: _propTypes.default.func.isRequired
};
var _default = exports.default = UnitTitleSlot;
//# sourceMappingURL=index.js.map