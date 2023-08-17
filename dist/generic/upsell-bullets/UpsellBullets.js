"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullAccessBullet = FullAccessBullet;
exports.SupportMissionBullet = SupportMissionBullet;
exports.UnlockGradedBullet = UnlockGradedBullet;
exports.VerifiedCertBullet = VerifiedCertBullet;

var _react = _interopRequireDefault(require("react"));

var _faCheck = require("@fortawesome/free-solid-svg-icons/faCheck");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _i18n = require("@edx/frontend-platform/i18n");

var _frontendPlatform = require("@edx/frontend-platform");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheckmarkBullet() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "fa-li",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      icon: _faCheck.faCheck
    })
  });
} // Must be child of a <ul className="fa-ul">


function VerifiedCertBullet() {
  const verifiedCertLink = /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: "inline-link-underline font-weight-bold",
    rel: "noopener noreferrer",
    target: "_blank",
    href: `${(0, _frontendPlatform.getConfig)().MARKETING_SITE_BASE_URL}/verified-certificate`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.verifiedCertBullet.verifiedCert",
      defaultMessage: "verified certificate",
      description: "Bolded words 'verified certificate', which is the name of credential the learner receives."
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "upsell-bullet",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckmarkBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.verifiedCertBullet",
      defaultMessage: "Earn a {verifiedCertLink} of completion to showcase on your resum\xE9",
      description: "Bullet showcasing benefit of earned credential.",
      values: {
        verifiedCertLink
      }
    })]
  });
} // Must be child of a <ul className="fa-ul">


function UnlockGradedBullet() {
  const gradedAssignmentsInBoldText = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "font-weight-bold",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.unlockGradedBullet.gradedAssignments",
      defaultMessage: "graded assignments",
      description: "Bolded words 'graded assignments', which are the bolded portion of a bullet point highlighting that course content is unlocked when purchasing an upgrade. Graded assignments are any course content that is graded and are unlocked by upgrading to verified certificates."
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "upsell-bullet",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckmarkBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.unlockGradedBullet",
      defaultMessage: "Unlock your access to all course activities, including {gradedAssignmentsInBoldText}",
      description: "Bullet showcasing benefit of additional course material.",
      values: {
        gradedAssignmentsInBoldText
      }
    })]
  });
} // Must be child of a <ul className="fa-ul">


function FullAccessBullet() {
  const fullAccessInBoldText = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "font-weight-bold",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.fullAccessBullet.fullAccess",
      defaultMessage: "Full access",
      description: "Bolded phrase 'Full access', which is the bolded portion of a bullet point highlighting that access to course content will not have time limits."
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "upsell-bullet",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckmarkBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.fullAccessBullet",
      defaultMessage: "{fullAccessInBoldText} to course content and materials, even after the course ends",
      description: "Bullet showcasing upgrade lifts access durations.",
      values: {
        fullAccessInBoldText
      }
    })]
  });
} // Must be child of a <ul className="fa-ul">


function SupportMissionBullet() {
  const missionInBoldText = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "font-weight-bold",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.supportMissionBullet.mission",
      defaultMessage: "mission",
      description: "Bolded word 'mission', which is the bolded portion of a bullet point encouraging the learner to support the goals of the website."
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: "upsell-bullet",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckmarkBullet, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "learning.generic.upsell.supportMissionBullet",
      defaultMessage: "Support our {missionInBoldText} at {siteName}",
      description: "Bullet encouraging user to support edX's goals.",
      values: {
        missionInBoldText,
        siteName: (0, _frontendPlatform.getConfig)().SITE_NAME
      }
    })]
  });
}
//# sourceMappingURL=UpsellBullets.js.map