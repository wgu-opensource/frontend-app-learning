"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateKeys = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _dist = require("@edx/react-unit-test-utils/dist");
var _modelStore = require("../../../../../generic/model-store");
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const stateKeys = (0, _dist.StrictDict)({
  shouldDisplay: 'shouldDisplay'
});

/**
 * @return {bool} should the honor code be displayed?
 */
exports.stateKeys = stateKeys;
const useShouldDisplayHonorCode = _ref => {
  let {
    id,
    courseId
  } = _ref;
  const [shouldDisplay, setShouldDisplay] = (0, _dist.useKeyedState)(stateKeys.shouldDisplay, false);
  const {
    graded
  } = (0, _modelStore.useModel)(_constants.modelKeys.units, id);
  const {
    userNeedsIntegritySignature
  } = (0, _modelStore.useModel)(_constants.modelKeys.coursewareMeta, courseId);
  _react.default.useEffect(() => {
    setShouldDisplay(userNeedsIntegritySignature && graded);
  }, [setShouldDisplay, userNeedsIntegritySignature]);
  return shouldDisplay;
};
var _default = useShouldDisplayHonorCode;
exports.default = _default;
//# sourceMappingURL=useShouldDisplayHonorCode.js.map