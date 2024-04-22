"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _icons = require("@edx/paragon/icons");
var _paragon = require("@edx/paragon");
var _modelStore = require("../../../../generic/model-store");
var _messages = _interopRequireDefault(require("../messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AssignmentTypeCell = _ref => {
  let {
    intl,
    assignmentType,
    footnoteMarker,
    footnoteId,
    locked
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    gradesFeatureIsFullyLocked
  } = (0, _modelStore.useModel)('progress', courseId);
  const lockedIcon = locked ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
    id: `assignmentTypeBlockedIcon${assignmentType}`,
    "aria-label": intl.formatMessage(_messages.default.noAccessToAssignmentType, {
      assignmentType
    }),
    className: "mr-1 mt-1 d-inline-flex",
    style: {
      height: '1rem',
      width: '1rem'
    },
    src: _icons.Blocked,
    "data-testid": "blocked-icon"
  }) : '';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "d-flex small",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex",
      children: lockedIcon
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [assignmentType, "\xA0", footnoteId && footnoteMarker && /*#__PURE__*/(0, _jsxRuntime.jsx)("sup", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          id: `${footnoteId}-ref`,
          className: "muted-link",
          href: `#${footnoteId}-footnote`,
          "aria-describedby": "grade-summary-footnote-label",
          tabIndex: gradesFeatureIsFullyLocked ? '-1' : '0',
          "aria-labelledby": `assignmentTypeBlockedIcon${assignmentType}`,
          children: footnoteMarker
        })
      })]
    })]
  });
};
AssignmentTypeCell.propTypes = {
  intl: _i18n.intlShape.isRequired,
  assignmentType: _propTypes.default.string.isRequired,
  footnoteId: _propTypes.default.string,
  footnoteMarker: _propTypes.default.number,
  locked: _propTypes.default.bool
};
AssignmentTypeCell.defaultProps = {
  footnoteId: '',
  footnoteMarker: null,
  locked: false
};
var _default = (0, _i18n.injectIntl)(AssignmentTypeCell);
exports.default = _default;
//# sourceMappingURL=AssignmentTypeCell.js.map