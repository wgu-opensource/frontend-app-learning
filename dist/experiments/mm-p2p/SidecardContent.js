"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
const AlertBanner = _ref => {
  let {
    color,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)('mmp2p-sidecard-alert alert', {
      danger: color === 'red'
    }),
    children: children
  });
};

AlertBanner.propTypes = {
  color: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired
};

const localizeTime = date => date.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: 'numeric',
  hour12: true,
  timeZoneName: 'short'
});

const localizeDate = date => date.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric'
});

const BulletList = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      marginBottom: '3px'
    },
    className: "mmp2p-bullet-list-item",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "icon-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "check-circle",
        className: "svg-inline--fa fa-check-circle fa-w-16",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          fill: "currentColor",
          d: "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "bullet-item-content",
      children: children
    })]
  });
};

BulletList.propTypes = {
  children: _propTypes.default.node.isRequired
};

const Sidecard = _ref3 => {
  let {
    options: {
      state: {
        upgradeDeadline
      },
      access: {
        accessExpirationDate,
        price,
        upgradeUrl
      }
    }
  } = _ref3;
  const dates = {
    upgradeDeadline: new Date(upgradeDeadline),
    accessExpirationDate: new Date(accessExpirationDate),
    now: new Date()
  };
  const upgradeDeadlineTime = localizeTime(dates.upgradeDeadline);
  const upgradeDeadlineDate = localizeDate(dates.upgradeDeadline);
  const daysUntilDeadline = parseInt((dates.upgradeDeadline - dates.now) / (1000 * 60 * 60 * 24), 10);
  const hoursUntilDeadline = parseInt((dates.upgradeDeadline - dates.now) / (1000 * 60 * 60), 10);
  const accessDeadlineDate = localizeDate(dates.accessExpirationDate);
  const certLink = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "cert-link",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      id: "mmp2p-support-link",
      href: "https://www.edx.org/verified-certificate",
      target: "_blank",
      rel: "noopener noreferrer",
      children: "verified certificate"
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "mmp2p-sidecard-wrapper section",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h5", {
      className: "hd hd-6",
      children: ["Unlock the full course by ", upgradeDeadlineDate, " at ", upgradeDeadlineTime]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(AlertBanner, {
      color: daysUntilDeadline >= 7 ? 'yellow' : 'red',
      children: [daysUntilDeadline > 1 && `${daysUntilDeadline} days left`, daysUntilDeadline === 1 && '1 day left', daysUntilDeadline < 1 && hoursUntilDeadline >= 1 && `${hoursUntilDeadline} hours left`, daysUntilDeadline < 1 && hoursUntilDeadline < 1 && 'Less than one hour left']
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        fontSize: '14px'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(BulletList, {
        children: ["Unlock your access to all course activities, including \xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontWeight: 600
          },
          children: "graded assignments"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(BulletList, {
        children: ["Earn a ", certLink, " of completion to showcase on your resum\xE9"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(BulletList, {
        children: ["Support our ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontWeight: 600
          },
          children: "mission"
        }), " at edX"]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        fontSize: '12px',
        marginTop: '10px',
        marginBottom: '5px'
      },
      children: ["You will lose access to the first two weeks of scheduled content on ", accessDeadlineDate, "."]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "upgrade-container",
      style: {
        paddingTop: '15px'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
        id: "green_upgrade",
        className: "btn btn-primary btn-block btn-lg",
        href: upgradeUrl,
        "data-creative": "sidebarupsell",
        "data-position": "sidebar-message",
        "data-ol-has-click-handler": "",
        style: {
          display: 'block',
          fontSize: '1em',
          fontWeight: 600
        },
        children: ["Upgrade for ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "price",
          children: price
        })]
      })
    })]
  });
};

Sidecard.propTypes = {
  options: _propTypes.default.shape({
    state: _propTypes.default.shape({
      upgradeDeadline: _propTypes.default.string.isRequired
    }),
    access: _propTypes.default.shape({
      accessExpirationDate: _propTypes.default.string.isRequired,
      price: _propTypes.default.string.isRequired,
      upgradeUrl: _propTypes.default.string.isRequired
    })
  })
};

const futureDate = numDays => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + numDays);
  return defaultDate;
};

Sidecard.defaultProps = {
  options: {
    state: {
      upgradeDeadline: new Date('Mar 29, 2021 11:59 PM EST')
    },
    access: {
      accessDeadline: futureDate(24),
      price: '$23',
      upgradeUrl: ''
    }
  }
};
var _default = Sidecard;
exports.default = _default;
//# sourceMappingURL=SidecardContent.js.map