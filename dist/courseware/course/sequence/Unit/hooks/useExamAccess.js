"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _logging = require("@edx/frontend-platform/logging");
var _frontendLibSpecialExams = require("@edx/frontend-lib-special-exams");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useExamAccess = ({
  id
}) => {
  const isExam = (0, _frontendLibSpecialExams.useIsExam)();
  const [blockAccess, setBlockAccess] = _react.default.useState(isExam);
  const fetchExamAccessToken = (0, _frontendLibSpecialExams.useFetchExamAccessToken)();

  // NOTE: We cannot use this hook in the useEffect hook below to grab the updated exam access token in the finally
  //       block, due to the rules of hooks. Instead, we get the value of the exam access token from a call to
  //       the hook below.
  //       When the fetchExamAccessToken call completes, the useExamAccess hook will re-run
  //       (due to a change to the Redux store, and, thus, a change to the context), at which point the updated
  //       exam access token will be fetched via the useExamAccessToken hook call below.
  //       The important detail is that there should never be a return value (false, '').
  const examAccessToken = (0, _frontendLibSpecialExams.useExamAccessToken)();
  _react.default.useEffect(() => {
    if (isExam) {
      fetchExamAccessToken().finally(() => {
        setBlockAccess(false);
      }).catch(error => {
        (0, _logging.logError)(error);
      });
    }
  }, [id, isExam]);
  return {
    blockAccess,
    accessToken: examAccessToken
  };
};
var _default = exports.default = useExamAccess;
//# sourceMappingURL=useExamAccess.js.map