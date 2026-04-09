import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import CourseGradeFooter from './CourseGradeFooter';
import CourseGradeHeader from './CourseGradeHeader';
import GradeBar from './GradeBar';
import CreditInformation from '../../credit-information/CreditInformation';
import messages from '../messages';
const CourseGrade = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { creditCourseRequirements, gradesFeatureIsFullyLocked, gradesFeatureIsPartiallyLocked, gradingPolicy: { gradeRange, }, } = useModel('progress', courseId);
    const passingGrade = Number((Math.min(...Object.values(gradeRange)) * 100).toFixed(0));
    const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';
    return (_jsxs("section", Object.assign({ className: "text-dark-700 my-4 rounded raised-card" }, { children: [(gradesFeatureIsFullyLocked || gradesFeatureIsPartiallyLocked) && _jsx(CourseGradeHeader, {}), _jsxs("div", Object.assign({ className: applyLockedOverlay, "aria-hidden": gradesFeatureIsFullyLocked }, { children: [_jsxs("div", Object.assign({ className: "row w-100 m-0 p-4" }, { children: [_jsxs("div", Object.assign({ className: "col-12 col-sm-6 p-0 pr-sm-5.5" }, { children: [_jsx("h2", { children: creditCourseRequirements
                                            ? intl.formatMessage(messages.gradesAndCredit)
                                            : intl.formatMessage(messages.grades) }), _jsx("p", Object.assign({ className: "small" }, { children: intl.formatMessage(messages.courseGradeBody) }))] })), _jsx(GradeBar, { passingGrade: passingGrade })] })), _jsx("div", Object.assign({ className: "row w-100 m-0 px-4" }, { children: _jsx(CreditInformation, {}) })), _jsx(CourseGradeFooter, { passingGrade: passingGrade })] }))] })));
};
export default CourseGrade;
//# sourceMappingURL=CourseGrade.js.map