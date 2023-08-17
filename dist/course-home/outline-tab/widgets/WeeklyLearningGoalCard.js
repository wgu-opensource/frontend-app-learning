"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _frontendPlatform = require("@edx/frontend-platform");

var _analytics = require("@edx/frontend-platform/analytics");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _icons = require("@edx/paragon/icons");

var _reactRedux = require("react-redux");

var _messages = _interopRequireDefault(require("../messages"));

var _LearningGoalButton = _interopRequireDefault(require("./LearningGoalButton"));

var _data = require("../../data");

var _modelStore = require("../../../generic/model-store");

require("./FlagButton.scss");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function WeeklyLearningGoalCard(_ref) {
  let {
    daysPerWeek,
    subscribedToReminders,
    intl
  } = _ref;
  const {
    courseId
  } = (0, _reactRedux.useSelector)(state => state.courseHome);
  const {
    isMasquerading,
    org
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    administrator
  } = (0, _auth.getAuthenticatedUser)();
  const [daysPerWeekGoal, setDaysPerWeekGoal] = (0, _react.useState)(daysPerWeek); // eslint-disable-next-line react/prop-types

  const [isGetReminderSelected, setGetReminderSelected] = (0, _react.useState)(subscribedToReminders);
  const location = (0, _reactRouterDom.useLocation)();

  function handleSelect(days) {
    let triggeredFromEmail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // Set the subscription button if this is the first time selecting a goal
    const selectReminders = daysPerWeekGoal === null ? true : isGetReminderSelected;
    setGetReminderSelected(selectReminders);
    setDaysPerWeekGoal(days);

    if (!isMasquerading) {
      // don't save goal updates while masquerading
      (0, _data.saveWeeklyLearningGoal)(courseId, days, selectReminders);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.goal.days-per-week.changed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
        num_days: days,
        reminder_selected: selectReminders
      });

      if (triggeredFromEmail) {
        (0, _analytics.sendTrackEvent)('welcome.email.clicked.setgoal', {});
      }
    }
  }

  function handleSubscribeToReminders(event) {
    const isGetReminderChecked = event.target.checked;
    setGetReminderSelected(isGetReminderChecked);

    if (!isMasquerading) {
      // don't save goal updates while masquerading
      (0, _data.saveWeeklyLearningGoal)(courseId, daysPerWeekGoal, isGetReminderChecked);
      (0, _analytics.sendTrackEvent)('edx.ui.lms.goal.reminder-selected.changed', {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
        num_days: daysPerWeekGoal,
        reminder_selected: isGetReminderChecked
      });
    }
  }

  (0, _react.useEffect)(() => {
    const currentParams = new URLSearchParams(location.search);
    const weeklyGoal = Number(currentParams.get('weekly_goal'));

    if ([1, 3, 5].includes(weeklyGoal)) {
      handleSelect(weeklyGoal, true); // Deleting the weekly_goal query param as it only needs to be set once
      // whenever passed in query params.

      currentParams.delete('weekly_goal');

      _frontendPlatform.history.replace({
        search: currentParams.toString()
      });
    }
  }, [location.search]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
    id: "courseHome-weeklyLearningGoal",
    className: "row w-100 m-0 mb-3 raised-card",
    "data-testid": "weekly-learning-goal-card",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
      size: "sm",
      title: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "set-weekly-goal-header",
        children: intl.formatMessage(_messages.default.setWeeklyGoal)
      }),
      subtitle: intl.formatMessage(_messages.default.setWeeklyGoalDetail)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Section, {
      className: "text-gray-700 small",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        role: "radiogroup",
        "aria-labelledby": "set-weekly-goal-header",
        className: "flag-button-container m-0 p-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LearningGoalButton.default, {
          level: "casual",
          isSelected: daysPerWeekGoal === 1,
          handleSelect: handleSelect
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LearningGoalButton.default, {
          level: "regular",
          isSelected: daysPerWeekGoal === 3,
          handleSelect: handleSelect
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LearningGoalButton.default, {
          level: "intense",
          isSelected: daysPerWeekGoal === 5,
          handleSelect: handleSelect
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "d-flex pt-3",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Switch, {
          checked: isGetReminderSelected,
          onChange: event => handleSubscribeToReminders(event),
          disabled: !daysPerWeekGoal,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
            children: intl.formatMessage(_messages.default.setGoalReminder)
          })
        })
      })]
    }), isGetReminderSelected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Section, {
      muted: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row w-100 m-0 small align-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-flex align-items-center pr-1",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            className: "text-primary-500",
            src: _icons.Email
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "col",
          children: intl.formatMessage(_messages.default.goalReminderDetail)
        })]
      })
    })]
  });
}

WeeklyLearningGoalCard.propTypes = {
  daysPerWeek: _propTypes.default.number,
  subscribedToReminders: _propTypes.default.bool,
  intl: _i18n.intlShape.isRequired
};
WeeklyLearningGoalCard.defaultProps = {
  daysPerWeek: null,
  subscribedToReminders: false
};

var _default = (0, _i18n.injectIntl)(WeeklyLearningGoalCard);

exports.default = _default;
//# sourceMappingURL=WeeklyLearningGoalCard.js.map