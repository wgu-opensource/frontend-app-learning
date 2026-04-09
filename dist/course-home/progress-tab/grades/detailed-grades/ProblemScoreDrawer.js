import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getLocale, isRtl, useIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';
const ProblemScoreDrawer = ({ problemScores, subsection }) => {
    const intl = useIntl();
    const isLocaleRtl = isRtl(getLocale());
    const scoreLabel = subsection.hasGradedAssignment ? messages.gradedScoreLabel : messages.practiceScoreLabel;
    return (_jsxs("span", Object.assign({ className: "row w-100 m-0 x-small ml-4 pt-2 pl-1 text-gray-700 flex-nowrap" }, { children: [_jsx("span", Object.assign({ id: "problem-score-label", className: "col-auto p-0" }, { children: intl.formatMessage(scoreLabel) })), _jsx("div", Object.assign({ className: classNames('col', 'p-0', { 'greyed-out': !subsection.learnerHasAccess }) }, { children: _jsx("ul", Object.assign({ className: "list-unstyled row w-100 m-0", "aria-labelledby": "problem-score-label" }, { children: problemScores.map((problemScore, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    _jsxs("li", Object.assign({ className: "ml-3" }, { children: [problemScore.earned, isLocaleRtl ? '\\' : '/', problemScore.possible] }), i))) })) }))] })));
};
ProblemScoreDrawer.propTypes = {
    problemScores: PropTypes.arrayOf(PropTypes.shape({
        earned: PropTypes.number.isRequired,
        possible: PropTypes.number.isRequired,
    })).isRequired,
    subsection: PropTypes.shape({
        learnerHasAccess: PropTypes.bool,
        hasGradedAssignment: PropTypes.bool,
    }).isRequired,
};
export default ProblemScoreDrawer;
//# sourceMappingURL=ProblemScoreDrawer.js.map