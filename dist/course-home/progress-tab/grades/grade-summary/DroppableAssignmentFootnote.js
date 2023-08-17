"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _messages = _interopRequireDefault(require("../messages"));

var _modelStore = require("../../../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DroppableAssignmentFootnote(_ref) {
  let {
    footnotes,
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      id: "grade-summary-footnote-label",
      className: "sr-only",
      children: intl.formatMessage(_messages.default.footnotesTitle)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: "list-unstyled mt-2",
      children: footnotes.map((footnote, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        id: `${footnote.id}-footnote`,
        className: "x-small mt-1",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("sup", {
          children: index + 1
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "progress.footnotes.droppableAssignments",
          defaultMessage: "The lowest {numDroppable, plural, one{# {assignmentType} score is} other{# {assignmentType} scores are}} dropped.",
          values: {
            numDroppable: footnote.numDroppable,
            assignmentType: footnote.assignmentType
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          className: "sr-only",
          href: `#${footnote.id}-ref`,
          tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0',
          children: intl.formatMessage(_messages.default.backToContent)
        })]
      }, footnote.id))
    })]
  });
}

DroppableAssignmentFootnote.propTypes = {
  footnotes: _propTypes.default.arrayOf(_propTypes.default.shape({
    assignmentType: _propTypes.default.string.isRequired,
    id: _propTypes.default.string.isRequired,
    numDroppable: _propTypes.default.number.isRequired
  })).isRequired,
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(DroppableAssignmentFootnote);

exports.default = _default;
//# sourceMappingURL=DroppableAssignmentFootnote.js.map