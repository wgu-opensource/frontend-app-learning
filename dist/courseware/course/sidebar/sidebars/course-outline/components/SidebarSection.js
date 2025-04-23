"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _messages = _interopRequireDefault(require("@src/course-home/outline-tab/messages"));
var _selectors = require("@src/courseware/data/selectors");
var _CompletionIcon = _interopRequireDefault(require("./CompletionIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SidebarSection = _ref => {
  let {
    intl,
    section,
    handleSelectSection
  } = _ref;
  const {
    id,
    complete,
    title,
    sequenceIds,
    completionStat
  } = section;
  const activeSequenceId = (0, _reactRedux.useSelector)(_selectors.getSequenceId);
  const isActiveSection = sequenceIds.includes(activeSequenceId);
  const sectionTitle = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-auto p-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompletionIcon.default, {
        completionStat: completionStat
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "col-10 ml-3 p-0 flex-grow-1 text-dark-500 text-left text-break",
      children: [title, /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [", ", intl.formatMessage(complete ? _messages.default.completedSection : _messages.default.incompleteSection)]
      })]
    })]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    className: "mb-2 course-sidebar-section",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
      variant: "tertiary",
      className: (0, _classnames.default)('d-flex align-items-center w-100 px-4 py-3.5 rounded-0 justify-content-start', {
        'bg-info-100': isActiveSection
      }),
      onClick: () => handleSelectSection(id),
      children: [sectionTitle, /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.ChevronRight
      })]
    })
  });
};
SidebarSection.propTypes = {
  intl: _i18n.intlShape.isRequired,
  section: _propTypes.default.shape({
    complete: _propTypes.default.bool,
    id: _propTypes.default.string,
    title: _propTypes.default.string,
    sequenceIds: _propTypes.default.arrayOf(_propTypes.default.string),
    completionStat: _propTypes.default.shape({
      completed: _propTypes.default.number,
      total: _propTypes.default.number
    })
  }).isRequired,
  handleSelectSection: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(SidebarSection);
//# sourceMappingURL=SidebarSection.js.map