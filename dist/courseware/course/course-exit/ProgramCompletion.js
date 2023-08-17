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

var _edX_certificate = _interopRequireDefault(require("../../../generic/assets/edX_certificate.png"));

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Note for Open edX developers:
 * There are pieces of this component that are hard-coded and specific to edX that may not apply to your organization.
 * This includes mentions of our edX program types (MicroMasters, MicroBachelors, Professional Certificate, and
 * XSeries), along with their respective support article URLs and image variable names.
 *
 * Currently, this component will not render unless the learner's completed course has a related program of one of the
 * four aforementioned types. This will not impact the parent components (i.e. CourseCelebration will render normally).
 */
const programTypes = ['microbachelors', 'micromasters', 'professional-certificate', 'xseries'];

function ProgramCompletion(_ref) {
  let {
    intl,
    progress,
    title,
    type,
    url
  } = _ref;

  if (!programTypes.includes(type) || progress.notStarted !== 0 || progress.inProgress !== 0) {
    return null;
  }

  const programLink = /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
    style: {
      textDecoration: 'underline'
    },
    destination: url,
    className: "text-reset",
    children: intl.formatMessage(_messages.default.dashboardLink)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
    variant: "primary",
    className: "my-3",
    "data-testid": "program-completion",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "col order-1 order-md-0 pl-0 pr-0 pr-md-5",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "h4",
          children: intl.formatMessage(_messages.default.programsLastCourseHeader, {
            title
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "courseExit.programCompletion.dashboardMessage",
            defaultMessage: "To view your certificate status, check the Programs section of your {programLink}.",
            values: {
              programLink
            },
            description: "Text that precedes link to program page"
          })
        }), type === 'microbachelors' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
              style: {
                textDecoration: 'underline'
              },
              destination: `${(0, _frontendPlatform.getConfig)().SUPPORT_URL}/hc/en-us/articles/360004623154`,
              className: "text-reset",
              children: intl.formatMessage(_messages.default.microBachelorsLearnMore)
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "primary",
            className: "mb-2 mb-sm-0",
            href: `${(0, _frontendPlatform.getConfig)().CREDENTIALS_BASE_URL}/records`,
            children: intl.formatMessage(_messages.default.applyForCredit)
          })]
        }), type === 'micromasters' && /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          children: [intl.formatMessage(_messages.default.microMastersMessage), ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
            style: {
              textDecoration: 'underline'
            },
            destination: `${(0, _frontendPlatform.getConfig)().SUPPORT_URL}/hc/en-us/articles/360010346853-Does-a-Micromasters-certificate-count-towards-the-online-Master-s-degree-`,
            className: "text-reset",
            children: intl.formatMessage(_messages.default.microMastersLearnMore)
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "col-12 order-0 col-md-3 order-md-1 w-100 mb-3 p-0 text-center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _edX_certificate.default,
          alt: `${intl.formatMessage(_messages.default.certificateImage)}`,
          className: "w-100",
          style: {
            maxWidth: '13rem'
          },
          "data-testid": type
        })
      })]
    })
  });
}

ProgramCompletion.propTypes = {
  intl: _i18n.intlShape.isRequired,
  progress: _propTypes.default.shape({
    completed: _propTypes.default.number.isRequired,
    inProgress: _propTypes.default.number.isRequired,
    notStarted: _propTypes.default.number.isRequired
  }).isRequired,
  title: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired,
  url: _propTypes.default.string.isRequired
};

var _default = (0, _i18n.injectIntl)(ProgramCompletion);

exports.default = _default;
//# sourceMappingURL=ProgramCompletion.js.map