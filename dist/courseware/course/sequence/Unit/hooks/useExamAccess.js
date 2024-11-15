"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateKeys = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _logging = require("@edx/frontend-platform/logging");
var _reactUnitTestUtils = require("@edx/react-unit-test-utils");
var _frontendLibSpecialExams = require("@edx/frontend-lib-special-exams");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const stateKeys = (0, _reactUnitTestUtils.StrictDict)({
  accessToken: 'accessToken',
  blockAccess: 'blockAccess'
});
exports.stateKeys = stateKeys;
const useExamAccess = _ref => {
  let {
    id
  } = _ref;
  const [accessToken, setAccessToken] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.accessToken, '');
  const [blockAccess, setBlockAccess] = (0, _reactUnitTestUtils.useKeyedState)(stateKeys.blockAccess, (0, _frontendLibSpecialExams.isExam)());
  _react.default.useEffect(() => {
    if ((0, _frontendLibSpecialExams.isExam)()) {
      (0, _frontendLibSpecialExams.fetchExamAccess)().finally(() => {
        const examAccess = (0, _frontendLibSpecialExams.getExamAccess)();
        setAccessToken(examAccess);
        setBlockAccess(false);
      }).catch(error => {
        (0, _logging.logError)(error);
      });
    }
  }, [id]);
  return {
    blockAccess,
    accessToken
  };
};
var _default = useExamAccess;
exports.default = _default;
//# sourceMappingURL=useExamAccess.js.map