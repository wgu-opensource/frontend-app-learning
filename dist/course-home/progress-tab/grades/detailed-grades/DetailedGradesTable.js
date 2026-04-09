import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import { DataTable } from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';
import messages from '../messages';
import SubsectionTitleCell from './SubsectionTitleCell';
import { showUngradedAssignments } from '../../utils';
const DetailedGradesTable = () => {
    const intl = useIntl();
    const courseId = useContextId();
    const { sectionScores, } = useModel('progress', courseId);
    const isLocaleRtl = isRtl(getLocale());
    return (sectionScores.map((chapter) => {
        const subsectionScores = chapter.subsections.filter((subsection) => !!((showUngradedAssignments() || subsection.hasGradedAssignment)
            && subsection.showGrades
            && (subsection.numPointsPossible > 0 || subsection.numPointsEarned > 0)));
        if (subsectionScores.length === 0) {
            return null;
        }
        const detailedGradesData = subsectionScores.map((subsection) => ({
            subsectionTitle: _jsx(SubsectionTitleCell, { subsection: subsection }),
            score: _jsxs("span", Object.assign({ className: subsection.learnerHasAccess ? '' : 'greyed-out' }, { children: [subsection.numPointsEarned, isLocaleRtl ? '\\' : '/', subsection.numPointsPossible] })),
        }));
        return (_jsx("div", Object.assign({ className: "my-3" }, { children: _jsx(DataTable, Object.assign({ data: detailedGradesData, itemCount: detailedGradesData.length, columns: [
                    {
                        Header: chapter.displayName,
                        accessor: 'subsectionTitle',
                        headerClassName: 'h5 mb-0',
                        cellClassName: 'mw-100',
                    },
                    {
                        Header: `${intl.formatMessage(messages.score)}`,
                        accessor: 'score',
                        headerClassName: 'justify-content-end h5 mb-0',
                        cellClassName: 'align-top text-right small',
                    },
                ] }, { children: _jsx(DataTable.Table, {}) })) }), `${chapter.displayName}-grades-table`));
    }));
};
export default DetailedGradesTable;
//# sourceMappingURL=DetailedGradesTable.js.map