"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("@edx/frontend-platform/i18n");

var _PageLoading = _interopRequireDefault(require("../../../generic/PageLoading"));

var _modelStore = require("../../../generic/model-store");

var _messages = _interopRequireDefault(require("./messages"));

var _Unit = _interopRequireDefault(require("./Unit"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ContentLock = /*#__PURE__*/_react.default.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require('./content-lock'))));

function SequenceContent(_ref) {
  let {
    gated,
    intl,
    courseId,
    sequenceId,
    unitId,
    unitLoadedHandler,

    /** [MM-P2P] Experiment */
    mmp2p
  } = _ref;
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId); // Go back to the top of the page whenever the unit or sequence changes.

  (0, _react.useEffect)(() => {
    global.scrollTo(0, 0);
  }, [sequenceId, unitId]);

  if (gated) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageLoading.default, {
        srMessage: intl.formatMessage(_messages.default.loadingLockedContent)
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContentLock, {
        courseId: courseId,
        sequenceTitle: sequence.title,
        prereqSectionName: sequence.gatedContent.prereqSectionName,
        prereqId: sequence.gatedContent.prereqId
      })
    });
  }

  const unit = (0, _modelStore.useModel)('units', unitId);

  if (!unitId || !unit) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: intl.formatMessage(_messages.default.noContent)
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unit.default, {
    courseId: courseId,
    format: sequence.format,
    id: unitId,
    onLoaded: unitLoadedHandler
    /** [MM-P2P] Experiment */
    ,
    mmp2p: mmp2p
  }, unitId);
}

SequenceContent.propTypes = {
  gated: _propTypes.default.bool.isRequired,
  courseId: _propTypes.default.string.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string,
  unitLoadedHandler: _propTypes.default.func.isRequired,
  intl: _i18n.intlShape.isRequired,

  /** [MM-P2P] Experiment */
  mmp2p: _propTypes.default.shape({
    flyover: _propTypes.default.shape({
      isVisible: _propTypes.default.bool.isRequired
    }),
    meta: _propTypes.default.shape({
      showLock: _propTypes.default.bool
    }),
    state: _propTypes.default.shape({
      isEnabled: _propTypes.default.bool.isRequired
    })
  })
};
SequenceContent.defaultProps = {
  unitId: null,

  /** [MM-P2P] Experiment */
  mmp2p: {
    flyover: {
      isVisible: false
    },
    meta: {
      showLock: false
    },
    state: {
      isEnabled: false
    }
  }
};

var _default = (0, _i18n.injectIntl)(SequenceContent);

exports.default = _default;
//# sourceMappingURL=SequenceContent.js.map