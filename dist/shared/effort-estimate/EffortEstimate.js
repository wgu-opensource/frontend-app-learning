"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@edx/frontend-platform/i18n");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component shows an effort estimate provided by the backend block data. Either time, activities, or both.
function EffortEstimate(props) {
  const {
    block: {
      effortActivities,
      effortTime
    },
    className,
    intl
  } = props;
  const minuteCount = Math.ceil(effortTime / 60); // effortTime is in seconds

  const minutesAbbreviated = intl.formatMessage(_messages.default.minutesAbbreviated, {
    minuteCount
  });
  const minutesFull = intl.formatMessage(_messages.default.minutesFull, {
    minuteCount
  });
  const minutes = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "aria-hidden": "true",
      children: minutesAbbreviated
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "sr-only",
      children: minutesFull
    })]
  });
  const activities = intl.formatMessage(_messages.default.activities, {
    activityCount: effortActivities
  });
  let content = null;

  if (effortTime && effortActivities) {
    content = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.effortEstimation.combinedEstimate",
      defaultMessage: "{minutes} + {activities}",
      description: "You can likely leave this alone, unless you want to use a full width plus or similar change",
      values: {
        activities,
        minutes
      }
    });
  } else if (effortTime) {
    content = minutes;
  } else if (effortActivities) {
    content = activities;
  } else {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: (0, _classnames.default)('text-gray-500 text-monospace', className),
    style: {
      fontSize: '0.8em'
    },
    children: content
  });
}

EffortEstimate.defaultProps = {
  className: null
};
EffortEstimate.propTypes = {
  block: _propTypes.default.shape({
    effortActivities: _propTypes.default.number,
    effortTime: _propTypes.default.number
  }).isRequired,
  className: _propTypes.default.string,
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(EffortEstimate);

exports.default = _default;
//# sourceMappingURL=EffortEstimate.js.map