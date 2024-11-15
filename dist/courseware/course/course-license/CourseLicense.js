"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _faCopyright = require("@fortawesome/free-regular-svg-icons/faCopyright");
var _faCreativeCommons = require("@fortawesome/free-brands-svg-icons/faCreativeCommons");
var _faCreativeCommonsBy = require("@fortawesome/free-brands-svg-icons/faCreativeCommonsBy");
var _faCreativeCommonsNc = require("@fortawesome/free-brands-svg-icons/faCreativeCommonsNc");
var _faCreativeCommonsNd = require("@fortawesome/free-brands-svg-icons/faCreativeCommonsNd");
var _faCreativeCommonsSa = require("@fortawesome/free-brands-svg-icons/faCreativeCommonsSa");
var _faCreativeCommonsZero = require("@fortawesome/free-brands-svg-icons/faCreativeCommonsZero");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CreativeCommonsLicenseTags = {
  by: {
    intlMessagesId: 'learn.course.license.creativeCommons.terms.by',
    icon: _faCreativeCommonsBy.faCreativeCommonsBy
  },
  nc: {
    intlMessagesId: 'learn.course.license.creativeCommons.terms.nc',
    icon: _faCreativeCommonsNc.faCreativeCommonsNc
  },
  nd: {
    intlMessagesId: 'learn.course.license.creativeCommons.terms.nd',
    icon: _faCreativeCommonsNd.faCreativeCommonsNd
  },
  sa: {
    intlMessagesId: 'learn.course.license.creativeCommons.terms.sa',
    icon: _faCreativeCommonsSa.faCreativeCommonsSa
  },
  zero: {
    intlMessagesId: 'learn.course.license.creativeCommons.terms.zero',
    icon: _faCreativeCommonsZero.faCreativeCommonsZero
  }
};
function parseLicense(license) {
  if (!license) {
    // Default to All Rights Reserved if no license
    // is detected
    return ['all-rights-reserved', {}];
  }

  // Search for a colon character denoting the end
  // of the license type and start of the options
  const colonIndex = license.indexOf(':');
  if (colonIndex === -1) {
    // no options, so the entire thing is the license type
    return [license, {}];
  }

  // Split the license on the colon
  const licenseType = license.slice(0, colonIndex).trim();
  const optionStr = license.slice(colonIndex + 1).trim();
  let options = {};
  let version = '';

  // Set the defaultVersion to 4.0
  const defaultVersion = '4.0';
  optionStr.split(' ').forEach(option => {
    // Split the option into key and value
    // Default the value to `true` if no value
    let key = '';
    let value = '';
    if (option.indexOf('=') !== -1) {
      [key, value] = option.split('=');
    } else {
      key = option;
      value = true;
    }

    // Check for version
    if (key === 'ver') {
      version = value;
    } else {
      // Set the option key to lowercase to make
      // it easier to query
      options[key.toLowerCase()] = value;
    }
  });

  // No options
  if (Object.keys(options).length === 0) {
    // If no other options are set for the
    // license, set version to 1.0
    version = '1.0';

    // Set the `zero` option so the link
    // works correctly
    options = {
      zero: true
    };
  }

  // Set the version to whatever was included,
  // using `defaultVersion` as a fallback if unset
  version = version || defaultVersion;
  return [licenseType, options, version];
}
const CourseLicense = _ref => {
  let {
    license,
    intl
  } = _ref;
  const renderAllRightsReservedLicense = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "text-gray-500",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      "aria-hidden": "true",
      className: "mr-1",
      icon: _faCopyright.faCopyright
    }), intl.formatMessage(_messages.default['learn.course.license.allRightsReserved.text'])]
  });
  const renderCreativeCommonsLicense = (activeCreativeCommonsLicenseTags, version) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
    className: "text-decoration-none text-gray-500",
    rel: "license noopener noreferrer",
    target: "_blank",
    href: `https://creativecommons.org/licenses/${activeCreativeCommonsLicenseTags.join('-')}/${version}/`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: "sr-only",
      children: [intl.formatMessage(_messages.default['learn.course.license.creativeCommons.terms.preamble']), "\xA0"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
      "aria-hidden": "true",
      className: "mr-1",
      icon: _faCreativeCommons.faCreativeCommons
    }), activeCreativeCommonsLicenseTags.map(tag => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [intl.formatMessage(_messages.default[CreativeCommonsLicenseTags[tag].intlMessagesId]), "\xA0"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        "aria-hidden": "true",
        className: "mr-1",
        icon: CreativeCommonsLicenseTags[tag].icon
      })]
    }, tag)), intl.formatMessage(_messages.default['learn.course.license.creativeCommons.text'])]
  });
  const [licenseType, licenseOptions, licenseVersion] = parseLicense(license);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "text-right small py-1",
    children: [licenseType === 'all-rights-reserved' && renderAllRightsReservedLicense(), licenseType === 'creative-commons' && renderCreativeCommonsLicense(Object.keys(licenseOptions), licenseVersion)]
  });
};
CourseLicense.propTypes = {
  license: _propTypes.default.string,
  intl: _i18n.intlShape.isRequired
};
CourseLicense.defaultProps = {
  license: 'all-rights-reserved'
};
var _default = (0, _i18n.injectIntl)(CourseLicense);
exports.default = _default;
//# sourceMappingURL=CourseLicense.js.map