"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _DateSummary = _interopRequireDefault(require("../DateSummary"));

var _messages = _interopRequireDefault(require("../messages"));

var _modelStore = require("../../../generic/model-store");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CourseDates(_ref) {
  let {
    intl,

    /** [MM-P2P] Experiment */
    mmp2p
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    userTimezone
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    datesWidget: {
      courseDateBlocks,
      datesTabLink
    }
  } = (0, _modelStore.useModel)('outline', courseId);

  if (courseDateBlocks.length === 0) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "mb-4",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      id: "courseHome-dates",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "h4",
        children: intl.formatMessage(_messages.default.dates)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
        className: "list-unstyled",
        children: courseDateBlocks.map(courseDateBlock => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateSummary.default, {
          dateBlock: courseDateBlock,
          userTimezone: userTimezone
          /** [MM-P2P] Experiment */
          ,
          mmp2p: mmp2p
        }, courseDateBlock.title + courseDateBlock.date))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        className: "font-weight-bold ml-4 pl-1 small",
        href: datesTabLink,
        children: intl.formatMessage(_messages.default.allDates)
      })]
    })
  });
}

CourseDates.propTypes = {
  intl: _i18n.intlShape.isRequired,

  /** [MM-P2P] Experiment */
  mmp2p: _propTypes.default.shape({})
};
CourseDates.defaultProps = {
  /** [MM-P2P] Experiment */
  mmp2p: {}
};

var _default = (0, _i18n.injectIntl)(CourseDates);

exports.default = _default;
//# sourceMappingURL=CourseDates.js.map