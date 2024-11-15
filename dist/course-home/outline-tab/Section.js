"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _faCheckCircle = require("@fortawesome/free-solid-svg-icons/faCheckCircle");
var _faMinus = require("@fortawesome/free-solid-svg-icons/faMinus");
var _faPlus = require("@fortawesome/free-solid-svg-icons/faPlus");
var _faCheckCircle2 = require("@fortawesome/free-regular-svg-icons/faCheckCircle");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _SequenceLink = _interopRequireDefault(require("./SequenceLink"));
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("../../generic/messages"));
var _messages2 = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Section = _ref => {
  let {
    courseId,
    defaultOpen,
    expand,
    intl,
    section
  } = _ref;
  const {
    complete,
    sequenceIds,
    title
  } = section;
  const {
    courseBlocks: {
      sequences
    }
  } = (0, _modelStore.useModel)('outline', courseId);
  const [open, setOpen] = (0, _react.useState)(defaultOpen);
  (0, _react.useEffect)(() => {
    setOpen(expand);
  }, [expand]);
  (0, _react.useEffect)(() => {
    setOpen(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sectionTitle = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "row w-100 m-0",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "col-auto p-0",
      children: complete ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faCheckCircle.faCheckCircle,
        fixedWidth: true,
        className: "float-left mt-1 text-success",
        "aria-hidden": "true",
        title: intl.formatMessage(_messages2.default.completedSection)
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
        icon: _faCheckCircle2.faCheckCircle,
        fixedWidth: true,
        className: "float-left mt-1 text-gray-400",
        "aria-hidden": "true",
        title: intl.formatMessage(_messages2.default.incompleteSection)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "col-10 ml-3 p-0 font-weight-bold text-dark-500",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "align-middle",
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [", ", intl.formatMessage(complete ? _messages2.default.completedSection : _messages2.default.incompleteSection)]
      })]
    })]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible, {
      className: "mb-2",
      styling: "card-lg",
      title: sectionTitle,
      open: open,
      onToggle: () => {
        setOpen(!open);
      },
      iconWhenClosed: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        alt: intl.formatMessage(_messages2.default.openSection),
        icon: _faPlus.faPlus,
        onClick: () => {
          setOpen(true);
        },
        size: "sm"
      }),
      iconWhenOpen: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        alt: intl.formatMessage(_messages.default.close),
        icon: _faMinus.faMinus,
        onClick: () => {
          setOpen(false);
        },
        size: "sm"
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
        className: "list-unstyled",
        children: sequenceIds.map((sequenceId, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SequenceLink.default, {
          id: sequenceId,
          courseId: courseId,
          sequence: sequences[sequenceId],
          first: index === 0
        }, sequenceId))
      })
    })
  });
};
Section.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  defaultOpen: _propTypes.default.bool.isRequired,
  expand: _propTypes.default.bool.isRequired,
  intl: _i18n.intlShape.isRequired,
  section: _propTypes.default.shape().isRequired
};
var _default = (0, _i18n.injectIntl)(Section);
exports.default = _default;
//# sourceMappingURL=Section.js.map