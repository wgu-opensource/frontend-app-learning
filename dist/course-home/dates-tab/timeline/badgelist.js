"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBadgeListAndColor = getBadgeListAndColor;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");

var _paragon = require("@edx/paragon");

var _messages = _interopRequireDefault(require("../messages"));

var _utils = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasAccess(item) {
  return item.learnerHasAccess;
}

function isComplete(assignment) {
  return assignment.complete;
}

function isPastDue(assignment) {
  return !isComplete(assignment) && new Date(assignment.date) < new Date();
}

function isUnreleased(assignment) {
  return !assignment.link;
} // Pass a null item if you want to get a whole day's badge list, not just one item's list.
// Returns an object with 'color' and 'badges' properties.


function getBadgeListAndColor(date, intl, item, items) {
  const now = new Date();
  const assignments = items.filter(_utils.isLearnerAssignment);
  const isToday = (0, _utils.daycmp)(date, now) === 0;
  const isInFuture = (0, _utils.daycmp)(date, now) > 0; // This badge info list is in order of priority (they will appear left to right in this order and the first badge
  // sets the color of the dot in the timeline).

  const badgesInfo = [{
    message: _messages.default.today,
    shownForDay: isToday,
    bg: 'bg-warning-300',
    className: 'text-black'
  }, {
    message: _messages.default.completed,
    shownForDay: assignments.length && assignments.every(isComplete),
    shownForItem: x => (0, _utils.isLearnerAssignment)(x) && isComplete(x),
    bg: 'bg-light-500',
    className: 'text-black'
  }, {
    message: _messages.default.pastDue,
    shownForDay: assignments.length && assignments.every(isPastDue),
    shownForItem: x => (0, _utils.isLearnerAssignment)(x) && isPastDue(x),
    bg: 'bg-dark-200',
    className: 'text-white'
  }, {
    message: _messages.default.dueNext,
    shownForDay: !isToday && assignments.some(x => x.dueNext),
    shownForItem: x => x.dueNext,
    bg: 'bg-gray-500',
    className: 'text-white'
  }, {
    message: _messages.default.unreleased,
    shownForDay: assignments.length && assignments.every(isUnreleased),
    shownForItem: x => (0, _utils.isLearnerAssignment)(x) && isUnreleased(x),
    className: 'border border-gray-500 text-gray-500'
  }, {
    message: _messages.default.verifiedOnly,
    shownForDay: items.length && items.every(x => !hasAccess(x)),
    shownForItem: x => !hasAccess(x),
    icon: _faLock.faLock,
    bg: 'bg-dark-700',
    className: 'text-white'
  }];
  let color = null; // first color of any badge

  const badges = /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: badgesInfo.map(b => {
      let shown = b.shownForDay;

      if (item) {
        if (b.shownForDay) {
          shown = false; // don't double up, if the day already has this badge
        } else {
          shown = b.shownForItem && b.shownForItem(item);
        }
      }

      if (!shown) {
        return null;
      }

      if (!color && !isInFuture) {
        color = b.bg;
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Badge, {
        className: (0, _classnames.default)('ml-2', b.bg, b.className),
        "data-testid": "dates-badge",
        children: [b.icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
          icon: b.icon,
          className: "mr-1"
        }), intl.formatMessage(b.message)]
      }, b.message.id);
    })
  });

  if (!color && isInFuture) {
    color = 'bg-gray-900';
  }

  return {
    color,
    badges
  };
} // eslint-disable-next-line import/prefer-default-export
//# sourceMappingURL=badgelist.js.map