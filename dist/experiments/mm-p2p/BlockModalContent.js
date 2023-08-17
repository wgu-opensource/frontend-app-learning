"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _paragon = require("@edx/paragon");

var _edX_certificate = _interopRequireDefault(require("../../generic/assets/edX_certificate.png"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BulletList = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "bullet-list-item",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "icon-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "check-circle",
        className: "svg-inline--fa fa-check-circle fa-w-16 mmp2p-bullet-list",
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

const BlockModal = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalLayer, {
  isOpen: true,
  onClose: () => {},
  isBlocking: true,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "mmp2p-modal-dialog modal-content modal-xl",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "mmp2p-block-modal-wrapper",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        children: "Deadline to access full course has passed"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "subheader",
        children: "What does the Verified Track get you?"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BulletList, {
          children: "Earn a verified certificate of completion to showcase on your resum\xE9"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(BulletList, {
          children: "Unlock unlimited access to all course content and activities, \xA0including graded assignments, even after the course ends."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(BulletList, {
          children: "Support our mission at edx"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _edX_certificate.default,
        className: "certificate-image",
        alt: "Example Certificate"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        id: "mmp2p-modal-explore-btn",
        variant: "brand",
        href: "https://www.edx.org/search",
        "data-ol-has-click-handler": "",
        style: {
          fontSize: '1em',
          fontWeight: 600
        },
        children: "Explore more courses"
      })]
    })
  })
});

exports.BlockModal = BlockModal;
var _default = BlockModal;
exports.default = _default;
//# sourceMappingURL=BlockModalContent.js.map