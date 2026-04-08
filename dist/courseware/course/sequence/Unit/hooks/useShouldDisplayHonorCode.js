"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _modelStore = require("@src/generic/model-store");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @return {bool} should the honor code be displayed?
 */
const useShouldDisplayHonorCode = ({
  id,
  courseId
}) => {
  const [shouldDisplay, setShouldDisplay] = _react.default.useState(false);
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
var _default = exports.default = useShouldDisplayHonorCode;
//# sourceMappingURL=useShouldDisplayHonorCode.js.map