"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@edx/frontend-platform/i18n");

var _GenericTourFormattedMessages = require("../GenericTourFormattedMessages");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const datesCheckpoint = {
  body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.datesCheckpoint.body",
    defaultMessage: "Important dates can help you stay on track."
  }),
  placement: 'left',
  target: '#courseHome-dates',
  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.datesCheckpoint.title",
    defaultMessage: "Keep on top of key dates"
  })
};
const outlineCheckpoint = {
  body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.outlineCheckpoint.body",
    defaultMessage: "You can explore sections of the course using the outline below."
  }),
  placement: 'top',
  target: '#courseHome-outline',
  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.outlineCheckpoint.title",
    defaultMessage: "Take the course!"
  })
};
const tabNavigationCheckpoint = {
  body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.tabNavigationCheckpoint.body",
    defaultMessage: "These tabs can be used to access other course materials, such as your progress, syllabus, etc."
  }),
  placement: 'bottom',
  target: '#courseTabsNavigation',
  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.tabNavigationCheckpoint.title",
    defaultMessage: "Additional course resources"
  })
};
const upgradeCheckpoint = {
  body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.upgradeCheckpoint.body",
    defaultMessage: "Work towards a certificate and gain full access to course materials. Upgrade now!"
  }),
  placement: 'left',
  target: '#courseHome-upgradeNotification',
  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.upgradeCheckpoint.title",
    defaultMessage: "Unlock your course"
  })
};
const weeklyGoalsCheckpoint = {
  body: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.weeklyGoalsCheckpoint.body",
    defaultMessage: "Setting a goal makes you more likely to complete your course."
  }),
  placement: 'left',
  target: '#courseHome-weeklyLearningGoal',
  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
    id: "tours.weeklyGoalsCheckpoint.title",
    defaultMessage: "Set a course goal"
  })
};

const newUserCourseHomeTour = _ref => {
  let {
    enabled,
    onDismiss,
    onEnd
  } = _ref;
  return {
    advanceButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.NextButtonFormattedMessage, {}),
    checkpoints: [outlineCheckpoint, datesCheckpoint, tabNavigationCheckpoint, upgradeCheckpoint, weeklyGoalsCheckpoint],
    dismissButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.DismissButtonFormattedMessage, {}),
    enabled,
    endButtonText: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericTourFormattedMessages.OkayButtonFormattedMessage, {}),
    onDismiss,
    onEnd,
    onEscape: onDismiss,
    tourId: 'newUserCourseHomeTour'
  };
};

var _default = newUserCourseHomeTour;
exports.default = _default;
//# sourceMappingURL=NewUserCourseHomeTour.js.map