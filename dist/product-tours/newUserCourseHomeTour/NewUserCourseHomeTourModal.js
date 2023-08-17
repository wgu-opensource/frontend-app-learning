"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frontendPlatform = require("@edx/frontend-platform");

var _i18n = require("@edx/frontend-platform/i18n");

var _paragon = require("@edx/paragon");

var _course_home_tour_modal_hero = _interopRequireDefault(require("./course_home_tour_modal_hero.png"));

var _messages = _interopRequireDefault(require("../messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NewUserCourseHomeTourModal(_ref) {
  let {
    intl,
    isOpen,
    onDismiss,
    onStartTour
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MarketingModal, {
    isOpen: isOpen,
    title: "New user course home prompt",
    className: "new-user-tour-dialog",
    heroIsDark: true,
    hasCloseButton: false,
    heroNode: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ModalDialog.Hero, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Hero.Background, {
        backgroundSrc: _course_home_tour_modal_hero.default
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Hero.Content, {
        style: {
          maxWidth: '20rem'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Title, {
          as: "h2",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "tours.newUserModal.title",
            defaultMessage: "{welcome} {siteName} course!",
            values: {
              siteName: (0, _frontendPlatform.getConfig)().SITE_NAME,
              welcome: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "text-accent-b",
                children: intl.formatMessage(_messages.default.newUserModalTitleWelcome)
              })
            }
          })
        })
      })]
    }),
    footerNode: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ActionRow, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "tertiary",
        onClick: onDismiss,
        children: intl.formatMessage(_messages.default.skipForNow)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "brand",
        onClick: onStartTour,
        children: intl.formatMessage(_messages.default.beginTour)
      })]
    }),
    onClose: onDismiss,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "text-dark-900",
      children: intl.formatMessage(_messages.default.newUserModalBody, {
        siteName: (0, _frontendPlatform.getConfig)().SITE_NAME
      })
    })
  });
}

NewUserCourseHomeTourModal.propTypes = {
  intl: _i18n.intlShape.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  onDismiss: _propTypes.default.func.isRequired,
  onStartTour: _propTypes.default.func.isRequired
};

var _default = (0, _i18n.injectIntl)(NewUserCourseHomeTourModal);

exports.default = _default;
//# sourceMappingURL=NewUserCourseHomeTourModal.js.map