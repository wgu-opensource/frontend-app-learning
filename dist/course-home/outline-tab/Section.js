"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _faCheckCircle = require("@fortawesome/free-solid-svg-icons/faCheckCircle");
var _faMinus = require("@fortawesome/free-solid-svg-icons/faMinus");
var _faPlus = require("@fortawesome/free-solid-svg-icons/faPlus");
var _faCheckCircle2 = require("@fortawesome/free-regular-svg-icons/faCheckCircle");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _icons = require("@openedx/paragon/icons");
var _SequenceLink = _interopRequireDefault(require("./SequenceLink"));
var _modelStore = require("../../generic/model-store");
var _messages = _interopRequireDefault(require("../../generic/messages"));
var _messages2 = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    title,
    hideFromTOC
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
    className: "d-flex row w-100 m-0",
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
      className: "col-7 ml-3 p-0 font-weight-bold text-dark-500",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "align-middle col-6",
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "sr-only",
        children: [", ", intl.formatMessage(complete ? _messages2.default.completedSection : _messages2.default.incompleteSection)]
      })]
    }), hideFromTOC && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "row",
      children: hideFromTOC && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "small d-flex align-content-end",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
          className: "mr-2",
          src: _icons.DisabledVisible,
          "data-testid": "hide-from-toc-section-icon"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          "data-testid": "hide-from-toc-section-text",
          children: intl.formatMessage(_messages2.default.hiddenSection)
        })]
      })
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
var _default = exports.default = (0, _i18n.injectIntl)(Section);
//# sourceMappingURL=Section.js.map